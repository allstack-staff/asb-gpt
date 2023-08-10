import Axios, { ConfigGPT, Resp, historyMessages } from "../asb-gpt";
export class GPT extends Axios {
  private messages: historyMessages;
  apiKey: string;
  history: boolean;
  model: string;
  max_tokens: number;
  length: number;
  defaultContentMessage: { role: string; content: string };

  constructor({
    apiKey,
    history = true,
    model = "gpt-3.5-turbo",
    max_tokens = 500,
  }: ConfigGPT) {
    super();
    this.apiKey = apiKey;
    this.history = history;
    this.model = model;
    this.max_tokens = max_tokens;
    this.length = 20;
    this.defaultContentMessage = {
      role: "system",
      content: "You are a helpful assistant.",
    };
    this.messages = [];
  }

  public setHistory({ role, content }, length: number) {
    if (role === undefined || content === undefined)
      throw new Error("role or content is undefined");
    this.messages.push({ role, content });
    this.length = length === undefined ? this.length : length;
  }

  public async requestChat(body: string): Promise<{ data: Resp }> {
    if (body === undefined) throw new Error("body is undefined");

    const content = body.trim();

    if (this.history) this.messages.push({ role: "user", content });

    try {
      const res = await this.axiosRequest(
        "POST",
        "https://api.openai.com/v1/chat/completions",
        {
          model: this.model,
          messages: this.history
            ? this.messages
            : () => {
                this.messages = [];
                this.messages.push(this.defaultContentMessage);
              },
          max_tokens: this.max_tokens,
        }
      );

      if (res.status === 200) {
        if (this.messages.length >= this.length)
          this.messages.splice(1, this.length - 5);

        this.messages.push({
          role: "user",
          content: res.data.choices[0].message as string,
        });
      }

      return res;
    } catch (err) {
      console.error(err);
      throw new Error(`Erro ao executar a solicitação: ${err}`);
    }
  }
}
