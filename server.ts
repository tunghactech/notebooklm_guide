import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Lazy initializer for Google GenAI client to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error(
        "GEMINI_API_KEY is missing from environment variables. Please supply this secret key in the AI Studio Settings panel."
      );
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST route to handle academic materials generation
app.post("/api/generate", async (req: express.Request, res: express.Response): Promise<any> => {
  const { subjectName, department, lessonTitle, studentTarget, learningObjectives, lectureContent, format, customInstructions } = req.body;

  if (!lectureContent || !lessonTitle || !subjectName) {
    return res.status(400).json({ error: "Missing required fields (lectureContent, lessonTitle, subjectName)." });
  }

  try {
    const ai = getAIClient();

    let formatInstruction = "";
    switch (format) {
      case "podcast":
        formatInstruction = `
Hãy viết kịch bản Podcast đối thoại học thuật tiếng Việt cực kỳ tự nhiên, mô phỏng tính năng Audio Overview của NotebookLM 2026.
Bối cảnh: Cuộc thảo luận giữa hai giảng viên HACTECH (Nam dẫn: Thầy Minh - giàu kinh nghiệm thực tế, Nữ dẫn: Cô Lan - giảng viên trẻ năng động).
Yêu cầu kịch bản:
- Định dạng rõ vai thoại dạng "Thầy Minh: ..." và "Cô Lan: ...".
- Khởi đầu với lời chào thân mật chào mừng sinh viên trường Cao đẳng Nghề Bách khoa Hà Nội (HACTECH).
- Tông giọng truyền cảm hứng, vui vẻ, thực tế, gần gũi với sinh viên học nghề kỹ thuật.
- Giải nghĩa các thuật ngữ kỹ thuật khó trong bài viết bằng ngôn từ thực tế dễ hiểu tại xưởng, đưa ra ví dụ hằng ngày.
- Không đọc liệt kê các danh sách rườm rà; hãy phân tích ý nghĩa bản chất hoặc lồng ghép bài học kinh nghiệm của sinh viên đi trước.
- Kết thúc bằng một tóm lược 60 giây và các lời dặn bảo dưỡng an toàn lao động tại xưởng.
`;
        break;

      case "slides":
        formatInstruction = `
Hãy thiết kế bộ khung slide trình giảng (Presenter Slides) bám sát Chương 5 của cẩm nang NotebookLM 2026.
Phải bao gồm đúng 8 - 10 slide sắp xếp khoa học.
Mỗi slide định dạng rõ ràng trong markdown như sau:
---
### Slide [Số]: [Tiêu đề slide]
**Ý chính Slide (Bullet points - tối đa 3-4 dòng, punchy):**
- [Ý chính 1]
- [Ý chính 2]
- [Ý chính 3]

**Lời thoại Giảng viên (Speaker notes cho giảng viên HACTECH):**
[Viết lời thoại giảng giải mạch lạc, cụ thể tầm 3-5 câu để giảng viên đọc trực tiếp trên lớp. Bao gồm cả các ví dụ trực quan tại xưởng thực hành, xưởng máy, hoặc các lỗi sinh viên thường thao tác sai khi làm bài tập, bài đo.]
---
`;
        break;

      case "handout":
        formatInstruction = `
Hãy biên soạn tài liệu học tập chuyên sâu (Study Guide / Handout) bám sát Chương 8 của cẩm nang NotebookLM 2026.
Nội dung tài liệu cần trình bày chi tiết bằng tiếng Việt theo bố cục chuyên nghiệp sau:
1. **Tổng quan Bài học & Mục tiêu bài giảng HACTECH:** Tóm tắt ngắn gọn bối cảnh và ý nghĩa thực tế của bài học này.
2. **Thuật ngữ Kỹ thuật số (Glossary):** Liệt kê ít nhất 5 thuật ngữ/khái niệm chuyên ngành chính từ bài viết, bôi đậm chúng và giải nghĩa cụ thể, chính xác.
3. **Ví dụ Minh họa Thực tiễn ứng dụng:** Đưa ra 3 ví dụ/tình huống thực tế mang tính thực hành áp dụng tại xưởng máy hoặc doanh nghiệp sản xuất thực tế liên quan mật thiết đến chủ đề.
4. **Câu hỏi thảo luận & Hướng dẫn tự ôn luyện nâng cao:** Đưa ra 5 câu hỏi tình huống tư duy cao để sinh viên tự phản biện và hiểu sâu bản chất lý thuyết, cách vận dụng, có kèm gợi ý cách giải quyết.
`;
        break;

      case "flashcards":
        formatInstruction = `
Hãy tạo Hệ thống Flashcards & Câu hỏi trắc nghiệm tự kiểm tra bám sát Chương 9 của cẩm nang NotebookLM 2026.
Bao gồm 2 phần rõ rệt:

PHẦN I: BỘ THẺ GHI NHỚ (FLASHCARDS)
Hãy viết ra 6 - 8 flashcards dưới dạng bảng hoặc gạch đầu dòng:
- **Card [Số] - Mặt trước (Câu hỏi/Khái niệm kỹ thuật):** ...
- **Card [Số] - Mặt sau (Mẹo nhớ nhanh/Mô tả cốt lõi):** ...

PHẦN II: BỘ CÂU HỎI TRẮC NGHIỆM ĐÁNH GIÁ (QUIZ)
Hãy tạo 10 câu hỏi trắc nghiệm đa lựa chọn có độ phân hóa tốt (Dễ, Trung bình, Khó).
Định dạng mỗi câu:
**Câu [Số]:** [Nội dung câu hỏi tình huống kỹ thuật thực tế]
A. [Phương án A]
B. [Phương án B]
C. [Phương án C]
D. [Phương án D]
- **Đáp án đúng:** [Ghi rõ chữ cái đáp án]
- **Kiểm duyệt Sư phạm (Giải nghĩa sâu sắc):** Giải thích chi tiết tại sao phương án đó là đúng, và phân tích các phương án còn lại là bẫy/lỗi sai sinh viên thường mắc phải như thế nào.
`;
        break;

      case "compare_table":
        formatInstruction = `
Hãy tạo một bảng so sánh thông số kĩ thuật / phân loại giải pháp / đối chiếu quy trình một cách khoa học bám sát Chương 11 của cẩm nang NotebookLM 2026.
Yêu cầu đầu ra:
- Sử dụng trực tiếp định dạng Bảng của Markdown (| Cột 1 | Cột 2 | Col 3 |).
- Phải có các cột đối chiếu rõ rệt như: Linh kiện/Phương án kỹ thuật, Nguyên lý mấu chốt, Ứng dụng thực tế điển hình, Ưu điểm tuyệt đối, Nhược điểm hạn chế, Khuyến nghị vận hành tại HACTECH.
- Điền đầy đủ dữ liệu sát sườn từ bài học.
- Để tăng tính chính xác, những vị trí tài liệu gốc không đề cập đến hãy ghi rõ "Chưa đủ dữ liệu từ nguồn tuyển" thay vì tự bịa thêm thông số.
- Phía bên dưới bảng so sánh, viết 2 - 3 đoạn văn phân tích tổng hợp các điểm cốt lõi giúp sinh viên nắm và so sánh nhanh trước buổi học.
`;
        break;

      case "infographic":
        formatInstruction = `
Hãy thiết kế Bản vẽ Kế hoạch Sơ đồ Đồ họa (Infographic Layout Blueprint) bám sát Chương 10 của cẩm nang NotebookLM 2026.
Yêu cầu kịch bản thiết kế gồm:
1. **Ý tưởng chủ đạo & Bảng màu khuyên dùng:** Màu sắc đề xuất phù hợp bối cảnh kỹ thuật HACTECH (như Xanh biển công nghệ, Cam cảnh báo an toàn).
2. **Cấu trúc luồng thị giác (Visual Flow):** (Dạng Checklist thời gian hoặc Quy trình 4 bước).
3. **Chi tiết từng phân khu nội dung (Tối giản văn bản, tối ưu đồ họa):**
   - Bước/Khu 1: Tiêu đề, Biểu tượng đề xuất (Icon), Nội dung text cực ngắn (chỉ 1 - 2 câu).
   - Bước/Khu 2: Tiêu đề, Biểu tượng đề xuất (Icon), Nội dung text cực ngắn.
   - Bước/Khu 3: Tiêu đề, Biểu tượng đề xuất (Icon), Nội dung text cực ngắn.
   - Bước/Khu 4: Tiêu đề, Biểu tượng đề xuất (Icon), Nội dung text cực ngắn.
4. **Hướng dẫn thiết kế nhanh trên Canva:** Chi tiết gợi ý từ khóa tìm kiếm Template trên Canva (Canva Search Keywords) giúp giảng viên dễ dàng dựng hình ảnh thực tế.
`;
        break;

      default:
        formatInstruction = "Hãy tóm tắt và hệ thống hóa tài liệu bài dạy này một cách tốt nhất để hỗ trợ giảng dạy.";
    }

    const systemPrompt = `
Bạn là một Trợ lý Thiết kế Học liệu Sư phạm cao cấp, được tích hợp kiến thức từ "Cẩm nang Thực chiến NotebookLM 2026".
Nhiệm vụ của bạn là hỗ trợ Giảng viên trường Cao đẳng Nghề Bách khoa Hà Nội (HACTECH - một ngôi trường đào tạo kỹ thuật, thực hành hàng đầu Việt Nam) chuyển đổi các bài giảng thô thành các tài liệu giảng dạy và học tập đỉnh cao, đồng bộ với các đầu ra của hệ thống NotebookLM Studio.

Thông tin bối cảnh về môn học:
- Tên môn học: ${subjectName}
- Thuộc Khoa đào tạo: ${department}
- Tên bài giảng/bài thực hành: ${lessonTitle}
- Đối tượng sinh viên hướng tới: ${studentTarget}
- Mục tiêu đầu ra của bài học: ${learningObjectives}

Tài liệu văn bản kỹ thuật thô / Giáo trình chi tiết do giảng viên cung cấp:
--- START DOCUMENT ---
${lectureContent}
--- END DOCUMENT ---

Chỉ dẫn riêng của Giảng viên yêu cầu thêm (nếu có):
${customInstructions || "Không có yêu cầu thêm"}

Hãy tuân thủ nghiêm ngặt các nguyên tắc dưới đây:
1. Bạn phải bám sát tuyệt đối nội dung tài liệu nguồn đã được cung cấp ở trên. KHÔNG tự chế tác hay sinh tưởng tượng (hallucination) ra các số liệu và thuật ngữ không có trong nguyên lý bài học gốc. Nếu có thông tin nào giảng viên hỏi mà nguồn chưa đủ dữ liệu, hãy ghi chú rõ ràng "Chưa đủ dữ liệu tham chiếu trong nguồn".
2. Hãy cá nhân hóa địa phương: Lồng ghép bối cảnh đào tạo nghề, văn hóa kỹ thuật, các tình huống thực tế tại xưởng thực hành của Trường Cao đẳng Nghề Bách khoa Hà Nội để tạo cảm thức gắn bó, hào hứng cho giảng viên và sinh viên HACTECH.
3. Nội dung trả lời viết hoàn toàn bằng TIẾNG VIỆT, sử dụng định dạng Markdown phong phú, đẹp mắt, chia rõ phân cấp tiêu đề để hiển thị hoàn hảo trên giao diện trình duyệt.

Sau đây là chỉ dẫn định dạng bạn cần xuất ra phục vụ trực tiếp cho giảng viên:
${formatInstruction}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Hãy tạo học liệu dựa trên hướng dẫn hệ thống.",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2, // Keep temperature low to maintain strict accuracy based on source text
      },
    });

    res.json({ content: response.text });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred during generation." });
  }
});


// Express + Vite initialization
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HACTECH LMS Server] listening at http://localhost:${PORT}`);
  });
}

startServer();
