import fs from 'fs';
import { Message, MessageLog } from '../asb-gpt';
export class LOG {
    getTimeStamp(): string {
        const now = new Date();
        const date = now.toISOString().split('T')[0].replace(/-/g, '');
        const time = now.toTimeString().split(' ')[0].replace(/:/g, '');
        return `${date}_${time}`;
    }

    async SaveMessageToJSON(
        senderId: string,
        message: Message | string,
        response?: Record<string, any>, // Usar 'Record<string, any>' para aceitar campos dinâmicos.
        name: string = 'gpt.json'
    ): Promise<void> {
        if (!name.endsWith(".json")) {
            throw new Error(`Incorrect name format. Use ${name}.json or leave it empty to assign the default value,`)
        }

        const history = fs.readFileSync(name, 'utf-8');
        const historyJSON: { [key: string]: MessageLog } = JSON.parse(history);

        const logEntry: MessageLog = {
            senderId,
            message,
            response: response ? response : undefined,
        };

        const timestamp = this.getTimeStamp();
        historyJSON[timestamp] = logEntry;

        fs.writeFileSync('gpt.json', JSON.stringify(historyJSON, null, 2));
    }


}
