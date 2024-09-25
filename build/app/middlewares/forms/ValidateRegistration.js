"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
class ValidateRegistration {
    async boot(res, req) {
        // console.log(new Validator.Rule().required().email())
        return req.validate((Rule) => ({
            email: new Rule().required().email().unique(new User_1.default()),
            password: new Rule().required(),
            full_name: new Rule().required().phone("en-NG"),
            confirmPassword: new Rule()
                .required()
                .refs('password')
                .error('confirm password must be same as password'),
        }));
    }
}
exports.default = ValidateRegistration;
