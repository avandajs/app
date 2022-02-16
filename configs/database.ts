import {dbConfig,Env} from "../core/app";
const config: dbConfig =  {
    dbDialect: 'mysql',
    dbName: Env.get<string>('DB_NAME','test'),
    dbPassword: Env.get<string>('DB_PASSWORD',''),
    dbUser: Env.get<string>('DB_USER','root'),
}

console.log({config})

export default config
