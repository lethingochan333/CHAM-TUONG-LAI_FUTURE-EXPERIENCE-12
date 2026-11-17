export interface CareerSubmission {
  id: string;
  studentName: string;
  className: string;
  interest: string;
  strength: string;
  score: number;
  choice: string;
  createdAt: string;
  synced: boolean;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  mode?: 'online' | 'offline';
}