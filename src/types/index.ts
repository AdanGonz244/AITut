export type Subject = 'general' | 'math' | 'science' | 'reading' | 'history' | 'language';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  subject: Subject;
}

export interface ChatResponse {
  response: string;
  error?: string;
}