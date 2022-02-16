var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Model } from "../../core/orm";
import { Token } from "../../core/app";
export default class User extends Model {
    async getActiveUserId(req) {
        var _a;
        let token = req.getHeader('authorization').split(' ')[1];
        let tokenDetails = (await Token.decode(token));
        return (_a = tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.user_id) !== null && _a !== void 0 ? _a : null;
    }
}
__decorate([
    Column.text({
        unique: true,
        masSize: 255
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column.text(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column.text(),
    __metadata("design:type", String)
], User.prototype, "full_name", void 0);
__decorate([
    Column.text({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    Column.text({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "picture", void 0);
