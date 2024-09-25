import {Controller, Get, Post, Request, Response, Watchable, Event} from "../../core/http";
import UserModel from "../models/User"

import {Fnc} from "../../core/orm";
import LoggedUserOnly from "../middlewares/LoggedUserOnly";
import TestEvent from "app/events/TestEvent";
import { Op } from "sequelize";
import NewMessageEvent from "../events/NewMessageEvent";

export default class User extends Controller {
    model?: UserModel


    @Post()
    async sendMessage(res: Response, req: Request){
        let {channelId,message} = req.data;

        await new NewMessageEvent(channelId).broadcast({message})

        return res.success("Message sent!")
    }

    @Watchable({
        event: (req) => new NewMessageEvent(req.params['channelId'])
    })
    newMessage(res: Response, req: Request){
        let payload = req.getPayload<{message: string}>()

        console.log({payload})
        
        return res.success("",{message: payload.message})
    }


    @Get()
    async fireEvent(res: Response, req: Request){
        // new TestEvent().broadcast();
        // new TestEvent().broadcast();
        return res.success("heyyyy", [])
    }


    @Get()
    async get(res: Response, req: Request){
        // new TestEvent().broadcast();
        return res.success("heyyyy", {"hello": "world"})
    }

    @Get()
    profile(res: Response, req: Request){

        new UserModel().select(Fnc.query('select COUNT user.id')).as('pending')

        return res.success("heyyyy", {
            thisIs: 'profile'
        })
    }

}
