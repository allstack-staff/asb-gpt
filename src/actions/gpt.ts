import axios from "axios";
import { ConfigGPT, Resp, historyMessages } from "../asb-gpt";

export class GPT {

    private messages: historyMessages;

    private models = ['text-davinci-0011', "davinci", 'text-search-curie-query-001', "gpt-3.5-turbo"];

    apiKey: string;;
    history: boolean;
    model: string;;
    max_tokens: number;;

    constructor({ apiKey, history = true, model = "gpt-3.5-turbo", max_tokens = 500 }: ConfigGPT) {

        this.apiKey = apiKey
        this.history = history
        this.model = model
        this.max_tokens = max_tokens

        this.messages = [
            {
                role: "system",
                content: "You are a helpful assistant who never responds to anything related to violence or sexual content. Keep the answers as short as possible."
            }
        ];

    }

    public async requestChat(body: string): Promise<{ data: Resp }> {
        if (body === undefined) throw new Error("body is undefined")

        const content = body.trim();

        if (this.history) this.messages.push({ role: "user", content });

        try {
            const options = {
                method: 'POST',
                url: 'https://api.openai.com/v1/chat/completions',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.apiKey}`
                },
                data: {
                    model: this.model,
                    messages: this.history ? this.messages : [],
                    max_tokens: this.max_tokens,
                }
            };

            const res = await axios.request(options);

            const resp: Resp = {
                response: res.data.choices[0].message || res.data.error,
                usage: res.data.usage || null,
            };

            if (resp.response) {
                if (this.messages.length >= 20) this.messages.splice(1, 20);

                this.messages.push({
                    role: "user",
                    content: resp.response as string
                });
            }

            return { data: resp };
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao executar a solicitação do OpenAI");
        }
    }


}