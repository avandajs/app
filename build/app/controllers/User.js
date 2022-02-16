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
import Model from "../models/User";
import ValidateLogin from "../middlewares/forms/ValidateLogin";
import ValidateRegistration from "../middlewares/forms/ValidateRegistration";
import { Hash, Token } from "../../core/app";
import LoggedUserOnly from "../middlewares/LoggedUserOnly";
export default class User extends Controller {
    async get(res, req) {
        let userid = await this.model.getActiveUserId(req);
        let user = new Model().find(userid);
        return res.success('you are logged in', user);
    }
    async login(res, req) {
        var _a;
        let user = await ((_a = this.model) === null || _a === void 0 ? void 0 : _a.where({
            email: req.getData('email')
        }).first());
        if (!user) {
            return res.error('Invalid email or password');
        }
        let password = req.getData('password');
        let isValidPassword = await Hash.verify(user.password, password);
        if (!isValidPassword) {
            return res.error('Invalid login details');
        }
        // create new session
        let token = await Token.generate({ user_id: user.id });
        return res.success('login successful', { token });
    }
    async register(res, req) {
        // let user = await this.model?.create({
        //     email: req.getData('email') as string,
        //     password: await Hash.make(req.getData('password') as string),
        //     full_name: req.getData('full_name') as string,
        // })
        // console.log({user: req.data})
    }
}
__decorate([
    Get(new LoggedUserOnly()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, Request]),
    __metadata("design:returntype", Promise)
], User.prototype, "get", null);
__decorate([
    Post(new ValidateLogin()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, Request]),
    __metadata("design:returntype", Promise)
], User.prototype, "login", null);
__decorate([
    Post(new ValidateRegistration()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, Request]),
    __metadata("design:returntype", Promise)
], User.prototype, "register", null);
