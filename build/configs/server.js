import { Connection } from "@avanda/app";
import Config from "./database";
const config = {
    connection: Connection(Config),
    port: 8000,
    rootPath: '/',
    CORSWhitelist: ['http://localhost:3000']
};
export default config;
