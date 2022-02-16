import {serverConfig} from "../core/app";
import {Connection} from "../core/app"
import Config from "./database";


const config: serverConfig =  {
    connection: Connection(Config),
    port: 8000,
    rootPath: '/',
    CORSWhitelist: ['http://localhost:3000']
}

export default config
