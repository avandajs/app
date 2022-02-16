import { Out } from "@avanda/cli";
export default class Hello {
    constructor() {
        this.command = "hello <target>";
        this.description = "generate a bootstrapper";
    }
    exe(target = '', options) {
        Out.success('this is coming from Hello');
    }
}
