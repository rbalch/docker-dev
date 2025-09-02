#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const prompts_1 = require("./prompts");
const generator_1 = require("./generator");
const docker_1 = require("./docker");
const installer_1 = require("./installer");
const config_1 = require("./config");
const DEFAULT_PROJECT_NAME = 'ai-dev-environment';
async function main() {
    console.log('👋 Welcome to the AI Dev Starter Kit!');
    const argv = await (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .option('projectType', {
        type: 'string',
        description: 'Project type',
        choices: ['greenfield', 'brownfield'],
    })
        .option('installPath', {
        type: 'string',
        description: 'Install path',
    })
        .option('appPath', {
        type: 'string',
        description: 'Path to existing application for brownfield projects',
    })
        .help()
        .argv;
    let config;
    if (argv.projectType) {
        if (argv.projectType === 'brownfield' && !argv.appPath) {
            console.error('❌ --appPath is required for brownfield projects');
            process.exit(1);
        }
        config = {
            projectType: argv.projectType,
            installPath: argv.installPath || (0, config_1.getUniqueProjectName)(DEFAULT_PROJECT_NAME),
            appPath: argv.appPath,
        };
    }
    else {
        console.log("I'm going to ask you a couple of questions to set up your project.");
        config = await (0, prompts_1.runPrompts)();
    }
    try {
        // 1. Generate the project files
        await (0, generator_1.generateProject)(config);
        // 2. Ensure Docker volumes exist
        await (0, docker_1.ensureVolumesExist)();
        if (process.env.SKIP_INSTALLER !== 'true') {
            await (0, installer_1.runInstaller)(config);
        }
        console.log('\n✨ All done! Your new AI development environment is ready to go.');
        console.log('\nHere\'s what to do next:');
        console.log(`\n1.  **Navigate to your project directory:**\n    cd ${config.installPath}`);
        console.log(`\n2.  **Build and start the environment:**\n    make up`);
        console.log(`\n3.  **Open a new terminal and jump into the dev container:**\n    make exec`);
        console.log(`\n4.  **Once inside, you can start working with your agents!**`);
    }
    catch (error) {
        console.error('\n❌ An error occurred during setup:');
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error(error);
        }
        process.exit(1);
    }
}
main();
