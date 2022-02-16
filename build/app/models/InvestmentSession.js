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
export default class InvestmentSession extends Model {
}
__decorate([
    Column.text(),
    __metadata("design:type", String)
], InvestmentSession.prototype, "name", void 0);
__decorate([
    Column.text(),
    __metadata("design:type", String)
], InvestmentSession.prototype, "description", void 0);
__decorate([
    Column.date(),
    __metadata("design:type", String)
], InvestmentSession.prototype, "expiry_time", void 0);
__decorate([
    Column.int(),
    __metadata("design:type", Number)
], InvestmentSession.prototype, "no_of_active_investment", void 0);
__decorate([
    Column.int(),
    __metadata("design:type", Number)
], InvestmentSession.prototype, "no_of_expired_investment", void 0);
__decorate([
    Column.decimal({
        masSize: [65, 4]
    }),
    __metadata("design:type", Number)
], InvestmentSession.prototype, "total_allowed_capital", void 0);
__decorate([
    Column.boolean(),
    __metadata("design:type", Boolean)
], InvestmentSession.prototype, "is_active", void 0);
