export type ConfigGPT = {
    history: boolean,
    model: string,
    max_tokens: number,
    apiKey: string,
}

export type Message = {
    role: string;
    content: string;
}
export type ApiResponse = {
    status: number;
    message: unknown;
}

export interface MessageLog {
    senderId: string;
    message: Message | string;
    response?: Record<string, any>; // Usar 'Record<string, any>' para aceitar campos dinâmicos.
}

export interface MySQLConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

export interface MessageData {
    [key: string]: any; // Usar objeto genérico para campos personalizados.
}

export interface MongoDBConfig {
    url: string;
    databaseName: string;
    collectionName: string;
}

export type historyMessages = {
    role: string,
    content: string
}[]

export type Resp = {
    response: unknown,
    usage: unknown | null
}