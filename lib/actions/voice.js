"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openaiRequest_1 = __importDefault(require("../others/openaiRequest"));
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
const asb_openai_1 = require("../asb-openai");
class Voice extends openaiRequest_1.default {
    constructor(apiKey) {
        super(apiKey);
        this.apiKey;
    }
    transcribeAudio(audioFilePath, model) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new form_data_1.default();
            formData.append("file", fs_1.default.createReadStream(audioFilePath));
            formData.append("model", model);
            const headers = Object.assign({ Authorization: `Bearer ${this.apiKey}`, "Content-Type": "multipart/form-data" }, formData.getHeaders());
            try {
                const response = yield this.audioRequest("POST", asb_openai_1.AUDIO_URL, { headers });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Voice;
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
