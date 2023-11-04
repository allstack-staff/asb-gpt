import fs from 'fs';

export class LOG {
    getTimeStamp(): string {
        const now = new Date();
        const date = now.toISOString().split('T')[0].replace(/-/g, '');
        const time = now.toTimeString().split(' ')[0].replace(/:/g, '');
        return `${date}_${time}`;
    }

    public async saveMessagesToJSON(path: string, messages: Array<{ role: string; content: string }>): Promise<void> {
        try {
            let historyArray: Array<{ role: string; content: string }> = [];

            if (fs.existsSync(path)) {
                const history = fs.readFileSync(path, "utf-8");
                historyArray = JSON.parse(history);
            }

            historyArray = historyArray.concat(messages);

            fs.writeFileSync(path, JSON.stringify(historyArray, null, 2));
        } catch (error) {
            throw new Error(`Erro ao salvar no arquivo JSON: ${error}`);
        }
    }


}
