import fs from 'fs';

export class LOG {
    getTimeStamp(): string {
        const now = new Date();
        const date = now.toISOString().split('T')[0].replace(/-/g, '');
        const time = now.toTimeString().split(' ')[0].replace(/:/g, '');
        return `${date}_${time}`;
    }

    public async saveMessageToJSON(path: string, id: string, message: string, response?: string): Promise<void> {
        /**
         *
         * ```ts
         * const Log = new Log;
         * log.saveMessageToJson("../json/log.json", "user01", "I'am batman", "Whats?")
         * ```
         * @param
         */

        try {
            let historyJSON: { [key: string]: { message: string; response?: string } } = {};

            if (fs.existsSync(path)) {
                const history = fs.readFileSync(path, "utf-8");
                historyJSON = JSON.parse(history);
            }

            historyJSON[id] = {
                message,
                response: response ? response : undefined,
            };

            fs.writeFileSync(path, JSON.stringify(historyJSON, null, 2));
        } catch (error) {
            throw new Error(`Erro ao salvar no arquivo JSON: ${error}`);
        }

    }


}
