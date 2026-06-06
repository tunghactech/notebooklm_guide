export interface HandbookTopic {
  title: string;
  icon: string;
  category: "Nền tảng" | "Studio" | "Nâng cao" | "Lưu ý";
  chapterNumber: number;
  badge?: string;
  description: string;
  fullContent: string;
  promptTemplate?: string;
  bestPractices: string[];
}

export type MaterialType = 'podcast' | 'slides' | 'handout' | 'flashcards' | 'compare_table' | 'infographic';

export interface SubjectContext {
  subjectName: string;
  department: string;
  lessonTitle: string;
  studentTarget: string;
  learningObjectives: string;
  lectureContent: string;
  customInstructions?: string;
}

export interface GeneratedMaterial {
  id: string;
  type: MaterialType;
  title: string;
  subjectName: string;
  lessonTitle: string;
  content: string; // Markdown formatted
  createdAt: string;
}

export interface SubjectDepartment {
  name: string;
  subjects: string[];
}

export interface SubjectHistoryItem {
  id: string;
  subjectName: string;
  department: string;
  lessonTitle: string;
  createdAt: string;
  materials: {
    type: MaterialType;
    content: string;
  }[];
}
