import Axios, { IMAGE_URL } from "../asb-gpt";

export class DALLE extends Axios {
  apikey: string | undefined;
  constructor(apikey: string | undefined) {
    super(apikey);
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
    return await this.chatRequest(
      "POST",
      IMAGE_URL,
      { prompt, n, size, response_format, user }
    );
  }
}
