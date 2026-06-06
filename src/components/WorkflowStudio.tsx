import React, { useState } from "react";
import { WORKFLOW_TEMPLATES } from "../data";
import { 
  Workflow, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Loader2, 
  Copy, 
  Download, 
  User, 
  BookOpen, 
  AlertCircle,
  HelpCircle,
  Clock,
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function WorkflowStudio() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(WORKFLOW_TEMPLATES[0]);
  const [lectureText, setLectureText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentActiveStep, setCurrentActiveStep] = useState(0);
  const [pipelineResults, setPipelineResults] = useState<{ [key: number]: string }>({});
  const [errorMsg, setErrorMsg] = useState("");

  const handleRunPipeline = async () => {
    if (!lectureText.trim()) {
      setErrorMsg("Vui lòng cung cấp Tài liệu nguồn / Đề cương thô để khởi động dây chuyền sản xuất học liệu.");
      return;
    }

    setErrorMsg("");
    setIsProcessing(true);
    setCurrentActiveStep(0);
    setPipelineResults({});

    try {
      // We will perform a focused combined generative query to output structured parts
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectName: "Học Lý thuyết - Thực hành liên kết",
          department: "Phân xưởng Công nghệ HACTECH",
          lessonTitle: selectedWorkflow.title,
          studentTarget: "Sinh viên nghề kỹ thuật bách khoa",
          learningObjectives: "Chuẩn hóa năng lực thực hành thực nghiệm",
          lectureContent: lectureText,
          format: "handout", // We will request a special compound structure
          customInstructions: `
Yêu cầu đặc biệt: Đang chạy chuỗi liên kết học liệu Sư phạm: [${selectedWorkflow.title}].
Hãy biên tập thành sản phẩm tương ứng với các phân đoạn sau đây một cách cực kỳ chi tiết chuẩn hóa:

=== PHÂN ĐOẠN 1: ${selectedWorkflow.steps[0]} ===
[Hãy thiết kế nội dung chi tiết tương ứng với bước này của quy trình. Hãy viết đầy đủ bằng tiếng Việt, có chiều sâu sư phạm.]

=== PHÂN ĐOẠN 2: ${selectedWorkflow.steps[1]} ===
[Hãy thiết kế nội dung chi tiết tương ứng với bước này của quy trình. Hãy viết đầy đủ tiếng Việt, có kết cấu bài bản.]

=== PHÂN ĐOẠN 3: ${selectedWorkflow.steps[2]} ===
[Hãy thiết kế nội dung chi tiết tương ứng với bước này của quy trình. Thêm thuật ngữ, ví dụ thực tế.]

=== PHÂN ĐOẠN 4: ${selectedWorkflow.steps[3] || "Quy trình tổng kết kiểm tra tay nghề"} ===
[Hãy thiết kế nội dung chi tiết cuối cùng hoàn chỉnh quy trình.]
`
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gửi yêu cầu không thành công.");
      }

      const rawText = data.content || "";
      
      // Parse the segments based on === markers safely
      const segments: { [key: number]: string } = {};
      const parts = rawText.split(/===\s*PHÂN\s*ĐOẠN\s*\d+:\s*/i);
      
      let stepIdx = 0;
      parts.forEach(part => {
        if (!part.trim()) return;
        // Clean up title line
        const lines = part.split("\n");
        const contentLines = lines.slice(1);
        segments[stepIdx] = contentLines.join("\n").trim();
        stepIdx++;
      });

      // Fallback if split didn't find clear headings
      if (Object.keys(segments).length === 0) {
        // Divide long text evenly
        const chunks = rawText.match(/[\s\S]{1,2500}/g) || [rawText];
        chunks.forEach((chunk, idx) => {
          segments[idx] = chunk;
        });
      }

      setPipelineResults(segments);
      setCurrentActiveStep(0);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Đã xảy ra sự cố đột xuất khi khởi tạo dây chuyền.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyStepContent = () => {
    const text = pipelineResults[currentActiveStep];
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert(`Đã sao chép nội dung Bước ${currentActiveStep + 1} vào khay nhớ tạm!`);
  };

  const downloadStepContent = () => {
    const text = pipelineResults[currentActiveStep];
    if (!text) return;
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `HocLieu_LienKet_Buoc${currentActiveStep + 1}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="workflow-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT CONTROL COLUMN */}
      <div className="lg:col-span-4 flex flex-col space-y-4">
        
        {/* Choose Persona Pipeline Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-amber-500">
            <Workflow className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">NotebookLM Pipelines</span>
          </div>
          <h3 className="font-sans font-medium text-white text-md">
            Dây chuyền Học liệu liên kết (Chương 12)
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Thay vì tạo đơn lẻ từng mục, quy trình phối hợp tự động liên kết dữ liệu giúp tạo ra một bộ đồng bộ giáo khoa từ lý thuyết đến thực hành bám sát bối cảnh.
          </p>

          {/* Stepper Selection lists */}
          <div className="flex flex-col space-y-2">
            {WORKFLOW_TEMPLATES.map((wf) => {
              const selected = selectedWorkflow.id === wf.id;
              return (
                <div
                  key={wf.id}
                  onClick={() => {
                    setSelectedWorkflow(wf);
                    setPipelineResults({});
                    setErrorMsg("");
                  }}
                  className={`p-3 border rounded-xl cursor-pointer transition-all text-xs ${
                    selected
                      ? "bg-slate-850 border-amber-500 shadow"
                      : "bg-slate-950/60 border-slate-900 hover:bg-slate-900 hover:border-slate-800"
                  }`}
                >
                  <p className="font-mono text-[9px] text-amber-400 font-semibold">{wf.role}</p>
                  <h4 className="font-sans font-bold text-slate-100 mt-1">{wf.title}</h4>
                  <p className="text-slate-400 text-[10px] mt-1 line-clamp-1">{wf.target}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input Text Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <h4 className="font-sans font-medium text-white text-sm">
            Nạp Giáo tài thô / Nguyên lý cần liên kết
          </h4>
          <textarea
            rows={6}
            placeholder="Dán đề cương giáo trình, bài đo kiểm kỹ thuật, nội quy an toàn xưởng..."
            value={lectureText}
            onChange={(e) => setLectureText(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg flex items-start space-x-2 text-xs">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleRunPipeline}
            disabled={isProcessing}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center space-x-2 cursor-pointer transition-transform"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Đang xử lý dây chuyền liên hồi...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-slate-950 stroke-none" />
                <span>Khởi động dây chuyền liên học liệu</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* RIGHT PREVIEW & PIPELINE VISUAL ANIMATOR */}
      <div className="lg:col-span-8 flex flex-col space-y-5">
        
        {/* Workflow steps diagram */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <h4 className="font-mono text-xs font-semibold text-slate-350 uppercase tracking-wider mb-3">
            Sơ đồ chu trình liên kết: {selectedWorkflow.title}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {selectedWorkflow.steps.map((st, i) => {
              const completed = Object.keys(pipelineResults).length > 0;
              return (
                <div key={i} className="flex flex-col space-y-2 relative z-10">
                  <div className="flex items-center space-x-2">
                    <span className={`w-6 h-6 rounded-full font-mono text-xs font-semibold flex items-center justify-center shrink-0 ${
                      completed
                        ? "bg-green-500 text-slate-950"
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      {i + 1}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono tracking-tight uppercase">Bước {i + 1}</span>
                  </div>
                  <h5 className="font-sans font-medium text-slate-100 text-xs leading-snug">
                    {st}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>

        {/* Render Results step by step tabs */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex-1 min-h-[400px] flex flex-col">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-20 flex-1">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
              <div className="text-center">
                <p className="text-sm font-semibold text-white">Đang thực thi các bước phối hợp...</p>
                <p className="text-xs text-slate-400 mt-1">Dây chuyền đang viết kịch bản, bảng biểu, trắc nghiệm liên kết tự động.</p>
              </div>
            </div>
          ) : Object.keys(pipelineResults).length > 0 ? (
            <div className="flex-1 flex flex-col">
              
              {/* Steppers Tab Headers */}
              <div className="flex border-b border-slate-800 overflow-x-auto pb-1 mb-4 gap-1.5">
                {selectedWorkflow.steps.map((st, i) => {
                  const isActive = currentActiveStep === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentActiveStep(i)}
                      className={`text-xs px-3.5 py-2.5 rounded-lg border font-medium whitespace-nowrap cursor-pointer transition-colors ${
                        isActive
                          ? "bg-amber-500 border-amber-500 text-slate-950 font-bold"
                          : "bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      B.{i + 1}: {st.split(" - ")[0].split(" (")[0].substring(0, 20)}...
                    </button>
                  );
                })}
              </div>

              {/* Individual step preview header actions */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex-1 flex flex-col justify-between">
                
                {/* Visual Step title */}
                <div className="border-b border-slate-800 pb-2 mb-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-semibold tracking-wide">
                    Học liệu xuất ra cho: {selectedWorkflow.steps[currentActiveStep]}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={copyStepContent}
                      className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors"
                      title="Sao chép nội dung bước này"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={downloadStepContent}
                      className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors"
                      title="Tải tệp .md của bước này"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Styled text block */}
                <div className="text-xs lg:text-sm text-slate-200/90 whitespace-pre-line leading-relaxed overflow-y-auto max-h-[350px] font-sans pr-1">
                  {pipelineResults[currentActiveStep] ? (
                    pipelineResults[currentActiveStep].split("\n").map((line, lIdx) => {
                      if (line.trim().startsWith("#")) {
                        return <h4 key={lIdx} className="text-amber-500 font-sans font-semibold mt-3 mb-1.5">{line.replace(/#/g, "").trim()}</h4>;
                      }
                      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
                        return <li key={lIdx} className="list-disc pl-4 py-0.5 text-slate-300">{line.substring(2)}</li>;
                      }
                      return <p key={lIdx} className="text-slate-350 min-h-[14px]">{line}</p>;
                    })
                  ) : (
                    <span className="text-slate-500 italic block">Đang nạp dữ liệu bước này...</span>
                  )}
                </div>

                {/* Footer advice */}
                <div className="border-t border-slate-850 pt-3 mt-4 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Trường Cao đẳng Nghề Bách khoa Hà Nội</span>
                  <span>Chu kỳ liên thông 2026</span>
                </div>

              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-24 text-slate-500 flex-1">
              <Workflow className="w-12 h-12 text-slate-800 mb-3" />
              <h4 className="font-sans font-semibold text-slate-400 text-sm">Chưa khởi chạy</h4>
              <p className="text-slate-500 text-xs mt-1 max-w-xs">
                Vui lòng bổ sung Giáo kịch thô và click "Khởi động dây chuyền liên học liệu" ở bảng điều khiển bên trái để tạo sản phẩm liên kết đồng bộ.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
