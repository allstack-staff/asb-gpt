import Axios from "../asb-gpt";

export class DALLE extends Axios {
  apikey: string;
  constructor(apikey: string) {
    super();
    this.apikey;
  }

  async createImage(
    prompt: string,
    n = 2,
    size = "1024x1024",
    response_format = "url",
    user: string | undefined = undefined
  ) {
    if (prompt === undefined) throw new Error("prompt is undefined");
    return await this.axiosRequest(
      "POST",
      "https://api.openai.com/v1/images/generations",
      { prompt, n, size, response_format, user }
    );
  }
}
