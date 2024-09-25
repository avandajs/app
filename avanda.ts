#! /usr/bin/env ts-node
import Avanda from "./core/cli"
import Models from "./app/models/.boot"
import Seeders from "./app/seeders/.boot"

import Commands from "./app/commands/.boot"
import {Connection} from "./core/app"
import Config from "./configs/database"
import { Query,Event } from "./core/http";
import { Model } from "./core/orm"

Event.setRemoteEventServiceUrl('http://192.168.18.5:3000/')
Model.setConnection(Connection(Config))

async function boot() {
    return Avanda(
        Commands,
        Models,
        Seeders,
        // @ts-ignore
        await Connection(Config)
    )
}

boot();


