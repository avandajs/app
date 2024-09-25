"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../../core/http");
class Blog extends http_1.Controller {
    async get(res, req) {
        var _a;
        // console.log({ arg: req.getArgs('id') });
        return res.success('hello world', (_a = this.model) === null || _a === void 0 ? void 0 : _a.first());
    }
    async set(res, req) {
        var _a;
        await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.create({
            body: 'Hello world',
            title: 'This is the first blog post',
            user_id: 1
        }));
    }
}
__decorate([
    (0, http_1.Get)()
], Blog.prototype, "get", null);
__decorate([
    (0, http_1.Post)()
], Blog.prototype, "set", null);
exports.default = Blog;
