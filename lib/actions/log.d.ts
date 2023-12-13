export declare class LOG {
    getTimeStamp(): string;
    saveMessagesToJSON(path: string, messages: Array<{
        role: string;
        content: string;
    }>): Promise<void>;
}
//# sourceMappingURL=log.d.ts.map