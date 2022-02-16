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
import MarketItem from "./MarketItem";
import User from "./User";
import Address from "./Address";
export default class Order extends Model {
}
__decorate([
    Column.int({
        references: new MarketItem()
    }),
    __metadata("design:type", Number)
], Order.prototype, "market_item_id", void 0);
__decorate([
    Column.int({
        references: new User()
    }),
    __metadata("design:type", Number)
], Order.prototype, "user_id", void 0);
__decorate([
    Column.enum(['pending', 'initiated', 'completed']),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    Column.int({
        references: new Address()
    }),
    __metadata("design:type", Number)
], Order.prototype, "address_id", void 0);
