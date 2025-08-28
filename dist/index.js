#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("./prompts");
const generator_1 = require("./generator");
const installer_1 = require("./installer");
async function main() {
    console.log('👋 Welcome to the AI Dev Starter Kit!');
    console.log("I'm going to ask you a couple of questions to set up your project.");
    try {
        // 1. Get user configuration
        const config = await (0, prompts_1.runPrompts)();
        // 2. Generate the project files
        await (0, generator_1.generateProject)(config);
        // 3. Run the installer for the agentic framework
        await (0, installer_1.runInstaller)(config.installPath);
        console.log('\n✨ All done! Your new AI development environment is ready to go.');
        console.log('\nHere\'s what to do next:');
        console.log(`\n1.  **Navigate to your project directory:**`);
        console.log(`    cd ${config.installPath}`);
        console.log(`\n2.  **Build and start the environment:**`);
        console.log(`    make up`);
        console.log(`\n3.  **Open a new terminal and jump into the dev container:**`);
        console.log(`    make exec`);
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
