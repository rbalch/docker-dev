"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPrompts = runPrompts;
const inquirer_1 = __importDefault(require("inquirer"));
const config_1 = require("./config");
const DEFAULT_PROJECT_NAME = 'ai-dev-environment';
async function runPrompts() {
    const answers = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'installPath',
            message: 'First, where should I set up your project?',
            default: (0, config_1.getUniqueProjectName)(DEFAULT_PROJECT_NAME),
        },
        {
            type: 'list',
            name: 'projectType',
            message: 'Got it. Now, what kind of project is this?',
            choices: [
                { name: 'Greenfield (A brand new project, starting from scratch)', value: 'greenfield' },
                { name: 'Brownfield (An existing project you want to bring into the environment)', value: 'brownfield' },
            ],
            default: 'greenfield',
        },
        {
            type: 'input',
            name: 'appPath',
            message: 'Enter the absolute path to your existing application:',
            when: (answers) => answers.projectType === 'brownfield',
        },
        {
            type: 'confirm',
            name: 'useVercel',
            message: 'Are you using Vercel for deployment?',
            when: (answers) => answers.projectType === 'brownfield',
            default: false,
        }
    ]);
    const config = {
        installPath: answers.installPath,
        projectType: answers.projectType,
    };
    if (answers.appPath) {
        config.appPath = answers.appPath;
    }
    if (answers.useVercel !== undefined) {
        config.useVercel = answers.useVercel;
    }
    return config;
}
