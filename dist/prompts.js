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
    ]);
    // For this story, we are only implementing the greenfield path.
    // The brownfield questions will be added in a future story.
    const config = {
        installPath: answers.installPath,
        projectType: answers.projectType,
    };
    return config;
}
