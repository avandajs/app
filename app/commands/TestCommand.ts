import { CommandLine } from "../../core/cli";
import {Out} from "../../core/cli";
import User from "../models/User";

export default class TestCommand implements CommandLine {
    command: string = "test";
    description: string = "this is a sample command";

    async exe(action: string = '',options: object) {
        await new User().ofId(1).softDelete()
    }

}
