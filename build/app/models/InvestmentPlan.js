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
import InvestmentSession from "./InvestmentSession";
export default class InvestmentPlan extends Model {
}
__decorate([
    Column.text(),
    __metadata("design:type", String)
], InvestmentPlan.prototype, "name", void 0);
__decorate([
    Column.text(),
    __metadata("design:type", String)
], InvestmentPlan.prototype, "description", void 0);
__decorate([
    Column.boolean(),
    __metadata("design:type", Boolean)
], InvestmentPlan.prototype, "is_active", void 0);
__decorate([
    Column.int({
        references: new InvestmentSession()
    }),
    __metadata("design:type", Number)
], InvestmentPlan.prototype, "investment_session_id", void 0);
__decorate([
    Column.decimal({
        masSize: [65, 4]
    }),
    __metadata("design:type", Number)
], InvestmentPlan.prototype, "required_capital", void 0);
__decorate([
    Column.decimal({
        masSize: [65, 4],
        nullable: true
    }),
    __metadata("design:type", Number)
], InvestmentPlan.prototype, "percentage_increment", void 0);
__decorate([
    Column.decimal({
        masSize: [65, 4],
        nullable: true
    }),
    __metadata("design:type", Number)
], InvestmentPlan.prototype, "static_increment", void 0);
__decorate([
    Column.int(),
    __metadata("design:type", Number)
], InvestmentPlan.prototype, "total_allowed_investors", void 0);
__decorate([
    Column.json(),
    __metadata("design:type", Object)
], InvestmentPlan.prototype, "duration", void 0);
