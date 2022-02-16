"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let controller = function (assetName, meta) {
    const { modelName } = meta;
    return `import {Controller, Request, Response, Get} from "@avanda/http";
${modelName ? `import ${assetName} from "../models/${modelName}"\n` : ''}
export default class extends Controller {
    ${modelName ? 'model?: ' + assetName : ''}
    
    @Get()
    async get(res: Response,req: Request){

        let users = ${modelName ? `await this.model
            ?.where('first_name')
            .like('%aisha')
            .orderBy('id','DESC')
            .all();` : 'null;'}
        
        return res.success<any>('hello world',users)
    }
}
`;
};
exports.default = controller;
