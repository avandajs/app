"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("../../core/orm");
class MarketItem extends orm_1.Model {
}
__decorate([
    orm_1.Column.int({
        masSize: [65, 4],
    })
], MarketItem.prototype, "price", void 0);
__decorate([
    orm_1.Column.int()
], MarketItem.prototype, "available_quantity", void 0);
__decorate([
    orm_1.Column.int({
        masSize: [65, 4],
    })
], MarketItem.prototype, "discount_price", void 0);
__decorate([
    orm_1.Column.int()
], MarketItem.prototype, "sales", void 0);
exports.default = MarketItem;
