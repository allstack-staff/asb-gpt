import openaiRequest from "../others/axiosRequest";
import { TranscriptionResponse } from "../asb-gpt";
declare class Voice extends openaiRequest {
    constructor(apiKey: string | undefined);
    transcribeAudio(audioFilePath: string, model: string): Promise<TranscriptionResponse>;
}
export default Voice;
//# sourceMappingURL=voice.d.ts.map