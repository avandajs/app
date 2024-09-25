"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = __importDefault(require("./Address"));
const InvestmentPlan_1 = __importDefault(require("./InvestmentPlan"));
const InvestmentSession_1 = __importDefault(require("./InvestmentSession"));
const MarketCategory_1 = __importDefault(require("./MarketCategory"));
const MarketItem_1 = __importDefault(require("./MarketItem"));
const Order_1 = __importDefault(require("./Order"));
const Payment_1 = __importDefault(require("./Payment"));
const SavedMarketItem_1 = __importDefault(require("./SavedMarketItem"));
const User_1 = __importDefault(require("./User"));
const UserInvestment_1 = __importDefault(require("./UserInvestment"));
const Wallet_1 = __importDefault(require("./Wallet"));
exports.default = {
    Address: Address_1.default,
    InvestmentPlan: InvestmentPlan_1.default,
    InvestmentSession: InvestmentSession_1.default,
    MarketCategory: MarketCategory_1.default,
    MarketItem: MarketItem_1.default,
    Order: Order_1.default,
    Payment: Payment_1.default,
    SavedMarketItem: SavedMarketItem_1.default,
    User: User_1.default,
    UserInvestment: UserInvestment_1.default,
    Wallet: Wallet_1.default,
};
