"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPT = void 0;
const asb_gpt_1 = __importStar(require("../asb-gpt"));
class GPT extends asb_gpt_1.default {
    constructor({ apikey, history = true, model = "gpt-3.5-turbo", max_tokens = 500, }) {
        super(apikey);
        this.apiKey = apikey;
        this.history = history;
        this.model = model;
        this.max_tokens = max_tokens;
        this.historyLength = 20;
        this.defaultContentMessage = {
            role: "system",
            content: "You are a helpful assistant.",
        };
        this.messages = [this.defaultContentMessage];
        this.defaultConfig = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant",
                },
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };
    }
    setHistory({ role, content }, historyLength) {
        if (role === undefined || content === undefined)
            throw new Error("role or content is undefined");
        this.messages.push({ role, content });
        this.historyLength =
            historyLength === undefined ? this.historyLength : historyLength;
    }
    getHistory() {
        return this.messages.map((message) => JSON.stringify(message));
    }
    clearHistory() {
        this.messages.splice(0);
        this.messages = [this.defaultContentMessage];
    }
    defaultRequestChat(body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body === undefined)
                throw new Error("body is undefined");
            const content = body.trim();
            if (this.history && this.historyLength > 0)
                this.messages.push({ role: "user", content });
            try {
                const messages = this.history
                    ? this.messages
                    : [this.defaultContentMessage];
                const res = yield this.chatRequest("POST", asb_gpt_1.CHAT_URL, {
                    model: this.model,
                    messages: messages,
                    max_tokens: this.max_tokens,
                });
                if (res.status === 200) {
                    if (this.messages.length >= this.historyLength)
                        this.messages.splice(1, this.historyLength - 5);
                    this.messages.push({
                        role: res.data.choices[0].message.role,
                        content: res.data.choices[0].message.content,
                    });
                }
                return res.data.choices[0].message;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    requestChat(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const mergedConfig = Object.assign(Object.assign({}, this.defaultConfig), config);
            try {
                const response = yield this.chatRequest("POST", asb_gpt_1.CHAT_URL, mergedConfig);
                return response;
            }
            catch (err) {
                throw new Error("error requesting chat: \n" + err);
            }
        });
    }
}
exports.GPT = GPT;
