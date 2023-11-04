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
exports.LOG = void 0;
const fs_1 = __importDefault(require("fs"));
class LOG {
    getTimeStamp() {
        const now = new Date();
        const date = now.toISOString().split('T')[0].replace(/-/g, '');
        const time = now.toTimeString().split(' ')[0].replace(/:/g, '');
        return `${date}_${time}`;
    }
    saveMessageToJSON(path, id, message, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let historyJSON = {};
                if (fs_1.default.existsSync(path)) {
                    const history = fs_1.default.readFileSync(path, "utf-8");
                    historyJSON = JSON.parse(history);
                }
                historyJSON[id] = {
                    message,
                    response: response ? response : undefined,
                };
                fs_1.default.writeFileSync(path, JSON.stringify(historyJSON, null, 2));
            }
            catch (error) {
                throw new Error(`Erro ao salvar no arquivo JSON: ${error}`);
            }
        });
    }
}
exports.LOG = LOG;
