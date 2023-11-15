import axios, { AxiosResponse } from "axios";
import { v4 as uuidv4 } from 'uuid';
import FormData from "form-data";
import { DalleCompletion, DalleErrorRequest, DalleResponse, IMAGE_URL, RequestHeaders, WriteStreamError } from "../asb-gpt";
import { createWriteStream } from "fs";

export default class openaiRequest {
  apiKey: string | undefined;
  constructor(apiKey: string | undefined) {
    this.apiKey = apiKey;
  }

  protected async drawPicture(url: string, path: string, name?: string | undefined) {
    axios({
      method: 'get',
      url: url,
      responseType: 'stream',
    })
      .then((response) => {
        const imageName = name ?? uuidv4();
        const imagePath = `${path}/${imageName}.jpg`;
        const writeStream = createWriteStream(imagePath);
        response.data.pipe(writeStream);

        writeStream.on('finish', () => {
          console.log(`Imagem salva como ${imageName}.jpg em ${path}`);
        });

        writeStream.on('error', (error) => {
          throw new WriteStreamError(`Erro ao criar arquivo com a imagem:\n\n${__filename}\n\n${error}`);
        });
      })
      .catch((error) => {
        throw new WriteStreamError(`Erro ao baixar a imagem:\n\n${__filename}\n\n${error}`);
      });
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

  protected async imageRequest(data: DalleCompletion): Promise<AxiosResponse<DalleResponse, DalleErrorRequest>> {
    const options = {
      method: "POST",
      url: IMAGE_URL,
      timeout: 40000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      data
    }
    return await axios.request(options)

  }

  protected async audioRequest(method: string, url: string, { headers }: { headers: RequestHeaders }): Promise<AxiosResponse> {
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
