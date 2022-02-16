var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Request, Response, Get, Post } from "../../core/http";
export default class Blog extends Controller {
    async get(res, req) {
        var _a;
        console.log({ arg: req.getArgs('id') });
        return res.success('hello world', (_a = this.model) === null || _a === void 0 ? void 0 : _a.first());
    }
    async set(res, req) {
        var _a;
        (_a = this.model) === null || _a === void 0 ? void 0 : _a.create({
            body: 'Hello world',
            title: 'This is the first blog post',
            user_id: 1
        });
    }
}
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, Request]),
    __metadata("design:returntype", Promise)
], Blog.prototype, "get", null);
__decorate([
    Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, Request]),
    __metadata("design:returntype", Promise)
], Blog.prototype, "set", null);
