import { Query,Event } from "../core/http";

import Models from "./models/.boot"
import Controllers from "./controllers/.boot"

import serverConfig from "../configs/server"
import dbConfig from "../configs/database"

import {Model} from "../core/orm/";
import { Connection } from "../core/app";

// Event.setRemoteEventServiceUrl('http://192.168.18.5:3000/')
// @ts-ignore
Model.setConnection(Connection(dbConfig))
// 
 // @ts-ignore
 const app = new Query(serverConfig)
 .execute(
     Models,
     Controllers,
 )

// return app.getServerInstance()
app.listen()

