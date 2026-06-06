import React, { useState } from "react";
import { HACTECH_DEPARTMENTS } from "../data";
import { SubjectContext, MaterialType, GeneratedMaterial } from "../types";
import { 
  Mic, 
  Tv, 
  FileText, 
  Layers, 
  Table, 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  Copy, 
  Download, 
  History, 
  AlertCircle,
  FileCheck,
  Loader2,
  Trash2,
  Bookmark
} from "lucide-react";
import { motion } from "motion/react";

interface MaterialStudioProps {
  initialFormat: MaterialType;
  initialPrompt: string;
  onClearInitial: () => void;
}

// Quick sample technical curriculum databases for instant previewing
const SAMPLES = [
  {
    title: "PHP Dynamic Web development",
    subjectName: "Lập trình Web động (React và PHP)",
    department: "Khoa Công nghệ thông tin",
    lessonTitle: "Bảo mật kết nối CSDL sử dụng PDO Prepared Statements",
    studentTarget: "Sinh viên Cao đẳng nghề năm thứ 2 lớp CNTT",
    learningObjectives: "Hiểu bản chất lỗ hổng bảo mật SQL Injection và viết thuần thục cú pháp PDO Prepared Statement để chặn triệt để lỗ hổng khi kết nối hệ quản trị CSDL MySQL.",
    lectureContent: `Công nghệ Web động và Ngôn ngữ PHP: PHP là ngôn ngữ kịch bản chạy phía máy chủ (server-side). Khi người dùng yêu cầu một trang web chứa code PHP, máy chủ Web (ví dụ: Apache hoặc Nginx) sẽ xử lý mã PHP thông qua trình thông dịch PHP Engine và trả về mã HTML tuyệt đối cùng dữ liệu cho trình duyệt của người dùng. 

Một trong những khái niệm quan trọng nhất của lập trình web động an toàn là kết nối Cơ sở dữ liệu sử dụng PDO (PHP Data Objects). PDO cung cấp một lớp trừu tượng truy vấn cơ sở dữ liệu làm tăng tính năng di động mã nguồn và nâng cao tính bảo mật nhờ cơ chế Prepared Statements.

Cơ chế hoạt động của Prepared Statement:
Thông thường, truy vấn SQL truyền thống chạy trực tiếp chuỗi ghép nối: "SELECT * FROM users WHERE username = '" . $user . "'". Cách này rất nguy hiểm vì hacker có thể nhập chuỗi độc hại mang cú pháp SQL để phá hoại cấu trúc câu truy vấn (gây ra lỗ hổng SQL Injection).
Với Prepared Statement, máy chủ CSDL thực hiện biên dịch trước bộ khung của câu truy vấn: "SELECT * FROM users WHERE email = :email". Sau đó dữ liệu tham số thực tế mới được gán vào sau thông qua cơ chế ràng buộc tham số (Parameter Binding). CSDL đối xử với tham số này hoàn toàn là dòng chữ thô thông thường nên phá vỡ âm mưu thực thi mã độc.

Các bước viết cú pháp PDO chuẩn trong PHP:
Bước 1: Khởi tạo kết nối PDO với cấu hình bật chế độ lỗi Exception
try {
  $conn = new PDO("mysql:host=localhost;dbname=hactech_db", "admin", "SecurePass123");
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  die("Lỗi kết nối CSDL: " . $e->getMessage());
}

Bước 2: Tạo Prepared Statement bằng hàm prepare()
$stmt = $conn->prepare("SELECT * FROM users WHERE email = :email AND status = :status");

Bước 3: Gán giá trị và thực thi bằng hàm execute()
$stmt->execute([
  'email' => $emailInput,
  'status' => 'active'
]);

Bước 4: Nhận kết quả bằng fetch() hoặc fetchAll()
$user = $stmt->fetch(PDO::FETCH_ASSOC);
if ($user) {
  echo "Chào mừng: " . htmlspecialchars($user['fullname']);
} else {
  echo "Người dùng không tồn tại.";
}

Lưu ý giảng dạy tại HACTECH: Sinh viên năm thứ 2 cần tập trung thực hành kết nối cơ sở dữ liệu đúng quy chuẩn, tuyệt đối không viết mã lười ghép chuỗi để tránh việc hệ thống thông tin doanh nghiệp bị tê liệt do bị rò rỉ dữ liệu.`
  },
  {
    title: "An toàn vận hành biến tần máy",
    subjectName: "Điện dân dụng và Công nghiệp",
    department: "Khoa Điện - Điện tử",
    lessonTitle: "Nguyên lý biến tần ba pha và quy định an toàn bảo dưỡng xả tụ",
    studentTarget: "Sinh viên Cao đẳng nghề năm 2 lớp Kỹ thuật điện tử",
    learningObjectives: "Nắm vững 3 khâu chính của biến tần công nghiệp, phương pháp điều xung PWM và hiểu nguy hiểm tích điện áp tụ lọc DC Link để tuân thủ 100% thời gian xả điện áp trước khi tiếp xúc mạch thực hành.",
    lectureContent: `Nguyên lý điều khiển tần số quay động cơ bằng Biến tần công nghiệp: 
Biến tần (Inverter) là thiết bị biến đổi dòng điện xoay chiều AC ở tần số này thành dòng điện xoay chiều AC ở tần số khác, từ đó điều khiển tốc độ quay của động cơ xoay chiều 3 pha một cách vô cấp và êm ái.

Biến tần có cấu tạo cơ bản gồm 3 khâu chính:
1. Mạch chỉnh lưu (Rectifier): Biến đổi điện áp xoay chiều của nguồn lưới AC (220V hoặc 380V) thành điện áp một chiều DC phẳng nhờ cầu chỉnh lưu linh kiện bán dẫn Diode và tụ lọc nguồn điện dung tích lũy cực lớn.
2. Mạch liên kết một chiều trung gian (DC link / DC Bus): Thực chất là dàn tụ hóa điện dung cao nối song song. Vai trò là tích lũy, san phẳng gợn sóng điện áp một chiều DC sau chỉnh lưu chịu trách nhiệm cung cấp mức năng lượng ổn định dồi dào cho khâu nghịch lưu tiếp theo.
3. Mạch nghịch lưu (Inverter): Biến đổi điện áp một chiều DC trung gian thành nguồn điện áp AC ba pha giả lập cấp cho động cơ. Khâu này sử dụng các linh kiện chuyển mạch tốc độ cao là cổng bóng bán dẫn IGBT (Insulated Gate Bipolar Transistor). Các IGBT được kích đóng ngắt tần số cực cao theo phương pháp điều chế độ rộng xung (PWM - Pulse Width Modulation), tạo ra các xung điện áp kế cận mô phỏng sóng hình sin có tần số biến thiên rộng rãi (từ 0Hz đến 400Hz).

Lưu ý quy tắc an toàn bảo vệ tính mạng sinh viên tại xưởng Điện HACTECH:
Tụ hóa của khối DC Link tích điện áp rất cao đột ngột (dao động từ 380V đến 600V DC cực kỳ nguy hiểm). Kể cả sau khi đã aptomat ngắt toàn bộ điện nguồn cấp vào thiết bị, các tụ này vẫn còn ngậm điện tích sụt giảm chậm rạp.
Quy định bắt buộc:
Sinh viên HACTECH sau khi cắt nguồn điện chạy máy, KHÔNG được chạm tay trực tiếp hoặc dùng tua vít chọc bảng cực đấu nối của biến tần.
Phải nhìn chằm chằm vào đèn LED chỉ thị cảnh báo điện tích (thường ký hiệu sấm sét hoặc nốt cảnh báo CHARGE/HIGH VOLTAGE). Chỉ khi đèn LED dập tắt hoàn toàn, đồng thời dùng đồng hồ vạn năng VOM đo điện áp hai cực DC+ và DC- về dưới mức an toàn (dưới 12V), và đợi tối thiểu 5 đến 10 phút mới được tiến hành dùng kìm kẹp, đo dây tiếp xúc thực hành bảo dưỡng.`
  },
  {
    title: "Phanh ABS ô tô",
    subjectName: "Công nghệ kĩ thuật Ô tô",
    department: "Khoa Công nghệ Ô tô",
    lessonTitle: "Quy trình đo kiểm tra kỹ thuật cảm biến tốc độ bánh xe ABS",
    studentTarget: "Sinh viên năm 3 chuyên ngành ô tô thực tập xưởng gầm",
    learningObjectives: "Nắm vững nguyên lý và thành thạo 3 bước kiểm tra chất lượng cảm biến tốc độ ABS kiểu điện từ bằng đồng hồ vạn năng VOM.",
    lectureContent: `Quy trình kiểm tra hệ thống phanh chống bó cứng ABS ô tô: 
Hệ thống phanh chống bó cứng ABS bao gồm hai cơ cấu điều khiển chính: Cảm biến tốc độ bánh xe (Wheel Speed Sensors) hoạt động gửi tín hiệu liên tục, ABS ECU xử lý số liệu điều khiển và Bộ điều hành thủy lực (Hydraulic Modulator) nhấp nhả áp lực dầu phanh liên tục 15-30 lần/giây, ngăn việc bánh xe bị bó cứng gây trượt lết mất lái.

Trong bài học này, chúng ta tập trung đo kiểm Cảm biến tốc độ loại điện từ hoạt động tương tác với vòng răng tạo xung (Rotor) lắp trên moay-ơ bánh xe. Khi bánh xe quay, các răng quét qua cuộn dâytạo ra một suất điện động xoay chiều hình sin (tín hiệu xung hiệu điện thế AC) truyền về ECU.

Quy trình 3 bước đo kiểm tra kỹ thuật của sinh viên ô tô tại xưởng thực tập HACTECH:

Bước 1: Kiểm định trực quan vật lý bên ngoài và đọc lỗi bằng Máy chẩn đoán OBD-II
- Tiến hành kích nâng xe ổn định trên cầu nâng 2 trụ chắc chắn, cài chốt cơ an toàn.
- Cắm máy đọc lỗi OBD-II (ví dụ: máy chuyên dụng G-Scan) vào giắc kết nối chẩn đoán trên vô lăng để kiểm tra mã lỗi DTC (Diagnostic Trouble Codes). Xem ECU có ghi nhận lỗi mất tín hiệu cảm biến bánh xe nào không (ví dụ lỗi hở mạch, lỗi ngắn mạch cảm biến).
- Tiến hành tháo bánh xe và tháo cảm biến để lau sạch bụi dầu phanh, phoi sắt hoặc bùn đất bám ở đầu cảm biến và gạt bẩn trên các khe rãnh vòng răng xung.

Bước 2: Đo kiểm thông cơ bản - Đo điện trở kháng cuộn dây cảm biến tốc độ
- Rút giắc cắm điện nối cảm biến ABS với hộp điều khiển.
- Chuyển đồng hồ đo vạn năng điện tử VOM về thang đo điện trở Ohm (Ω).
- Đưa hai đầu que đo tiếp xúc trực tiếp vào 2 chân cực của đầu giắc cảm biến.
- Đọc thông số hiển thị: Thông số của cảm biến tốc độ loại điện từ chuẩn thường nằm trong khoảng dải đo từ 1.0 đến 1.5 Kilo-Ohm (KΩ). Ký hiệu hiển thị nằm trong ngưỡng này tức cuộn dây tốt. Nếu giá trị điện trở bằng vô cùng (infinity) tức là cuộn dây bên trong bị hở đứt. Nếu điện trở bằng 0 tức cuộn dây cảm biến bị chập cháy mạch ngắn.

Bước 3: Đo kiểm điều kiện phát dòng - Đo điện áp tín hiệu xoay chiều AC sinh ra khi bánh xe chuyển động quay
- Giữ nguyên giắc cắm đã rút ra, điều chỉnh vặn núm đồng hồ đo VOM về thang đo xoay chiều dạng hiệu điện thế AC nhỏ (mức Millivolt hoặc dưới 2V AC).
- Chạm hai que đo vào 2 chân cảm biến. Dùng lực tay quay bánh xe quay tự do với tốc độ trung bình ổn định khoảng 1 vòng/giây.
- Quan sát màn hình LCD: Nếu kim nhảy dao động phát sinh dòng điện cảm ứng nhỏ tầm từ 0.1V đến 0.5V AC biến thiên đều đặn, tức lõi từ cảm ứng và cuộn dây phát thế hoạt động nhạy tốt. Nếu điện áp AC đứng im ở 0V bất chấp tốc độ bánh quay, tức lõi nam châm hỏng hóc mất từ tính bọc, cảm biến phải thay lắp mới.`
  }
];

export default function MaterialStudio({ initialFormat, initialPrompt, onClearInitial }: MaterialStudioProps) {
  const [context, setContext] = useState<SubjectContext>({
    subjectName: "",
    department: HACTECH_DEPARTMENTS[0].name,
    lessonTitle: "",
    studentTarget: "Sinh viên Cao đẳng kỹ thuật HACTECH",
    learningObjectives: "Hiểu giải nghĩa lý thuyết và rèn luyện thực hành tay nghề thao tác chuẩn.",
    lectureContent: "",
    customInstructions: ""
  });

  const [activeFormat, setActiveFormat] = useState<MaterialType>("podcast");
  const [generatedResult, setGeneratedResult] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Custom generation loading index animator steps
  const [loadingStep, setLoadingStep] = useState(0);

  // Client side draft history save mechanism
  const [draftHistory, setDraftHistory] = useState<GeneratedMaterial[]>([]);

  const getFormatVietnameseName = (type: MaterialType) => {
    switch (type) {
      case "podcast": return "Kịch bản Podcast";
      case "slides": return "Dàn ý Slide & Speaker Notes";
      case "handout": return "Tài liệu Handout / Study Guide";
      case "flashcards": return "Flashcard & Trắc nghiệm";
      case "compare_table": return "Bảng đối chiếu kỹ thuật";
      case "infographic": return "Blueprint thiết kế đồ họa";
      default: return "Học liệu";
    }
  };

  // Apply initial format/prompt passed from NotebookLM guidebook applicator
  React.useEffect(() => {
    if (initialFormat) {
      setActiveFormat(initialFormat);
      if (initialPrompt) {
        setContext(prev => ({
          ...prev,
          customInstructions: initialPrompt
        }));
      }
      onClearInitial();
    }
  }, [initialFormat, initialPrompt]);

  const loadSample = (index: number) => {
    const sample = SAMPLES[index];
    setContext({
      subjectName: sample.subjectName,
      department: sample.department,
      lessonTitle: sample.lessonTitle,
      studentTarget: sample.studentTarget,
      learningObjectives: sample.learningObjectives,
      lectureContent: sample.lectureContent,
      customInstructions: ""
    });
    setErrorMsg("");
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!context.subjectName || !context.lessonTitle || !context.lectureContent) {
      setErrorMsg("Vui lòng nhập đầy đủ Tên môn học, Tên bài học và Nội dung bài giảng gốc.");
      return;
    }

    setErrorMsg("");
    setIsGenerating(true);
    setLoadingStep(0);

    // Simulate animated educational compile checklists
    const interval = setInterval(() => {
      setLoadingStep(step => {
        if (step < 3) return step + 1;
        return step;
      });
    }, 2200);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...context,
          format: activeFormat
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gửi yêu cầu khởi tạo thất bại.");
      }

      setGeneratedResult(data.content || "");
      
      // Auto add to memory draft list
      const newItem: GeneratedMaterial = {
        id: `draft_${Date.now()}`,
        type: activeFormat,
        title: `${getFormatVietnameseName(activeFormat)}: ${context.lessonTitle}`,
        subjectName: context.subjectName,
        lessonTitle: context.lessonTitle,
        content: data.content,
        createdAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      };
      setDraftHistory(prev => [newItem, ...prev]);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Đã xảy ra sự cố khi kết nối máy chủ AI.");
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult);
    alert("Đã sao chép toàn bộ học liệu vào khay nhớ tạm!");
  };

  const downloadAsMarkdown = () => {
    if (!generatedResult) return;
    const blob = new Blob([generatedResult], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `HocLieu_NotebookLM_${context.lessonTitle.replace(/\s+/g, "_")}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftHistory(prev => prev.filter(item => item.id !== id));
  };

  const loadHistoryItem = (item: GeneratedMaterial) => {
    setGeneratedResult(item.content);
    setContext(prev => ({
      ...prev,
      subjectName: item.subjectName,
      lessonTitle: item.lessonTitle
    }));
    setActiveFormat(item.type);
  };

  const currentSubjects = HACTECH_DEPARTMENTS.find(d => d.name === context.department)?.subjects || [];

  const loadingMessages = [
    "Đang phân tích cấu trúc bài giảng công nghệ thô của giảng viên...",
    "Đồng bộ hóa quy chuẩn kỹ thuật cẩm nang thực chiến NotebookLM 2026...",
    "Đang thiết kế tạo lập học liệu sư phạm cao cấp đạt tiêu chuẩn HACTECH...",
    "Đang định dạng tối ưu dữ liệu Markdown và câu hỏi thử nghiệm..."
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 animate-fade-in">
      
      {/* LEFT FORM COLUMN: Inputs */}
      <div className="xl:col-span-12 lg:xl:col-span-5 flex flex-col space-y-6">
        
        {/* Load predefined models banner */}
        <div className="bg-white border border-slate-205 rounded-xl p-4 shadow-xs">
          <span className="font-mono text-[10px] text-red-600 font-bold uppercase tracking-wider block mb-2">⭐ Kiểm thử nhanh giáo trình</span>
          <div className="flex flex-wrap gap-2">
            {SAMPLES.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadSample(idx)}
                className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors text-left cursor-pointer"
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleGenerate} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="font-sans font-bold text-slate-800 text-md border-b border-slate-100 pb-3 flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-red-650" />
            <span>Thông số bài học {context.subjectName ? `[${context.subjectName}]` : ""}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Department selector */}
            <div>
              <label className="block text-slate-700 text-xs font-semibold mb-1">Khoa đào tạo</label>
              <select
                value={context.department}
                onChange={(e) => {
                  const dept = e.target.value;
                  const firstSub = HACTECH_DEPARTMENTS.find(d => d.name === dept)?.subjects[0] || "";
                  setContext(prev => ({ ...prev, department: dept, subjectName: firstSub }));
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs text-slate-750 focus:outline-none focus:border-red-500"
              >
                {HACTECH_DEPARTMENTS.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Subject Name Selector */}
            <div>
              <label className="block text-slate-700 text-xs font-semibold mb-1">Tên môn học</label>
              <select
                value={context.subjectName}
                onChange={(e) => setContext(prev => ({ ...prev, subjectName: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs text-slate-750 focus:outline-none focus:border-red-500"
              >
                <option value="">-- Chọn hoặc gõ tên môn học --</option>
                {currentSubjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {/* If user wants atypical custom subject name */}
            <input
              type="text"
              placeholder="Hoặc gõ thủ công môn học khác nếu không nằm trong danh sách khoa..."
              value={context.subjectName}
              onChange={(e) => setContext(prev => ({ ...prev, subjectName: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs text-slate-700 placeholder-slate-450 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 text-xs font-bold mb-1">Tên bài giảng hoặc bài thực hành</label>
            <input
              type="text"
              placeholder="VD: Cấu tạo phanh đĩa thủy lực..."
              value={context.lessonTitle}
              required
              onChange={(e) => setContext(prev => ({ ...prev, lessonTitle: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-650 text-[11px] font-semibold mb-1">Đối tượng sinh viên target</label>
              <input
                type="text"
                placeholder="VD: Sinh viên cao đẳng Ô tô K15"
                value={context.studentTarget}
                onChange={(e) => setContext(prev => ({ ...prev, studentTarget: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs text-slate-700 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-slate-650 text-[11px] font-semibold mb-1">Nhiệm vụ đào tạo / Đầu ra mục tiêu</label>
              <input
                type="text"
                placeholder="VD: Đạt 100% kỹ năng bảo vệ điện cực..."
                value={context.learningObjectives}
                onChange={(e) => setContext(prev => ({ ...prev, learningObjectives: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs text-slate-700 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-slate-700 text-xs font-bold">Tài liệu học tập gốc (Nội dung thô giáo trình)</label>
              <span className="text-[10px] text-slate-400 font-mono">{context.lectureContent.length} ký tự</span>
            </div>
            <textarea
              rows={8}
              placeholder="Hãy dán nội dung bài học thô, các nguyên lý cấu tạo, sổ tay hướng dẫn kỹ thuật vào đây để AI đồng bộ..."
              value={context.lectureContent}
              required
              onChange={(e) => setContext(prev => ({ ...prev, lectureContent: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 font-sans"
            />
          </div>

          <div>
            <label className="block text-slate-650 text-[11px] font-semibold mb-1">Hướng dẫn phụ từ giảng viên (Nếu có)</label>
            <input
              type="text"
              placeholder="VD: Viết vui vẻ hài hước hơn..."
              value={context.customInstructions}
              onChange={(e) => setContext(prev => ({ ...prev, customInstructions: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs text-slate-700 focus:outline-none focus:border-red-500"
            />
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-650 p-3 rounded-lg flex items-start space-x-2 text-xs">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Trigger Generate */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-650 hover:to-red-800 disabled:opacity-50 text-white font-bold rounded-lg shadow-sm shadow-red-100 transition-all flex items-center justify-center space-x-2 cursor-pointer text-sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Đang đồng bộ hóa học liệu...</span>
              </>
            ) : (
              <>
                <span>Tạo Học Liệu Sư Phạm</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* RIGHT PREVIEW COLUMN: Output display & Draft History */}
      <div className="xl:col-span-12 lg:xl:col-span-7 flex flex-col space-y-6">
        
        {/* Output format selectors */}
        <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs">
          <span className="text-[10px] text-slate-500 font-mono px-2 block mb-2 font-semibold">MÔ THỨC KHỞI TẠO NOTEBOOKLM STUDIO</span>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
            {(["podcast", "slides", "handout", "flashcards", "compare_table", "infographic"] as MaterialType[]).map((fmt) => {
              const active = activeFormat === fmt;
              let icon = <FileText className="w-4 h-4" />;
              let label = "Handout";
              if (fmt === "podcast") { icon = <Mic className="w-4 h-4" />; label = "Podcast"; }
              if (fmt === "slides") { icon = <Tv className="w-4 h-4" />; label = "Slides"; }
              if (fmt === "flashcards") { icon = <Layers className="w-4 h-4" />; label = "Self-Quiz"; }
              if (fmt === "compare_table") { icon = <Table className="w-4 h-4" />; label = "Bảng đối"; }
              if (fmt === "infographic") { icon = <Sparkles className="w-4 h-4" />; label = "Info layout"; }

              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => {
                    setActiveFormat(fmt);
                  }}
                  className={`py-2 px-1 text-center rounded-lg flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    active 
                      ? "bg-red-600 text-white font-bold shadow-xs shadow-red-100" 
                      : "bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {icon}
                  <span className="text-[9px] font-mono leading-none tracking-tight truncate max-w-full">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col min-h-[460px] h-full relative">
          
          {/* Action Tools Header */}
          {generatedResult && (
            <div className="border-b border-slate-200 pb-3 mb-4 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-green-650" />
                <span className="text-xs font-mono text-slate-650 font-bold">
                  Đầu ra: {getFormatVietnameseName(activeFormat)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                   type="button"
                   onClick={copyToClipboard}
                   className="bg-slate-100 hover:bg-slate-205 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 cursor-pointer transition-colors"
                   title="Sao chép toàn bộ"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </button>
                <button
                  type="button"
                  onClick={downloadAsMarkdown}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 cursor-pointer transition-colors font-medium shadow-xs shadow-red-100"
                  title="Tải tệp .md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải tệp .md</span>
                </button>
              </div>
            </div>
          )}

          {/* Core Body Container */}
          <div className="flex-1 overflow-y-auto max-h-[500px]">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center space-y-6 py-20">
                <div className="relative">
                  <Loader2 className="w-12 h-12 animate-spin text-red-650" />
                  <Cpu className="w-5 h-5 text-red-700 absolute top-3.5 left-3.5" />
                </div>
                <div className="text-center max-w-sm">
                  <h4 className="font-sans font-bold text-slate-800 text-md">Đang xử lý tài liệu kỹ thuật...</h4>
                  <p className="text-slate-500 text-xs mt-1 animate-pulse min-h-[30px]">
                    {loadingMessages[loadingStep]}
                  </p>
                  
                  {/* Fake animated compilation indicators progress bar */}
                  <div className="w-48 bg-slate-100 h-1.5 rounded-full overflow-hidden mx-auto mt-4">
                    <motion.div 
                      className="bg-red-600 h-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(loadingStep + 1) * 25}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            ) : generatedResult ? (
              /* Custom rendered beautiful Markdown viewer to fit styled themes safely */
              <div className="prose prose-slate max-w-none text-slate-700 text-xs lg:text-sm space-y-4">
                {generatedResult.split("\n").map((line, idx) => {
                  const titleMatch = line.match(/^(#{1,5})\s+(.*)$/);
                  if (titleMatch) {
                    const depth = titleMatch[1].length;
                    const text = titleMatch[2];
                    if (depth === 1) return <h2 key={idx} className="text-lg lg:text-xl font-bold text-slate-950 border-b border-slate-200 pb-2 mt-4">{text}</h2>;
                    if (depth === 2) return <h3 key={idx} className="text-md lg:text-lg font-bold text-red-605 mt-4">{text}</h3>;
                    return <h4 key={idx} className="text-xs lg:text-sm font-semibold text-red-700 mt-3">{text}</h4>;
                  }

                  if (line.trim().startsWith("- [ ]") || line.trim().startsWith("- [x]")) {
                    const checked = line.includes("[x]");
                    return (
                      <div key={idx} className="flex items-center space-x-2 my-1.5 pl-2">
                        <input type="checkbox" checked={checked} readOnly className="rounded border-slate-300 bg-slate-50 text-red-600 cursor-default" />
                        <span className={checked ? "line-through text-slate-400" : "text-slate-705"}>{line.replace(/^.*\[.\s*\]/, "")}</span>
                      </div>
                    );
                  }

                  if (line.startsWith("- ") || line.startsWith("* ")) {
                    return <li key={idx} className="list-disc pl-5 py-0.5 text-slate-650">{line.substring(2)}</li>;
                  }

                  if (line.match(/^\d+\.\s/)) {
                    return <li key={idx} className="list-decimal pl-5 py-0.5 text-slate-650">{line.replace(/^\d+\.\s/, "")}</li>;
                  }

                  // Table support
                  if (line.startsWith("|") && line.endsWith("|")) {
                    if (line.includes("---")) return null; // skip separator row
                    const cols = line.split("|").map(col => col.trim()).filter(Boolean);
                    const isHeader = idx === 0 || (generatedResult.split("\n")[idx - 1] === ""); // simplified header detection
                    return (
                      <div key={idx} className="overflow-x-auto my-1 bg-slate-50 first-of-type:rounded-t last-of-type:rounded-b">
                        <table className="min-w-full text-[11px] font-mono border-collapse">
                          <tbody>
                            <tr>
                              {cols.map((c, cIdx) => (
                                <td key={cIdx} className={`px-3 py-1.5 border border-slate-200 ${isHeader ? "bg-slate-100 text-red-600 font-bold text-center" : "text-slate-700"}`}>
                                  {c}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  if (line.trim() === "---") {
                    return <hr key={idx} className="border-slate-200 my-4" />;
                  }

                  // Vai thoại check for podcast script mapping
                  if (line.startsWith("Thầy Minh:") || line.startsWith("Cô Lan:")) {
                    const isMinh = line.startsWith("Thầy Minh:");
                    return (
                      <div key={idx} className={`p-3 my-2.5 rounded-xl border ${
                        isMinh ? "bg-red-50/40 border-red-105 ml-0 mr-8 animate-fade-in" : "bg-blue-50/40 border-blue-105 ml-8 mr-0 animate-fade-in"
                      }`}>
                        <span className={`font-mono text-xs font-bold block mb-0.5 ${isMinh ? "text-red-700" : "text-blue-700"}`}>
                          {isMinh ? "🎙️ Thầy Minh HACTECH" : "🎙️ Cô Lan Giảng viên"}
                        </span>
                        <p className="text-xs text-slate-700 italic">{line.substring(line.indexOf(":") + 1).trim()}</p>
                      </div>
                    );
                  }

                  return <p key={idx} className="text-slate-650 text-xs lg:text-sm whitespace-pre-line leading-relaxed min-h-[14px]">{line}</p>;
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-24 text-slate-400">
                <Bookmark className="w-12 h-12 text-slate-300 mb-3" />
                <h4 className="font-sans font-bold text-slate-500">Trống</h4>
                <p className="text-slate-400 text-xs mt-1 max-w-xs font-semibold">
                  Điền các dữ liệu kỹ thuật ở bảng bên trái và chọn phong cách NotebookLM Studio phía trên, sau đó nhấn "Tạo Học Liệu" để biên tập.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Draft Archive Memory queue */}
        {draftHistory.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h4 className="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2 mb-3">
              <History className="w-4 h-4 text-red-650" />
              <span>Ghi nhớ học liệu đã tạo ({draftHistory.length})</span>
            </h4>
            <div className="flex flex-col space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {draftHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg cursor-pointer flex items-center justify-between text-xs transition-all animate-fade-in"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="bg-slate-250 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-mono whitespace-nowrap">
                      {item.createdAt}
                    </span>
                    <p className="text-slate-800 truncate font-sans font-semibold">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 pl-1">
                    <button
                      type="button"
                      onClick={(e) => deleteHistoryItem(item.id, e)}
                      className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                      title="Xóa bản lưu này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
