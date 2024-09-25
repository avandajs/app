"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@avanda/app");
class TwilioSmsDriver extends app_1.SMS.SmsDriver {
    async send(msg) {
        return new Promise((resolve) => {
            console.table(msg);
            resolve(true);
        });
    }
}
exports.default = TwilioSmsDriver;
