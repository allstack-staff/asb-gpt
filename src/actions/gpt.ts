import { AxiosResponse } from "axios";
import Axios, {
  ChatConfig,
  ConfigGPT,
  Resp,
  CHAT_URL,
  historyMessages,
  Message,
} from "../asb-gpt";
export class GPT extends Axios {
  private messages: historyMessages;
  apikey: string | undefined;
  history?: boolean | undefined;
  model?: string | undefined;
  max_tokens?: number | undefined;
  historyLength: number;
  defaultContentMessage: Message;
  defaultConfig: ChatConfig;

  constructor({
    apikey,
    history = true,
    model = "gpt-3.5-turbo",
    max_tokens = 500,
  }: ConfigGPT) {
    super(apikey);
    this.apiKey = apikey;
    this.history = history;
    this.model = model;
    this.max_tokens = max_tokens;
    this.historyLength = 20;
    this.defaultContentMessage = {
      role: "system",
      content: "You are a helpful assistant.",
    };
    this.messages = [this.defaultContentMessage];

    this.defaultConfig = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant",
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
  }

  public setHistory(
    { role, content }: Message,
    historyLength?: number | undefined
  ): void {
    if (role === undefined || content === undefined)
      throw new Error("role or content is undefined");
    this.messages.push({ role, content });
    this.historyLength =
      historyLength === undefined ? this.historyLength : historyLength;
  }

  public getHistory(): historyMessages | string[] {
    return this.messages.map((message) => JSON.stringify(message));
  }

  public clearHistory(): void {
    this.messages.splice(0);
    this.messages = [this.defaultContentMessage];
  }

  public async defaultRequestChat(
    body: string
  ): Promise<{ role: string; content: string }> {
    if (body === undefined) throw new Error("body is undefined");

    const content = body.trim();

    if (this.history && this.historyLength > 0) this.messages.push({ role: "user", content });

    try {
      const messages = this.history
        ? this.messages
        : [this.defaultContentMessage];

      const res = await this.chatRequest("POST", CHAT_URL, {
        model: this.model,
        messages: messages,
        max_tokens: this.max_tokens,
      });

      if (res.status === 200) {
        if (this.messages.length >= this.historyLength)
          this.messages.splice(1, this.historyLength - 5);

        this.messages.push({
          role: res.data.choices[0].message.role,
          content: res.data.choices[0].message.content as string,
        });
      }

      return res.data.choices[0].message;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async requestChat(
    config: ChatConfig
  ): Promise<AxiosResponse<string, object>> {
    const mergedConfig = { ...this.defaultConfig, ...config };

    try {
      const response = await this.chatRequest("POST", CHAT_URL, mergedConfig);
      return response;
    } catch (err) {
      throw new Error("error requesting chat: \n" + err);
    }
  }
}
