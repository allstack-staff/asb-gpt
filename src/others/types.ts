export type ConfigGPT = {
  history?: boolean | undefined;
  model?: string | undefined;
  max_tokens?: number | undefined;
  apikey: string | undefined;
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
  role: string,
  content: string,
}[];
//export type historyMessages =  [] | [{ role: string, content: string }]

export interface ChatCompletion {
  warning?: string;
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface Choice {
  index: number;
  text?: string;
  message: {
    role: string;
    content: string;
  };
  logprobs: any;
  finish_reason: string;
}

export interface ChatMessage {
  role: string;
  content: string;
}

export interface ChatConfig {
  model: string;
  prompt?: string
  messages?: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export interface TranscriptionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  status: string;
  transcription_text: string;
}

export interface RequestHeaders {
  Authorization: string;
  "Content-Type": string;
  [key: string]: string; // Para incluir outras possíveis propriedades de cabeçalho
}