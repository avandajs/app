import {Middleware} from "../../core/http";
import {Request, Response} from "../../core/http";

export default class AdminOnly implements Middleware{
    boot(res: Response,req: Request){
        return true
    }
}