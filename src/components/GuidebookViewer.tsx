import React, { useState } from "react";
import { HANDBOOK_TOPICS } from "../data";
import { HandbookTopic, MaterialType } from "../types";
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Tv, 
  Mic, 
  Layers, 
  Table, 
  Compass, 
  CheckSquare, 
  ChevronRight,
  BookOpenCheck,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GuidebookViewerProps {
  onApplyPrompt: (format: MaterialType, basePrompt: string) => void;
}

export default function GuidebookViewer({ onApplyPrompt }: GuidebookViewerProps) {
  const [searchTerm, setSearchString] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");
  const [selectedTopic, setSelectedTopic] = useState<HandbookTopic | null>(HANDBOOK_TOPICS[0]);

  const categories = ["Tất cả", "Nền tảng", "Studio", "Sư phạm"];

  const filteredTopics = HANDBOOK_TOPICS.filter((topic) => {
    const matchesSearch = 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.fullContent.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory === "Tất cả") return matchesSearch;
    if (activeCategory === "Sư phạm") return matchesSearch && topic.badge === "Sư phạm";
    return matchesSearch && topic.category === activeCategory;
  });

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass": return <Compass className="w-5 h-5" />;
      case "CheckSquare": return <CheckSquare className="w-5 h-5" />;
      case "Mic": return <Mic className="w-5 h-5" />;
      case "Tv": return <Tv className="w-5 h-5" />;
      case "FileText": return <FileText className="w-5 h-5" />;
      case "Layers": return <Layers className="w-5 h-5" />;
      case "Table": return <Table className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getFormatFromChapter = (chapterNum: number): MaterialType => {
    if (chapterNum === 4) return "podcast";
    if (chapterNum === 5) return "slides";
    if (chapterNum === 8) return "handout";
    if (chapterNum === 9) return "flashcards";
    if (chapterNum === 11) return "compare_table";
    return "infographic";
  };

  return (
    <div id="guidebook-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left panel: Catalog and chapters list */}
      <div id="guidebook-catalog-panel" className="lg:col-span-5 flex flex-col space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center space-x-2 text-red-600 mb-2">
            <BookOpenCheck className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">Cẩm nang Số</span>
          </div>
          <h3 className="font-sans font-bold tracking-tight text-slate-900 text-lg">
            Cẩm nang Thực chiến NotebookLM
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            Ứng dụng công nghệ AI mới nhất năm 2026 vào đồng bộ bài giảng giảng dạy lý thuyết và thực hành nghề cho sinh viên HACTECH.
          </p>
 
          <div className="mt-4 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm quy trình, mẹo hay, chủ đề..."
              value={searchTerm}
              onChange={(e) => setSearchString(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors"
            />
          </div>
 
          {/* Categories Tab */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? "bg-red-600 text-white font-semibold shadow-xs shadow-red-100"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
 
         {/* Chapters list */}
        <div id="chapters-list-container" className="flex flex-col space-y-2 max-h-[480px] overflow-y-auto pr-2">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => {
              const selected = selectedTopic?.chapterNumber === topic.chapterNumber;
              return (
                <div
                  key={topic.chapterNumber}
                  id={`chapter-card-${topic.chapterNumber}`}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-3.5 border rounded-xl cursor-pointer transition-all ${
                    selected
                      ? "bg-white border-red-500 shadow-sm ring-1 ring-red-500/15"
                      : "bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selected
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {getTopicIcon(topic.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[10px] text-red-600 font-medium">
                          Chương {topic.chapterNumber} • {topic.category}
                        </span>
                        {topic.badge && (
                          <span className="bg-blue-50 text-blue-600 border border-blue-100 font-mono text-[9px] px-1.5 py-0.5 rounded font-medium">
                            {topic.badge}
                          </span>
                        )}
                      </div>
                      <h4 className={`font-sans font-semibold text-sm mt-1 truncate ${
                        selected ? "text-red-700" : "text-slate-800"
                      }`}>
                        {topic.title}
                      </h4>
                      <p className="text-slate-400 text-xs mt-1 line-clamp-1">
                        {topic.description}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 self-center mt-2 flex-shrink-0 transition-transform ${
                      selected ? "text-red-500 translate-x-0.5" : "text-slate-400"
                    }`} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-slate-200 shadow-xs">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">Không tìm thấy chương nào khớp với kết quả.</p>
              <button 
                type="button" 
                onClick={() => { setSearchString(""); setActiveCategory("Tất cả"); }} 
                className="mt-2 text-xs text-red-600 font-medium hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>
 
      {/* Right panel: Standard content reader */}
      <div id="guidebook-content-panel" className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {selectedTopic && (
            <motion.div
              key={selectedTopic.chapterNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-full min-h-[500px]"
            >
              {/* Header inside reader */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-2 text-red-600 mb-1">
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold">Chương {selectedTopic.chapterNumber}</span>
                  <span className="text-slate-300">•</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-600 font-medium">{selectedTopic.category}</span>
                </div>
                <h2 className="font-sans font-bold tracking-tight text-slate-900 text-xl lg:text-2xl mt-1">
                  {selectedTopic.title}
                </h2>
                <p className="text-slate-500 text-xs mt-2 italic font-sans">
                  " {selectedTopic.description} "
                </p>
              </div>
 
              {/* Reader detailed body */}
              <div className="flex-1 mt-5 text-slate-700 text-sm leading-relaxed overflow-y-auto max-h-[520px] scrollbar-thin pr-1">
                {/* Full Handbook Content (Format standard markdown tags) */}
                <div className="prose prose-slate max-w-none text-xs lg:text-sm space-y-4">
                  {selectedTopic.fullContent.split("\n\n").map((para, i) => {
                    if (para.startsWith("###")) {
                      return <h4 key={i} className="text-red-700 font-sans font-bold text-base mt-5 mb-1 flex items-center gap-1.5"><span className="w-1.5 h-3.5 bg-red-600 rounded"></span>{para.replace("###", "").trim()}</h4>;
                    }
                    if (para.startsWith("-") || para.startsWith("*")) {
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-1.5 text-slate-650 mt-1">
                          {para.split("\n").map((li, liIdx) => (
                            <li key={liIdx}>{li.replace(/^[-\*\s]+/, "").trim()}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.includes("`") || para.includes(" -> ")) {
                      return (
                        <div key={i} className="bg-slate-50 px-3.5 py-2.5 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 whitespace-pre-line my-3">
                          {para}
                        </div>
                      );
                    }
                    return <p key={i} className="text-slate-650 whitespace-pre-line">{para}</p>;
                  })}
                </div>
 
                {/* Best practices component block */}
                <div className="mt-6 bg-green-50/60 border border-green-200/80 rounded-xl p-4">
                  <h5 className="font-mono text-xs uppercase tracking-wide text-green-700 font-bold flex items-center space-x-1.5 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Mẹo thực chiến & Nguyên lý tối ưu</span>
                  </h5>
                  <ul className="text-xs text-slate-600 space-y-2">
                    {selectedTopic.bestPractices.map((bp, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
 
                {/* Prompt Template module */}
                {selectedTopic.promptTemplate && (
                  <div className="mt-5 bg-red-50/50 border border-red-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <h5 className="font-mono text-xs uppercase tracking-wide text-red-700 font-bold flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-red-500" />
                        <span>Prompt mẫu của cẩm nang</span>
                      </h5>
                    </div>
                    <p className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-800 border border-slate-200 whitespace-pre-line">
                      {selectedTopic.promptTemplate}
                    </p>
                  </div>
                )}
              </div>
 
              {/* Action buttons footer */}
              {selectedTopic.category === "Studio" && selectedTopic.promptTemplate ? (
                <div className="border-t border-slate-200 pt-4 mt-4 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      const format = getTopicIcon(selectedTopic.icon) ? getFormatFromChapter(selectedTopic.chapterNumber) : "handout";
                      onApplyPrompt(format, selectedTopic.promptTemplate || "");
                    }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-750 hover:from-red-650 hover:to-red-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md shadow-red-100 transition-all cursor-pointer"
                  >
                    <span>Áp dụng Prompt cho Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-t border-slate-200 pt-3 mt-4 text-center">
                  <span className="text-slate-400 text-[10px] font-mono">Bản quyền biên soạn 2026 Admin Cộng đồng NotebookLM Việt Nam ©</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
