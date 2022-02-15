import { Middleware, Request, Response } from "../../core/http";
import User from "../models/User";
export default class LoggedUserOnly implements Middleware{
    async boot(res: Response,req: Request) {
        let user = new User()
        try {
            let activeUserId = await user.getActiveUserId(req)
            return !!activeUserId && !!(await user.find(activeUserId));
        }catch (e) {
            return res.error('You are not logged in')
        }
    }

}