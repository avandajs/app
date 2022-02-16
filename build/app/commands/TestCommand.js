import { Out } from "@avanda/cli";
export default class TestCommand {
    constructor() {
        this.command = "test";
        this.description = "this is a sample command";
    }
    exe(action = '', options) {
        Out.success('this success message from a test command');
    }
}
