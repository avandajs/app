import {dbConfig,Env} from "../core/app";
const config: dbConfig =  {
    dbDialect: 'mysql',
    dbName: Env.get<string>('DB_NAME', 'test'),
    dbPassword: Env.get<string>('DB_PASSWORD', ''),
    dbUser: Env.get<string>('DB_USER', 'root'),
    logging: () => { },
    dbHost: Env.get<string>('DB_HOST', '127.0.0.1'),
}

export default config

