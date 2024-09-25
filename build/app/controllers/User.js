"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../../core/http");
const User_1 = __importDefault(require("../models/User"));
const ValidateLogin_1 = __importDefault(require("../middlewares/forms/ValidateLogin"));
const ValidateRegistration_1 = __importDefault(require("../middlewares/forms/ValidateRegistration"));
const app_1 = require("../../core/app");
const LoggedUserOnly_1 = __importDefault(require("../middlewares/LoggedUserOnly"));
class User extends http_1.Controller {
    async get(res, req) {
        let userid = await this.model.getActiveUserId(req);
        let user = await new User_1.default().find(userid);
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
        let isValidPassword = await app_1.Hash.verify(user.password, password);
        if (!isValidPassword) {
            return res.error('Invalid login details');
        }
        // create new session
        let token = await app_1.Token.generate({ user_id: user.id });
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
    async watcherTest(res, req) {
    }
}
__decorate([
    (0, http_1.Get)(new LoggedUserOnly_1.default())
], User.prototype, "get", null);
__decorate([
    (0, http_1.Post)(new ValidateLogin_1.default())
], User.prototype, "login", null);
__decorate([
    (0, http_1.Post)(new ValidateRegistration_1.default())
], User.prototype, "register", null);
__decorate([
    (0, http_1.Watchable)({
        watch: (req) => Math.random()
    })
], User.prototype, "watcherTest", null);
exports.default = User;
