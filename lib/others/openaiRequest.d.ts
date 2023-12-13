import { AxiosResponse } from "axios";
import { DalleCompletion, DalleErrorRequest, DalleResponse, RequestHeaders } from "../asb-openai";
export default class openaiRequest {
    apiKey: string | undefined;
    constructor(apiKey: string | undefined);
    protected drawPicture(url: string, path: string, name?: string | undefined): Promise<void>;
    protected chatRequest(method: string, url: string, data: {}): Promise<AxiosResponse>;
    protected imageRequest(data: DalleCompletion): Promise<AxiosResponse<DalleResponse, DalleErrorRequest>>;
    protected audioRequest(method: string, url: string, { headers }: {
        headers: RequestHeaders;
    }): Promise<AxiosResponse>;
}
//# sourceMappingURL=openaiRequest.d.ts.map