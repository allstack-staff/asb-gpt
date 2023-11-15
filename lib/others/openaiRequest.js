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
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const form_data_1 = __importDefault(require("form-data"));
const asb_gpt_1 = require("../asb-gpt");
const fs_1 = require("fs");
class openaiRequest {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    drawPicture(url, path, name) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, axios_1.default)({
                method: 'get',
                url: url,
                responseType: 'stream',
            })
                .then((response) => {
                const imageName = name !== null && name !== void 0 ? name : (0, uuid_1.v4)();
                const imagePath = `${path}/${imageName}.jpg`;
                const writeStream = (0, fs_1.createWriteStream)(imagePath);
                response.data.pipe(writeStream);
                writeStream.on('finish', () => {
                    console.log(`Imagem salva como ${imageName}.jpg em ${path}`);
                });
                writeStream.on('error', (error) => {
                    throw new asb_gpt_1.WriteStreamError(`Erro ao criar arquivo com a imagem:\n\n${__filename}\n\n${error}`);
                });
            })
                .catch((error) => {
                throw new asb_gpt_1.WriteStreamError(`Erro ao baixar a imagem:\n\n${__filename}\n\n${error}`);
            });
        });
    }
    chatRequest(method, url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method,
                url,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                data,
            };
            return yield axios_1.default.request(options);
        });
    }
    imageRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: "POST",
                url: asb_gpt_1.IMAGE_URL,
                timeout: 40000,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                data
            };
            return yield axios_1.default.request(options);
        });
    }
    audioRequest(method, url, { headers }) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new form_data_1.default();
            const options = {
                method,
                url,
                headers,
            };
            const response = yield axios_1.default.request(options);
            return response.data;
        });
    }
}
exports.default = openaiRequest;
