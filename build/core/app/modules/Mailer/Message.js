import Mustache from "mustache";
export default class Message {
    constructor(state) {
        this.state = state;
        this.isHtml = false;
    }
    from(from) {
        this._from = from;
        return this;
    }
    to(to) {
        this._to = to;
        return this;
    }
    subject(text) {
        this._subject = text;
        return this;
    }
    textBody(text) {
        this._body = Mustache.render(text, this.state);
    }
    htmlBody(text) {
        this.isHtml = true;
        this._body = Mustache.render(text, this.state);
    }
}
