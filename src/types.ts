
export interface BusinessProfile {
  name: string;
  industry: string;
  stage: 'Idea' | 'Startup' | 'Scaling' | 'Established';
  targetAudience: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}
