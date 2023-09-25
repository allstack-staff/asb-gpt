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
    SaveMessageToJSON(senderId, message, response, name = 'gpt.json') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name.endsWith(".json")) {
                throw new Error(`Incorrect name format. Use ${name}.json or leave it empty to assign the default value,`);
            }
            const history = fs_1.default.readFileSync(name, 'utf-8');
            const historyJSON = JSON.parse(history);
            const logEntry = {
                senderId,
                message,
                response: response ? response : undefined,
            };
            const timestamp = this.getTimeStamp();
            historyJSON[timestamp] = logEntry;
            fs_1.default.writeFileSync('gpt.json', JSON.stringify(historyJSON, null, 2));
        });
    }
}
exports.LOG = LOG;
