#!/usr/bin/env node

import { runPrompts } from './prompts';
import { generateProject } from './generator';
import { ensureVolumesExist } from './docker';
import { runInstaller } from './installer';

async function main() {
  console.log('👋 Welcome to the AI Dev Starter Kit!');
  console.log("I'm going to ask you a couple of questions to set up your project.");

  try {
    // 1. Get user configuration
    const config = await runPrompts();

    // 2. Generate the project files
    await generateProject(config);

    // 3. Ensure Docker volumes exist
    await ensureVolumesExist();

    // 4. Run the installer for the agentic framework
    await runInstaller(config.installPath);

    console.log('\n✨ All done! Your new AI development environment is ready to go.');
    console.log('\nHere\'s what to do next:');
    console.log(`\n1.  **Navigate to your project directory:**
    cd ${config.installPath}`);
    console.log(`\n2.  **Build and start the environment:**
    make up`);
    console.log(`\n3.  **Open a new terminal and jump into the dev container:**
    make exec`);
    console.log(`\n4.  **Once inside, you can start working with your agents!**`);

  } catch (error) {
    console.error('\n❌ An error occurred during setup:');
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

main();
