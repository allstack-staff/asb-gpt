import { AxiosResponse } from "axios";
import openaiRequest, { DalleCompletion, DalleErrorRequest, DalleResponse, IMAGE_URL } from "../asb-openai";
import { DalleErrorRequestImage } from "../exceptions/DalleErrorRequest";

export class DALLE extends openaiRequest {
  apikey: string | undefined;
  constructor(apikey: string | undefined) {
    super(apikey);
    this.apikey;
  }

  public async createDefaultImage(path: string, prompt: string, name?: string) {
    if (prompt === undefined) throw new Error("prompt is undefined");

    const params: DalleCompletion = {
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024"
    }

    try {
      const image = await this.imageRequest(params)
      this.drawPicture(image.data.data[0].url, path, name)
    } catch (error) {
      throw new DalleErrorRequestImage(`ErroError when drawing image in standard way \n ${__dirname} \n\n ${error}`)

    }

  }

  public async createImage(params: DalleCompletion): Promise<AxiosResponse<DalleResponse, DalleErrorRequest>> {
    try {
      return await this.imageRequest(params)
    } catch (error) {
      throw new DalleErrorRequestImage(`Error when requesting images for DALL-E 3. Check your internet connection, API key and function parameters \n ${__dirname} \n\n ${error}`)
    }

  }
}
