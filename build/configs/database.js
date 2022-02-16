import { Env } from "@avanda/app";
const config = {
    dbDialect: 'mysql',
    dbName: Env.get('DB_NAME', 'test'),
    dbPassword: Env.get('DB_PASSWORD', ''),
    dbUser: Env.get('DB_USER', 'root')
};
console.log({ config });
export default config;
