import openaiRequest from "../asb-gpt";
export declare class DALLE extends openaiRequest {
    apikey: string | undefined;
    constructor(apikey: string | undefined);
    createImage(prompt: string, n?: number, size?: string, response_format?: string, user?: string | undefined): Promise<import("axios").AxiosResponse<any, any>>;
}
//# sourceMappingURL=dalle.d.ts.map