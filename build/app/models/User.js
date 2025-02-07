"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("../../core/orm");
const app_1 = require("../../core/app");
class User extends orm_1.Model {
    async getActiveUserId(req) {
        var _a;
        let token = req.getHeader('authorization').split(' ')[1];
        let tokenDetails = (await app_1.Token.decode(token));
        return (_a = tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.user_id) !== null && _a !== void 0 ? _a : null;
    }
}
__decorate([
    orm_1.Column.text({
        unique: true,
        masSize: 255
    })
], User.prototype, "email", void 0);
__decorate([
    orm_1.Column.text()
], User.prototype, "password", void 0);
__decorate([
    orm_1.Column.text()
], User.prototype, "full_name", void 0);
__decorate([
    orm_1.Column.text({
        nullable: true
    })
], User.prototype, "phone_number", void 0);
__decorate([
    orm_1.Column.text({
        nullable: true
    })
], User.prototype, "picture", void 0);
exports.default = User;
