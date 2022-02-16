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
import InvestmentPlan from "./InvestmentPlan";
import User from "./User";
export default class UserInvestment extends Model {
}
__decorate([
    Column.int({
        references: new InvestmentPlan()
    }),
    __metadata("design:type", Number)
], UserInvestment.prototype, "investment_plan_id", void 0);
__decorate([
    Column.int({
        references: new User()
    }),
    __metadata("design:type", Number)
], UserInvestment.prototype, "user_id", void 0);
__decorate([
    Column.int({
        masSize: [65, 4]
    }),
    __metadata("design:type", Number)
], UserInvestment.prototype, "accrued_interest", void 0);
__decorate([
    Column.date(),
    __metadata("design:type", String)
], UserInvestment.prototype, "expired_time", void 0);
