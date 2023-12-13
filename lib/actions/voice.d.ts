import openaiRequest from "../others/openaiRequest";
import { TranscriptionResponse } from "../asb-openai";
declare class Voice extends openaiRequest {
    constructor(apiKey: string | undefined);
    transcribeAudio(audioFilePath: string, model: string): Promise<TranscriptionResponse>;
}
export default Voice;
//# sourceMappingURL=voice.d.ts.map