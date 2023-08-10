import fs from 'fs';
import mysql from 'mysql2/promise';
import { MongoClient, Db, Collection, MongoClientOptions } from 'mongodb';
import { ApiResponse, Message, MessageData, MessageLog, MongoDBConfig, MySQLConfig } from '../asb-gpt';
export default class LOG {
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


    async SaveMessageToMySQL(
        mysqlConfig: MySQLConfig,
        senderId: string,
        message: string,
        response?: Record<string, any>,
    ): Promise<void | ApiResponse> {
        try {
            const connection = await mysql.createConnection(mysqlConfig);
            await connection.ping();

            // Verificar se o banco de dados e a tabela existem
            const databaseExists = await this.checkDatabaseExists(connection, mysqlConfig.database);
            const tableExists = await this.checkTableExists(connection, 'chat_history');

            if (!databaseExists || !tableExists) {
                throw new Error('Banco de dados ou tabela não existem.');
            }

            const insertQuery = `INSERT INTO chat_history (sender_id, message, response) VALUES (?, ?, ?)`;
            const insertData = [senderId, message, response];

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
        mongoDBConfig: MongoDBConfig,
        senderId: string,
        message: string,
        response?: MessageData // Movido para a posição final dos parâmetros
    ): Promise<void | ApiResponse> {
        try {
            const client = await MongoClient.connect(mongoDBConfig.url, mongoDBConfig as MongoClientOptions);
            const db: Db = client.db(mongoDBConfig.databaseName);
            const collection: Collection = db.collection(mongoDBConfig.collectionName);

            const logEntry: MessageData = {
                senderId,
                message,
                ...response, // Adicionar campos personalizados ao logEntry.
            };

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
        const databases = rows as { Database: string }[];
        return databases.some((row) => row.Database === databaseName);
    }

    private async checkTableExists(connection: mysql.Connection, tableName: string): Promise<boolean> {
        const [rows] = await connection.execute('SHOW TABLES');
        const tables = rows as { [key: string]: string }[];
        return tables.some((row) => Object.values(row)[0] === tableName);
    }



}
