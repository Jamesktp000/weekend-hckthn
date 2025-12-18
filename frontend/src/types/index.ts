export interface Document {
  id: string;
  title: string;
  preview: string;
  lastUpdated: string;
}

export interface Subtopic {
  id: string;
  name: string;
  documents: Document[];
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  subtopics: Subtopic[];
}
