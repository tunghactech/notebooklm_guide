import { HandbookTopic, SubjectDepartment } from './types';

export const HACTECH_DEPARTMENTS: SubjectDepartment[] = [
  {
    name: "Khoa Công nghệ thông tin",
    subjects: [
      "Lập trình Web (HTML/CSS/JS/React)",
      "Quản trị Hệ điều hành Linux / Windows Server",
      "Cơ sở dữ liệu (MySQL/SQL Server)",
      "Cấu trúc dữ liệu và Giải thuật",
      "Mạng máy tính và An toàn thông tin",
      "Lập trình Di động (Android/Flutter)",
      "Lắp ráp và Cài đặt máy tính"
    ]
  },
  {
    name: "Khoa Điện - Điện tử",
    subjects: [
      "Kỹ thuật Điện - Điện tử cơ bản",
      "Vi điều khiển và Ứng dụng (Arduino/PIC/STM32)",
      "Điện tử công suất",
      "Hệ thống điều khiển tự động (PLC)",
      "Đo lường và Cảm biến",
      "Điện dân dụng và Công nghiệp"
    ]
  },
  {
    name: "Khoa Cơ khí - Chế tạo",
    subjects: [
      "Vẽ kỹ thuật cơ khí (AutoCAD/SolidWorks)",
      "Công nghệ chế tạo máy & CNC",
      "Kỹ thuật hàn điện - hàn khí",
      "Sức bền vật liệu",
      "Cơ học máy và Dung sai đo lường"
    ]
  },
  {
    name: "Khoa Công nghệ Ô tô",
    subjects: [
      "Cấu tạo động cơ đốt trong",
      "Hệ thống điện và Điện tử ô tô",
      "Hệ thống truyền lực và Gầm ô tô",
      "Kỹ thuật chẩn đoán và Bảo dưỡng ô tô"
    ]
  },
  {
    name: "Khoa Kinh tế & Quản lý",
    subjects: [
      "Kế toán doanh nghiệp",
      "Quản trị học đại cương",
      "Logistics và Quản lý chuỗi cung ứng",
      "Thương mại điện tử cơ bản"
    ]
  }
];

export const HANDBOOK_TOPICS: HandbookTopic[] = [
  {
    chapterNumber: 1,
    title: "NotebookLM là gì và Tại sao bạn cần biết",
    category: "Nền tảng",
    icon: "Compass",
    badge: "Khởi đầu",
    description: "Hiểu đúng định vị NotebookLM như một 'Sổ tay có trí tuệ nhân tạo' khác biệt hoàn toàn với ChatGPT/Gemini.",
    fullContent: `### Khái niệm cốt lõi: Sổ tay có AI
NotebookLM không phải là một chat bot trò chuyện thông thường dựa trên toàn bộ mạng Internet. Nó hoạt động chặt chẽ dựa trên những **tài liệu nguồn (Sources)** cụ thể mà người dùng tải lên.
- **ChatGPT/Gemini thông thường:** Phù hợp cho sáng tạo tự do, phát triển ý tưởng từ con số 0.
- **NotebookLM:** Phù hợp cho phân tích, tổng hợp và khai thác dữ liệu nội bộ một cách chính xác tuyệt đối, tránh hiện tượng sinh ảo (hallucination).

### Lợi ích to lớn đối với Giảng viên HACTECH
1. **Kiểm soát tính chính xác (Trích dẫn nguồn):** Khi trả lời câu hỏi, NotebookLM luôn gắn các chỉ số nhỏ chứa đường dẫn gốc đến đúng trang, đúng file nguồn giúp giảng viên dễ dàng thẩm định.
2. **Đồng bộ bài giảng:** Chuyển đổi tài liệu giáo trình kỹ thuật khô khan thành nhiều học liệu sinh động: Podcast thảo luận giải thích, slide tóm tắt định hướng, bài tự kiểm tra (quiz)...`,
    bestPractices: [
      "Chỉ dùng dữ liệu trong nguồn do mình cung cấp.",
      "Luôn kiểm tra chéo các thông tin chuyên ngành quan trọng.",
      "Không lạm dụng để viết nội dung sáng tạo hoàn toàn mới từ con số 0."
    ]
  },
  {
    chapterNumber: 2,
    title: "5 Bước làm quen NotebookLM nhanh chóng",
    category: "Nền tảng",
    icon: "CheckSquare",
    description: "Các bước cơ bản để tạo sổ tay đầu tiên, tải giáo trình lên và đặt câu hỏi mở màn khai thác dữ liệu.",
    fullContent: `### Quy trình thực hành cơ bản của Giảng viên:
- **Bước 1 — Tạo Sổ tay (Notebook):** Truy cập [notebooklm.google.com](https://notebooklm.google.com), nhấn 'Create new notebook'. Đặt tên theo nguyên tắc vàng: \`1 Sổ tay = 1 Học phần / Chủ đề cụ thể\` (Ví dụ: "Hệ quản trị CSDL - Học kỳ II").
- **Bước 2 — Nạp nội dung:** Chọn tải tệp PDF giáo trình, trang web, liên kết âm thanh học liệu hoặc Google Docs bài giảng.
- **Bước 3 — Hỏi đáp khai quật dữ liệu:** Đặt câu hỏi trong khung chat để khảo sát tài liệu nhanh chóng.
- **Bước 4 — Lưu ghi chú (Notes):** Lưu lại các câu phản hồi đắt giá để tái sử dụng trong mục Notes.
- **Bước 5 — Trải nghiệm Studio đầu ra:** Tạo báo cáo tóm tắt (Report) hoặc Bản đồ tư duy (Mindmap) từ góc Studio bên phải.`,
    bestPractices: [
      "Nên lựa chọn tệp PDF có định dạng văn bản (text layer) thay vì bản chụp mờ.",
      "Thực hiện lưu 'Save to note' các ý chính để tích hợp sâu hơn sau này.",
      "Đặt tên file rõ ràng khoa học trước khi tải lên."
    ],
    promptTemplate: `Tóm tắt giáo cụ này trong 5 ý chính phục vụ cho công tác đào tạo thực hành tại xưởng kỹ thuật.`
  },
  {
    chapterNumber: 4,
    title: "Audio Overview: Biến giáo trình thành Podcast đối thoại",
    category: "Studio",
    icon: "Mic",
    badge: "Hot Feature",
    description: "Tính năng gây sốt giúp chuyển tài liệu bài dạy khô khan thành kịch bản podcast đối thoại tự nhiên giữa 2 chuyên gia.",
    fullContent: `### Ứng dụng đột phá trong giảng dạy HACTECH:
Audio Overview giúp tạo ra các bản thảo kịch bản thu âm hoặc tệp đa phương tiện nơi hai người dẫn thoại (một nam, một nữ) bằng tiếng Việt tự nhiên thảo luận sâu sắc về bài giảng. Họ tranh luận, giải nghĩa từ vựng, trích xuất ví dụ thực tiễn một cách cuốn hút.

### Quy cách thiết lập tùy biến (Customization):
Khi mở tính năng này trong Studio, không nên chọn 'Generate' ngay lập tức mà nên nhấn nút **Tùy biến (Customize)**:
1. **Ngôn ngữ:** Chọn Tiếng Việt để tóm tắt mạch lạc bằng tiếng mẹ đẻ.
2. **Prompt định hướng:** Đưa chỉ dẫn chi tiết về đối tượng người nghe là sinh viên nghề, tập trung giải thích phần thực hành trực quan và giữ tông giọng thân thiện, hài hước ấm áp.`,
    bestPractices: [
      "Chia nhỏ tài liệu dài thành nhiều phần để tránh bị loãng hoặc mất ý.",
      "Ghi chép lại các điểm nhấn thú vị bằng Note.",
      "Bổ sung các yêu cầu bối cảnh cụ thể trong câu lệnh định hướng."
    ],
    promptTemplate: `Khán giả là sinh viên lớp thực hành điện HACTECH. Mục tiêu là thảo luận trực quan, dễ hiểu về quy trình an toàn lao động chống điện giật. Hãy đưa ra ví dụ tình huống cụ thể tại xưởng máy và giữ giọng điệu gần gũi, cảnh báo mạnh mẽ những sai sót thường gặp.`
  },
  {
    chapterNumber: 5,
    title: "Presentation & Slide Deck: Cách tạo khung bài giảng chuẩn",
    category: "Studio",
    icon: "Tv",
    description: "Cách thiết kế bộ slide trực quan đi kèm Speaker Notes cho giảng viên giảng dạy trên bục lớp học.",
    fullContent: `### Hai chế độ Slide Deck hữu ích trong sư phạm:
1. **Detailed Deck (Slide học liệu đọc lập):** Đầy đủ chữ nghĩa, cấu trúc rõ ràng thích hợp để gửi cho sinh viên tự xem trước buổi học hoặc tóm tắt sau khi kết thúc.
2. **Presenter Slides (Slide trình giảng):** Tối giản, chủ yếu là tiêu đề lớn, từ khóa cốt lõi, sơ đồ và ** Speaker Notes** nằm gọn gàng bên dưới để thầy cô biết chính xác mình cần nói gì ở mỗi slide.

### Workflow tối ưu của Giảng viên:
\`Giáo trình PDF thô -> Tạo bộ Report trước -> Chuyển thành Slide Deck -> Tinh chỉnh thiết kế đồ họa tinh xảo (Canva)\``,
    bestPractices: [
      "Không đưa nguyên văn cả đoạn văn khô cứng từ giáo trình lên màn hình slide.",
      "Bắt buộc yêu cầu AI tạo Speaker Notes chi tiết hướng dẫn giảng giải.",
      "Giới hạn số lượng trang slide từ 10 - 15 trang để thu hút sự tập trung."
    ],
    promptTemplate: `Đối tượng người học: Sinh viên năm thứ 2 công nghệ ô tô. Khung thời gian giảng dạy: 45 phút. Hãy tạo một bộ Slide thuyết trình gồm 10 trang, phong cách rõ ràng, dễ nhớ, tập trung vào cấu tạo hệ thống phanh ABS. Thêm phần Speaker notes hướng dẫn giảng dạy ở từng slide.`
  },
  {
    chapterNumber: 8,
    title: "Report & Briefing: Biên soạn giáo trình Handout / Study Guide",
    category: "Studio",
    icon: "FileText",
    description: "Xây dựng tài liệu hướng dẫn học bài có cấu trúc chặt chẽ, chú giải thuật ngữ kỹ thuật, cung cấp ví dụ và câu hỏi thực hành.",
    fullContent: `### Khái niệm thiết kế tài liệu học tập
Một học liệu chất lượng cần cấu trúc chặt chẽ rõ ràng nhằm thay thế các trang sách viết dày đặc chữ. Định dạng **Study Guide** của NotebookLM tạo ra một cấu trúc hoàn chỉnh bao gồm các mục:
- Chú giải thuật ngữ kỹ thuật viết in đậm kèm định nghĩa.
- Ví dụ tình huống mô tả thực nghiệm sinh động.
- Các câu hỏi thảo luận đào sâu tư duy thực hành kỹ thuật.

### Các định dạng đầu ra thường gặp của lớp học nghề:
- **Briefing Document:** Giáo tài tóm tắt ngắn cho sinh viên xem lướt.
- **Study Guide:** Cẩm nang ôn luyện kỹ thuật toàn diện trước kỳ thi sát hạch tay nghề.
- **FAQ Document:** Trả lời các thắc mắc rắc rối thường gặp nhất trong lắp ráp máy hoặc bảo dưỡng cơ khí.`,
    bestPractices: [
      "Đóng khung cấu trúc 5 - 7 mục rõ ràng trong prompt.",
      "Yêu cầu AI liệt kê rõ số trang của tài liệu kỹ thuật gốc để kiểm chứng.",
      "Export đầu ra sang Google Docs để định dạng phông chữ mẫu trường HACTECH."
    ],
    promptTemplate: `Hãy thiết kế một bản Study Guide học tập hoàn chỉnh về cấu trúc bộ lọc và phân loại cảm biến. Hãy dùng định nghĩa in đậm, cung cấp ví dụ thực tiễn trong công nghiệp điện tử và 5 câu hỏi ôn thi kèm đáp án giải thích.`
  },
  {
    chapterNumber: 9,
    title: "Flashcard & Quiz: Bộ đôi vàng kiểm tra bám sát giáo án",
    category: "Studio",
    icon: "Layers",
    badge: "Sư phạm",
    description: "Tạo hệ thống câu hỏi trắc nghiệm khách quan cùng thẻ nhớ học tập thông minh giúp sinh viên phản xạ kiến thức lý thuyết.",
    fullContent: `### Chiến lược ôn tập hiệu quả với Học tập Chủ động (Active Recall):
Thay vì bắt học sinh đọc đi đọc lại thụ động, hãy biến bài học thành trò chơi.
1. **Flashcards (Thẻ ghi nhớ):** Mặt trước là sơ đồ/khái niệm thô (Ví dụ: 'Sự khác biệt giữa Cần trục và Cẩu tháp?'), mặt sau là định nghĩa mấu chốt dễ nhớ kèm mẹo phân biệt.
2. **Quiz (Trắc nghiệm):** 10 - 15 câu chọn đáp án A, B, C, D bám sát bài học thực tế, đi kèm phần GIẢI THÍCH chi tiết vì sao đúng/sai để học sinh tự củng cố lỗ hổng.

### Ứng dụng trong xưởng thực hành:
Kiểm tra nhanh lý thuyết an toàn điện máy CNC 10 phút trước buổi đứng máy thực hành trực tiếp.`,
    bestPractices: [
      "Yêu cầu giải thích chi tiết trong đáp án để làm nổi bật kiến thức học.",
      "Nên chia nhỏ quiz thành các gói 10 - 15 câu để sinh viên đỡ nản.",
      "Phân chia độ khó câu hỏi thành 3 mức độ rõ rệt: Dễ, Trung bình, Khó."
    ],
    promptTemplate: `Tạo một bộ Quiz trắc nghiệm gồm 10 câu hỏi đa lựa chọn nhằm khảo sát kiến thức lập trình cơ sở dữ liệu MySQL của sinh viên. Mỗi câu hỏi phải có đầy đủ 4 đáp án loại trừ, chỉ rõ đáp án chính xác và có phần giải thích sư phạm tại sao đúng/sai.`
  },
  {
    chapterNumber: 11,
    title: "Data Table: So sánh kỹ thuật và Phân tích trực quan",
    category: "Studio",
    icon: "Table",
    description: "Trích xuất so sánh các thông số kỹ thuật, ưu nhược điểm của các giải pháp công nghệ trực quan từ tài liệu giáo khoa.",
    fullContent: `### Sức mạnh hệ thống bảng biểu so sánh:
Sinh viên kỹ thuật thường bị nhầm lẫn giữa vô số các thông số kỹ thuật của linh kiện, thiết bị, giao thức. Công cụ **Data Table** hỗ trợ quét sạch tập tài liệu hàng trăm trang, trích xuất đúng tính chất cốt lõi để lập nên các bảng so sánh khoa học.

### Cách thiết lập cấu trúc bảng trong sư phạm:
Yêu cầu rõ ràng các cột dữ liệu cần thu thập, chẳng hạn như cho các dòng xe hơi điện hoặc các phiên bản ngôn ngữ:
1. Tên linh kiện kỹ thuật / Giao thức mạng
2. Nguyên lý mấu chốt
3. Ứng dụng thực hành tiêu biểu
4. Ưu điểm nổi trội
5. Điểm hạn chế hạn hẹp
6. Chú ý an toàn vận hành`,
    bestPractices: [
      "Phải thêm cột rào chắn 'Chưa đủ dữ liệu' trong câu lệnh để tránh AI sinh ảo.",
      "Khuyến nghị ghi chú định dạng đơn vị thống nhất (Volt, Ampe, Byte...).",
      "Chuẩn hóa dữ liệu ngắn gọn sắc bén để xuất thẳng sang Excel / Google Sheets."
    ],
    promptTemplate: `Lập bảng phân tích đối chiếu so sánh cụ thể giữa hai giao thức mạng TCP và UDP. Các cột bao gồm: Nguyên lý truyền, Độ tin cậy, Tốc độ, Ứng dụng điển hình tại doanh nghiệp và Khuyến cáo an toàn thông tin.`
  }
];

export const WORKFLOW_TEMPLATES = [
  {
    id: "wf_minh",
    title: "Quy trình Thầy Minh - Học Liệu Tương Tác & Luyện Tập",
    role: "Thầy Minh (Giáo viên IELTS / Giảng dạy lý thuyết & Thực hành)",
    steps: [
      "Phân nhóm bài nói/khái niệm thô theo đề tài chủ điểm",
      "Xây dựng Mind Map trực quan cấu trúc sơ đồ tóm lược",
      "Biên soạn Study Guide / Handout bài giảng chuẩn hóa thuật ngữ khoa học",
      "Xuất bộ Flashcards và Quiz trắc nghiệm khách quan đa độ khó để tập dượt"
    ],
    target: "Các bài giảng nhiều từ vựng chuyên ngành, khái niệm trừu tượng, ôn luyện thi cử, chuyển giao lý thuyết thành thói quen phản xạ."
  },
  {
    id: "wf_lan",
    title: "Quy trình Chị Lan - Đào Tạo Hội Nhập & Hướng Dẫn Kỹ Thuật",
    role: "Chị Lan (Trưởng phòng nhân sự / Hướng dẫn quy trình xưởng)",
    steps: [
      "Tóm tắt các quy định thực tập, quy định bảo an an toàn xưởng nghề (60 trang PDF)",
      "Tạo báo cáo FAQ ngắn gọn những câu hỏi 'sống còn' giải quyết nhanh",
      "Thiết kế bản vẽ sơ đồ Infographic định dạng checklist hoặc trục thời gian (timeline) 7 ngày đầu tiên",
      "Thiết lập Quiz kiểm tra điều kiện an toàn trước khi vào phân xưởng trực tiếp"
    ],
    target: "Bài hướng dẫn nội quy thực tập xưởng kỹ thuật, an toàn sử dụng nguồn điện cao thế, hướng dẫn sử dụng máy cơ khí chính xác CNC."
  },
  {
    id: "wf_khoa",
    title: "Quy trình Anh Khoa - Kết Hợp Đa Tài Liệu Thành Khóa Học",
    role: "Anh Khoa (Trainer / Xây dựng học liệu từ nhiều nguồn tham khảo rời rạc)",
    steps: [
      "Tổng hợp 3 - 5 cuốn sách công nghệ, tài liệu tham khảo kỹ thuật và tệp ghi chú thô",
      "Tạo Mind Map phân lớp liên kết tìm kiếm những phần trùng lặp hoặc mâu thuẫn để lược bỏ",
      "Tạo Study Guide chuyên sâu làm giáo án chi tiết khung xương giáo trình học phần",
      "Biên tập bộ Slide thuyết trình thông thái đính kèm Speaker notes hướng dẫn giảng giải"
    ],
    target: "Xây dựng giáo án hoàn toàn mới từ nhiều nguồn tổng hợp nước ngoài, cập nhật giáo trình kỹ thuật bám sát công nghệ thực tế 2026."
  }
];
