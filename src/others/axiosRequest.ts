import axios from "axios";

export default class Axios {
  apiKey: string;
  protected async axiosRequest(method: string, url: string, data: {}) {
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
}
