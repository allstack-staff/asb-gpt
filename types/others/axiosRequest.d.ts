import { AxiosResponse } from "axios";
import { RequestHeaders } from "../asb-gpt";
export default class openaiRequest {
    apiKey: string | undefined;
    constructor(apiKey: string | undefined);
    protected chatRequest(method: string, url: string, data: {}): Promise<AxiosResponse>;
    protected audioRequest(method: string, url: string, { headers }: {
        headers: RequestHeaders;
    }): Promise<AxiosResponse>;
}
//# sourceMappingURL=axiosRequest.d.ts.map