export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  documentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  totalChunks: number;
  status: 'PROCESSING' | 'READY' | 'FAILED';
  createdAt: string;
}

export interface SourceCitation {
  chunkId: string;
  documentName: string;
  relevanceScore: number;
  snippet: string;
  chunkIndex: number;
}

export interface QAResponse {
  answer: string;
  sources: SourceCitation[];
  conversationId: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  sources: string;
  createdAt: string;
}
