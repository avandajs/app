// interface Fi
export default class File {
    constructor(file) {
        this.file = file;
    }
    async moveTo(target) {
        if (typeof this.file != 'string') {
            await this.file.mv(target);
        }
    }
}
