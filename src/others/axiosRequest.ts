import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import { RequestHeaders } from "../asb-gpt";

export default class openaiRequest {
  apiKey: string | undefined;
  constructor(apiKey: string | undefined) {
    this.apiKey = apiKey;
  }
  protected async chatRequest(method: string, url: string, data: {}): Promise<AxiosResponse> {
    const options = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      data,
    };

    return await axios.request(options);
  }

  protected async audioRequest(method: string, url: string, { headers }: {headers: RequestHeaders}): Promise<AxiosResponse>{
    const formData = new FormData();

    const options = {
      method,
      url,
      headers,
    };
    const response = await axios.request(options);
    return response.data;
  }
}
