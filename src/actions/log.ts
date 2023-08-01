import fs from 'fs';
import mysql from 'mysql2/promise';
import { ChatCompletionRequestMessage } from 'openai';
import { MongoClient, Db, Collection, MongoClientOptions } from 'mongodb';

interface Response {
    role: string;
    content: string;
}

export interface MessageLog {
    senderId: string;
    message: string;
    response?: Record<string, any>; // Usar 'Record<string, any>' para aceitar campos dinâmicos.
}

interface MySQLConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

interface MessageData {
    [key: string]: any; // Usar objeto genérico para campos personalizados.
}

interface MongoDBConfig {
    url: string;
    databaseName: string;
    collectionName: string;
}

export class LOG {
    private getTimeStamp(): string {
        const now = new Date();
        const date = now.toISOString().split('T')[0].replace(/-/g, '');
        const time = now.toTimeString().split(' ')[0].replace(/:/g, '');
        return `${date}_${time}`;
    }

    defaultSaveMessageToJSON(
        senderId: string,
        message: string,
        response?: Record<string, any> // Usar 'Record<string, any>' para aceitar campos dinâmicos.
    ): void {
        const history = fs.readFileSync('gpt.json', 'utf-8');
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


    async SaveMessageToMySQL(
        id: string,
        message: string,
        config: MySQLConfig,
        response?: ChatCompletionRequestMessage
    ): Promise<void | { status: number; message: unknown }> {
        try {
            const connection = await mysql.createConnection(config);

            // Verificar a conexão com o banco de dados
            await connection.ping();

            // Verificar se o banco de dados e a tabela existem
            const databaseExists = await this.checkDatabaseExists(connection, config.database);
            const tableExists = await this.checkTableExists(connection, 'chat_history');

            if (!databaseExists || !tableExists) {
                throw new Error('Banco de dados ou tabela não existem.');
            }

            const insertQuery = `INSERT INTO chat_history (id, message, response) VALUES (?, ?, ?)`;
            const insertData = [
                id + '_' + this.getTimeStamp(),
                message,
                response ? JSON.stringify(response) : null,
            ];

            await connection.execute(insertQuery, insertData);

            connection.end();
        } catch (error: unknown) {
            const errorMessage = {
                status: 400,
                message: error,
            };
            return errorMessage;
        }
    }

    async SaveMessageToMongoDB(
        senderId: string,
        message: string,
        mongoDBConfig: MongoDBConfig,
        messageData?: MessageData // Movido para a posição final dos parâmetros
    ): Promise<void | { status: number; message: unknown }> {
        try {
            const client = await MongoClient.connect(mongoDBConfig.url, mongoDBConfig as MongoClientOptions);
            const db: Db = client.db(mongoDBConfig.databaseName);
            const collection: Collection = db.collection(mongoDBConfig.collectionName);

            const logEntry: MessageData = {
                senderId,
                message,
                ...messageData, // Adicionar campos personalizados ao logEntry.
            };

            const timestamp = this.getTimeStamp();
            await collection.insertOne(logEntry);

            client.close();
        } catch (error: unknown) {
            const errorMessage = {
                status: 400,
                message: error,
            };
            return errorMessage;
        }
    }


    private async checkDatabaseExists(connection: mysql.Connection, databaseName: string): Promise<boolean> {
        const [rows] = await connection.execute('SHOW DATABASES');
        const databases: { Database: string }[] = rows as { Database: string }[];
        return databases.some((row) => row.Database === databaseName);
    }

    private async checkTableExists(connection: mysql.Connection, tableName: string): Promise<boolean> {
        const [rows] = await connection.execute('SHOW TABLES');
        const tables: { [key: string]: string }[] = rows as { [key: string]: string }[];
        return tables.some((row) => Object.values(row)[0] === tableName);
    }



}
