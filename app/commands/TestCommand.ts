import { CommandLine } from "../../core/cli";
import {Out} from "../../core/cli";

export default class TestCommand implements CommandLine {
    command: string = "test";
    description: string = "this is a sample command";

    exe(action: string = '',options: object) {
        Out.success('this success message from a test command')
    }

}
