import { AxiosResponse } from "axios";
import openaiRequest, { ChatConfig, ConfigGPT, ChatCompletion, historyMessages, Message } from "../asb-gpt";
export declare class GPT extends openaiRequest {
    private messages;
    apikey: string | undefined;
    history?: boolean | undefined;
    model?: string | undefined;
    max_tokens?: number | undefined;
    historyLength: number;
    defaultContentMessage: Message;
    defaultConfig: ChatConfig;
    constructor({ apikey, history, model, max_tokens, }: ConfigGPT);
    setHistory({ role, content }: Message, historyLength?: number | undefined): void;
    getHistory(): historyMessages | string[];
    clearHistory(): void;
    defaultRequestChat(body: string): Promise<{
        role: string;
        content: string;
    }>;
    requestChat(config: ChatConfig): Promise<AxiosResponse<ChatCompletion>>;
}
//# sourceMappingURL=gpt.d.ts.map