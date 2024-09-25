"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// interface Fi
class File {
    constructor(file) {
        this.file = file;
    }
    async moveTo(target) {
        if (typeof this.file != 'string') {
            await this.file.mv(target);
        }
    }
}
exports.default = File;
