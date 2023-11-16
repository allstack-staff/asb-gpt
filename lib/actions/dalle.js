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
exports.DALLE = void 0;
const asb_openai_1 = __importDefault(require("../asb-openai"));
const DalleErrorRequest_1 = require("../exceptions/DalleErrorRequest");
class DALLE extends asb_openai_1.default {
    constructor(apikey) {
        super(apikey);
        this.apikey;
    }
    createDefaultImage(path, prompt, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (prompt === undefined)
                throw new Error("prompt is undefined");
            const params = {
                model: "dall-e-3",
                prompt,
                n: 1,
                size: "1024x1024"
            };
            try {
                const image = yield this.imageRequest(params);
                this.drawPicture(image.data.data[0].url, path, name);
            }
            catch (error) {
                throw new DalleErrorRequest_1.DalleErrorRequestImage(`ErroError when drawing image in standard way \n ${__dirname} \n\n ${error}`);
            }
        });
    }
    createImage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.imageRequest(params);
            }
            catch (error) {
                throw new DalleErrorRequest_1.DalleErrorRequestImage(`Error when requesting images for DALL-E 3. Check your internet connection, API key and function parameters \n ${__dirname} \n\n ${error}`);
            }
        });
    }
}
exports.DALLE = DALLE;
