"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const boostraper_1 = __importDefault(require("./boostraper"));
const lodash_1 = require("lodash");
const out_1 = require("../out");
const getInput_1 = __importDefault(require("../out/getInput"));
const command_tmp_1 = __importDefault(require("./tmps/command.tmp"));
const model_tmp_1 = __importDefault(require("./tmps/model.tmp"));
const seeder_tmp_1 = __importDefault(require("./tmps/seeder.tmp"));
const middleware_tmp_1 = __importDefault(require("./tmps/middleware.tmp"));
const controller_1 = __importDefault(require("./tmps/controller"));
class Create {
    constructor() {
        this.command = "create <asset>";
        this.description = "This command automatically generates assets for you";
        this.options = [
            {
                option: '-n <name>',
                description: 'Asset name'
            },
            {
                option: '-a',
                description: 'Create all necessary assets at once'
            },
        ];
        this.writePaths = {
            command: "./app/commands",
            controller: "./app/controllers",
            middleware: "./app/middlewares",
            model: "./app/models",
            seeder: "./app/seeders",
        };
    }
    async modelCreate(assetName, exitOnDone = true) {
        let template = (0, model_tmp_1.default)(assetName, {});
        await Create.writeCode(template, this.writePaths.model + '/' + assetName + '.ts');
        (0, out_1.success)('Model code successfully generated', false);
        await (new boostraper_1.default()).exe(this.writePaths.model, {}, exitOnDone);
    }
    async seederCreate(assetName, exitOnDone = true) {
        let template = (0, seeder_tmp_1.default)(assetName, {});
        await Create.writeCode(template, this.writePaths.seeder + '/' + assetName + '.ts');
        (0, out_1.success)('seeder code successfully generated', false);
        await (new boostraper_1.default()).exe(this.writePaths.seeder, {}, exitOnDone);
    }
    async middlewareCreate(assetName) {
        let template = (0, middleware_tmp_1.default)(assetName, {});
        await Create.writeCode(template, this.writePaths.middleware + '/' + assetName + '.ts');
        (0, out_1.success)('Model code successfully generated', false);
        await (new boostraper_1.default()).exe(this.writePaths.middleware, {});
    }
    async controllerCreate(assetName, autoLinkModel = false) {
        let meta = {};
        // get command name
        meta.modelName = autoLinkModel ? assetName : Create.toUpper(await (0, getInput_1.default)('Enter an existing model name'));
        if (!autoLinkModel && meta.modelName.trim().length && !fs_1.default.existsSync(this.writePaths.model + '/' + meta.modelName + '.ts')) {
            (0, out_1.error)('Model with name: "' + meta.modelName + '" does not exist');
            return;
        }
        let template = (0, controller_1.default)(assetName, meta);
        await Create.writeCode(template, this.writePaths.controller + '/' + assetName + '.ts');
        (0, out_1.success)('Controller code successfully generated', false);
        await (new boostraper_1.default()).exe(this.writePaths.controller, {}, !autoLinkModel);
    }
    async commandCreate(assetName) {
        let meta = {};
        // get command name
        meta.cmdName = (await (0, getInput_1.default)('Enter command name (Leave empty to use file name)'));
        meta.cmdDescription = (await (0, getInput_1.default)('Enter command description'));
        let template = (0, command_tmp_1.default)(assetName, meta);
        await Create.writeCode(template, this.writePaths.command + '/' + assetName + '.ts');
        await (new boostraper_1.default()).exe(this.writePaths.command, {});
        (0, out_1.success)('Command code successfully generated');
    }
    static async writeCode(code, target) {
        return new Promise((resolve, reject) => {
            try {
                fs_1.default.writeFile(target, code, () => {
                    resolve(null);
                });
            }
            catch (e) {
                (0, out_1.error)(e);
            }
        });
    }
    static toUpper(text) {
        if (!text.trim().length)
            return "";
        let text_s = text.split('');
        text_s[0] = text_s[0].toUpperCase();
        return text_s.join('');
    }
    async exe(asset = '', options) {
        // console.log({options})
        var _a;
        let assetName = (_a = options === null || options === void 0 ? void 0 : options.n) !== null && _a !== void 0 ? _a : (await (0, getInput_1.default)('Enter ' + asset + ' name:'));
        if (!assetName) {
            (0, out_1.error)('Error: specify the asset name, try again');
            return;
        }
        assetName = Create.toUpper((0, lodash_1.camelCase)(assetName));
        if (options['a']) {
            //    create all assets
            //    create model
            await this.modelCreate(assetName, false);
            await this.controllerCreate(assetName, true);
            await this.seederCreate(assetName, false);
            (0, out_1.success)("All necessary assets generated");
            return;
        }
        if (this[asset + 'Create']) {
            this[asset + 'Create'](assetName);
        }
        else {
            (0, out_1.error)('unsupported asset type: ' + asset);
        }
    }
}
exports.default = Create;
