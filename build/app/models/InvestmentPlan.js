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
const orm_1 = require("../../core/orm");
const InvestmentSession_1 = __importDefault(require("./InvestmentSession"));
class InvestmentPlan extends orm_1.Model {
}
__decorate([
    orm_1.Column.text()
], InvestmentPlan.prototype, "name", void 0);
__decorate([
    orm_1.Column.text()
], InvestmentPlan.prototype, "description", void 0);
__decorate([
    orm_1.Column.boolean()
], InvestmentPlan.prototype, "is_active", void 0);
__decorate([
    orm_1.Column.int({
        references: new InvestmentSession_1.default()
    })
], InvestmentPlan.prototype, "investment_session_id", void 0);
__decorate([
    orm_1.Column.decimal({
        masSize: [65, 4]
    })
], InvestmentPlan.prototype, "required_capital", void 0);
__decorate([
    orm_1.Column.decimal({
        masSize: [65, 4],
        nullable: true
    })
], InvestmentPlan.prototype, "percentage_increment", void 0);
__decorate([
    orm_1.Column.decimal({
        masSize: [65, 4],
        nullable: true
    })
], InvestmentPlan.prototype, "static_increment", void 0);
__decorate([
    orm_1.Column.int()
], InvestmentPlan.prototype, "total_allowed_investors", void 0);
__decorate([
    orm_1.Column.json()
], InvestmentPlan.prototype, "duration", void 0);
exports.default = InvestmentPlan;
