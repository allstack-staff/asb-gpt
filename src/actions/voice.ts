import openaiRequest from "../others/openaiRequest";
import fs from "fs";
import FormData from "form-data";
import { AxiosResponse } from "axios";
import { AUDIO_URL, TranscriptionResponse } from "../asb-gpt";

class Voice extends openaiRequest {
  constructor(apiKey: string | undefined) {
    super(apiKey);
    this.apiKey;
  }

  async transcribeAudio(
    audioFilePath: string,
    model: string
  ): Promise<TranscriptionResponse> {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(audioFilePath));
    formData.append("model", model);

    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "multipart/form-data",
      ...formData.getHeaders(),
    };

    try {
      const response: AxiosResponse<TranscriptionResponse> =
        await this.audioRequest("POST", AUDIO_URL, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default Voice;

//  Uso da função
// const apiKey = "YOUR_OPENAI_API_KEY"; // Substitua pelo seu próprio chave de API
// const openAI = new OpenAI(apiKey);

// const audioFilePath = "/path/to/file/audio.mp3"; // Substitua pelo caminho do arquivo de áudio
// const model = "whisper-1";

// openAI
//   .transcribeAudio(audioFilePath, model)
//   .then((transcription) => {
//     console.log("Transcription response:", transcription);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
