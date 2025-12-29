
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  billing: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface TechSpec {
  name: string;
  value: string;
  icon: string;
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
}
