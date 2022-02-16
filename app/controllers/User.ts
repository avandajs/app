import {Controller, Request, Response, Get, Post} from "../../core/http";
import Model from "../models/User"
import ValidateLogin from "../middlewares/forms/ValidateLogin";
import ValidateRegistration from "../middlewares/forms/ValidateRegistration";
import {Hash,Token} from "../../core/app";
import LoggedUserOnly from "../middlewares/LoggedUserOnly";

export default class User extends Controller {
    model?: Model

    @Get(
        new LoggedUserOnly()
    )
    async get(res: Response,req: Request){
        let userid = await this.model.getActiveUserId(req)
        let user = await new Model().find(userid);

        return res.success<any>('you are logged in',user)
    }

    @Post(
        new ValidateLogin()
    )
    async login(res: Response,req: Request){

        let user = await this.model?.where({
            email: req.getData('email') as string
        }).first()

        if (!user){
            return res.error('Invalid email or password')
        }

        let password = req.getData('password') as string

        let isValidPassword = await Hash.verify(user.password,password)

        if(!isValidPassword){
            return res.error('Invalid login details')
        }

        // create new session

        let token = await Token.generate({user_id: user.id})

        return res.success('login successful', {token})
    }
    @Post(
        new ValidateRegistration()
    )
    async register(res: Response,req: Request){
        // let user = await this.model?.create({
        //     email: req.getData('email') as string,
        //     password: await Hash.make(req.getData('password') as string),
        //     full_name: req.getData('full_name') as string,
        // })

        // console.log({user: req.data})

    }
}
