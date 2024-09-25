import { CommandLine } from "../../core/cli";
import {Out} from "../../core/cli";

import {Request} from "../../core/http";


export default class Hello implements CommandLine {
    command: string = "hello";
    description: string = "generate a bootstrapper";


    public async exe(target: string = '',options: object) {
        let req = await new Request().setHeaders({
            "content-type": "application/json",
            Authorization: `Bearer c14f8e229d4c3caf3e9d2fdfef9ca3cccfb927f9e35c7bae9e63a35fc47b85ca`,
          }).setData({
            "bank_code": '035',
            "account_number": '0246541842'
          }).post(
            `https://smeplug.ng/api/v1/transfer/resolveaccount`
          );

          console.log({req})
        Out.success('this is coming from Hello')
    } 

}