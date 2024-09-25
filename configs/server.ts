import {serverConfig} from "../core/app";
import {Env} from "../core/app"

const config: serverConfig =  {
    port: Env.get('PORT'),
    rootPath: '/',
    CORSWhitelist: ['http://localhost:3000','http://localhost:9988']
}

export default config
