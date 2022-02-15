import { Middleware, Request, Response } from "../../../core/http";
import User from "../../models/User";

export default class ValidateLogin implements Middleware{
    boot(res: Response, req: Request){

        return req.validate((Rule) => ({
            email: new Rule().email().required().exists(new User())
        }))
    }
}