"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let command = function (assetName, meta) {
    return `import {Seeder} from "@avanda/orm"
import ${assetName} from "../models/${assetName}"
export default class implements Seeder{
    async run(faker: Faker.FakerStatic): Promise<void> {
        new ${assetName}().createBulk([
            /*Create multiple data here*/
        ])
    }
}`;
};
exports.default = command;
