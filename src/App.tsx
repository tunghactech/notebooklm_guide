import React, { useState } from "react";
import GuidebookViewer from "./components/GuidebookViewer";
import MaterialStudio from "./components/MaterialStudio";
import WorkflowStudio from "./components/WorkflowStudio";
import { MaterialType } from "./types";
import { 
  BookOpenCheck, 
  Cpu, 
  Workflow, 
  School, 
  Award, 
  ArrowUpRight, 
  Layers, 
  ChevronRight,
  Sparkles,
  PhoneCall,
  Globe
} from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"handbook" | "studio" | "workflow">("handbook");
  
  // Passed down callbacks for cross-tabs prompt applicator
  const [appliedFormat, setAppliedFormat] = useState<MaterialType>("podcast");
  const [appliedPrompt, setAppliedPrompt] = useState<string>("");

  const handleApplyPromptFromHandbook = (format: MaterialType, basePrompt: string) => {
    setAppliedFormat(format);
    setAppliedPrompt(basePrompt);
    setActiveTab("studio"); // Navigate automatically to studio
  };

  const handleClearAppliedPrompt = () => {
    setAppliedFormat("podcast");
    setAppliedPrompt("");
  };

  return (
    <div id="app-container" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* PROFESSIONAL UPPER BAR: HACTECH LMS BRAND BANNER */}
      <header id="hactech-header" className="bg-white border-b border-slate-200 shadow-xs relative overflow-hidden">
        {/* Subtle glowing color mesh */}
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-l from-red-500/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-80 h-40 bg-gradient-to-r from-blue-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          
          {/* Logo & School text branding */}
          <div className="flex items-center space-x-3.5">
            <div className="bg-gradient-to-br from-red-650 to-red-750 p-2.5 rounded-xl text-white shadow-md shadow-red-200">
              <School className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-red-50 text-red-600 border border-red-200/60 font-mono text-[9px] uppercase px-2 py-0.5 rounded font-black tracking-wider">
                  HACTECH SYNC
                </span>
                <span className="text-slate-400 text-xs font-mono">• lms platform</span>
              </div>
              <h1 className="font-sans font-bold text-slate-900 text-lg lg:text-xl tracking-tight mt-0.5">
                BỘ TẠO HỌC LIỆU NOTEBOOKLM 2026
              </h1>
              <p className="text-slate-500 text-xs mt-0.5 font-medium">
                Trường Cao đẳng Nghề Bách khoa Hà Nội — Hanoi Vocational College of Technology
              </p>
            </div>
          </div>

          {/* Quick info badges */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-slate-100/80 border border-slate-200/60 p-2 rounded-lg">
              <Award className="w-4 h-4 text-red-600" />
              <div className="text-[10px] font-mono text-slate-700">
                <span className="block text-slate-700 font-semibold font-sans leading-none">Chất lượng cao</span>
                <span className="leading-none mt-1 block font-medium">Xưởng Thực Hành K15 / K16</span>
              </div>
            </div>

            <a
              href="https://keypremiumshop.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all shadow-md shadow-red-100 hover:shadow-lg"
            >
              <span>Tài khoản Bản quyền</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* CORE ROUTING NAVIGATION CONTAINER */}
      <main id="app-main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col space-y-8">
        
        {/* TABS SELECTOR PANEL */}
        <div id="tabs-group" className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          
          <div className="flex items-center bg-white border border-slate-200/80 rounded-xl p-1 gap-1 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab("handbook")}
              className={`flex items-center space-x-2 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "handbook"
                  ? "bg-red-600 text-white font-bold shadow-sm shadow-red-200"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <BookOpenCheck className="w-4 h-4" />
              <span>Cẩm nang Thực chiến</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("studio")}
              className={`flex items-center space-x-2 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "studio"
                  ? "bg-red-600 text-white font-bold shadow-sm shadow-red-200"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>NotebookLM Studio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("workflow")}
              className={`flex items-center space-x-2 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "workflow"
                  ? "bg-red-600 text-white font-bold shadow-sm shadow-red-200"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Workflow className="w-4 h-4" />
              <span>Quy trình Phối hợp (Dây chuyền)</span>
            </button>
          </div>

          <div id="quick-tip-banner" className="hidden lg:flex items-center space-x-2 text-[10px] text-slate-500 font-mono italic">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Mẹo: Lược bỏ tài liệu trùng lặp để đầu ra chuẩn xác nhất</span>
          </div>

        </div>

        {/* ACTIVE MODULE CONTAINER PORT */}
        <section id="active-tab-viewport" className="flex-1">
          {activeTab === "handbook" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GuidebookViewer onApplyPrompt={handleApplyPromptFromHandbook} />
            </motion.div>
          )}

          {activeTab === "studio" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MaterialStudio 
                initialFormat={appliedFormat} 
                initialPrompt={appliedPrompt}
                onClearInitial={handleClearAppliedPrompt} 
              />
            </motion.div>
          )}

          {activeTab === "workflow" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WorkflowStudio />
            </motion.div>
          )}
        </section>

      </main>

      {/* DETAILED EDUCATIONAL FOOTMENT */}
      <footer id="hactech-footer" className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 mt-16 text-center text-xs space-y-4">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-left pb-8 border-b border-slate-800">
          
          <div className="space-y-2">
            <h5 className="text-white text-xs font-mono uppercase tracking-wider font-bold">HACTECH CENTER</h5>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Hệ thống LMS của Trường Cao đẳng Nghề Bách khoa Hà Nội tích cực số hóa tối ưu học liệu nghề chất lượng cao, đồng hành cùng sự đột phá tay nghề sinh viên Việt Nam bước vào kỷ nguyên số công nghệ 2026.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="text-white text-xs font-mono uppercase tracking-wider font-bold">CỘNG ĐỒNG NOTEBOOKLM</h5>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Tự hào đồng hành bởi Cộng đồng NotebookLM Việt Nam — Đơn vị tài trợ và phân phối tài liệu huấn luyện thực chiến chất lượng mẫu dành cho giảng viên bách khoa.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="text-white text-xs font-mono uppercase tracking-wider font-bold">LIÊN HỆ & BẢN QUYỀN HỖ TRỢ</h5>
            <div className="text-[11px] text-slate-350 space-y-1">
              <p className="flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-red-400" />
                <a href="https://keypremiumshop.com" target="_blank" referrerPolicy="no-referrer" className="hover:text-red-400 hover:underline">keypremiumshop.com</a>
              </p>
              <p className="flex items-center space-x-1">
                <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                <span>Zalo Tư vấn: 0977 424 524</span>
              </p>
            </div>
          </div>
          
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[10px] uppercase font-mono">
          <span>Trường Cao đẳng Nghề Bách khoa Hà Nội — BẢN QUYỀN © 2026</span>
          <span>Phát triển trên nền tảng Gemini AI & Modern Full-Stack engine</span>
        </div>
      </footer>
      
    </div>
  );
}
