export default class runtimeError extends Error {
    constructor(message, data = null) {
        super(message);
        this.message = message;
        this.data = data;
    }
}
