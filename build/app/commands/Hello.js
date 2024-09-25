"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("../../core/cli");
class Hello {
    constructor() {
        this.command = "hello <target>";
        this.description = "generate a bootstrapper";
    }
    exe(target = '', options) {
        cli_1.Out.success('this is coming from Hello');
    }
}
exports.default = Hello;
