import fs from "fs";
import { AxiosResponse } from 'axios';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, CreateChatCompletionResponse } from "openai";
import Message from "../others/isValid";

export class GPT {
    private openai: OpenAIApi;
    private messages: ChatCompletionRequestMessage[];

    constructor(apiKey: string) {
        const configuration = new Configuration({ apiKey });
        this.openai = new OpenAIApi(configuration);

        this.messages = [
            {
                role: ChatCompletionRequestMessageRoleEnum.System,
                content: "You are a helpful assistant who never responds to anything related to violence or sexual content. Keep the answers as short as possible."
            }
        ];
    }



    public async gpt(body: string, remote: string): Promise<string> {
        const content = body.trim();


        this.messages.push({ role: "user", content });

        try {
            const response = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: this.messages,
                max_tokens: 250
            }) as AxiosResponse<CreateChatCompletionResponse, any>;

            const resp = response.data.choices[0].message;

            if (resp) {
                this.messages.push({
                    role: ChatCompletionRequestMessageRoleEnum.System,
                    content: resp.content
                });
            }

            return resp?.content ?? '';

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao executar a solicitação do OpenAI");
        }
    }


}

export default GPT;
