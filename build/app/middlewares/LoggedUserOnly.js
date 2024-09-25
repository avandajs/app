"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class LoggedUserOnly {
    async boot(res, req) {
        let user = new User_1.default();
        try {
            let activeUserId = await user.getActiveUserId(req);
            return !!activeUserId && !!(await user.find(activeUserId));
        }
        catch (e) {
            return res.error('You are not logged in');
        }
    }
}
exports.default = LoggedUserOnly;
