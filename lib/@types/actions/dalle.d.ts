import { AxiosResponse } from "axios";
import openaiRequest, { DalleCompletion, DalleErrorRequest, DalleResponse } from "../asb-gpt";
export declare class DALLE extends openaiRequest {
    apikey: string | undefined;
    constructor(apikey: string | undefined);
    createDefaultImage(path: string, prompt: string, name?: string): Promise<void>;
    createImage(params: DalleCompletion): Promise<AxiosResponse<DalleResponse, DalleErrorRequest>>;
}
//# sourceMappingURL=dalle.d.ts.map