
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

export type ToolCategory = 'strategy' | 'marketing' | 'sales' | 'ops' | 'copilot';

export interface StrategyResult {
  title: string;
  content: string;
  type: string;
}
