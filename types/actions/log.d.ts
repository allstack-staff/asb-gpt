import { Message } from '../asb-gpt';
export declare class LOG {
    getTimeStamp(): string;
    SaveMessageToJSON(senderId: string, message: Message | string, response?: Record<string, any>, name?: string): Promise<void>;
}
//# sourceMappingURL=log.d.ts.map