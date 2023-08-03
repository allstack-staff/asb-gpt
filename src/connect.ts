import { LOG, MongoDBConfig, MySQLConfig } from './actions/log';
const log = new LOG();

const mysqlConfig: MySQLConfig = {
    host: 'localhost',
    user: 'myUser',
    password: '123',
    database: 'banco_De_Teste',
};

const mongoDBConfig: MongoDBConfig = {
    url: 'mongodb://teste.com',
    databaseName: 'banco_De_Teste',
    collectionName: 'chat_history',
};

log.SaveMessageToJSON('Teste1', {role: 'user', content: 'Olá'}, {}, );
log.SaveMessageToMySQL(mysqlConfig, 'ID_1', 'Olá, MySQL', { response: 'olá igor' });
log.SaveMessageToMongoDB(mongoDBConfig, 'ID_1', 'Olá, MongoDB!', { response: 'olá igor' });

