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
import User from "./User";
export default class Payment extends Model {
}
__decorate([
    Column.int({
        references: new User()
    }),
    __metadata("design:type", Number)
], Payment.prototype, "user_id", void 0);
__decorate([
    Column.decimal({
        masSize: [65, 4]
    }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    Column.enum(['INVESTMENT', 'PURCHASE']),
    __metadata("design:type", String)
], Payment.prototype, "for", void 0);
__decorate([
    Column.enum(['pending', 'initiated', 'completed']),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    Column.text({
        masSize: 200
    }),
    __metadata("design:type", Number)
], Payment.prototype, "token", void 0);
