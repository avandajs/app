"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const index_1 = require("../index");
var downloader = require('github-download-directory');
class Init {
    constructor() {
        this.command = "init <projectName>";
        this.description = "create new project";
    }
    exe(projectName = '', options) {
        const { exec } = require('child_process');
        index_1.Out.write(`Started creating a project: ${chalk_1.default.green(projectName)}`);
        exec(`git clone https://github.com/avandajs/avanda-starter.git ${projectName}`, (err, stdout, stderr) => {
            // handle err, stdout & stderr
            if (err) {
                index_1.Out.error(stderr);
            }
            else {
                index_1.Out.success(`☑️ Project created successfully`, false);
                index_1.Out.write(`ℹ️ Next steps: run the commands below`);
                index_1.Out.write(`${chalk_1.default.green('[1]')} cd ${projectName}`);
                index_1.Out.write(`${chalk_1.default.green('[2]')} npm install`);
                index_1.Out.write(`${chalk_1.default.green('[3]')} npm run dev`);
            }
        });
    }
}
exports.default = Init;
