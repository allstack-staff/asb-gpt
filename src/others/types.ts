export type ConfigGPT = {
  history: boolean;
  model: string;
  max_tokens: number;
  apiKey: string;
};

export type Message = {
  role: string;
  content: string;
};

export interface MessageLog {
  senderId: string;
  message: Message | string;
  response?: Record<string, any>; // Usar 'Record<string, any>' para aceitar campos dinâmicos.
}

export type historyMessages = {
  role: string;
  content: string;
}[];

export type Resp = {
  status: any;
  response: unknown;
  usage: unknown | null;
};
