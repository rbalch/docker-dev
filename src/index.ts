#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runPrompts } from './prompts';
import { generateProject } from './generator';
import { ensureVolumesExist } from './docker';
import { runInstaller } from './installer';
import { ScaffoldingConfig, getUniqueProjectName } from './config';

const DEFAULT_PROJECT_NAME = 'ai-dev-environment';

async function main() {
  console.log('👋 Welcome to the AI Dev Starter Kit!');

  const argv = await yargs(hideBin(process.argv))
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

  let config: ScaffoldingConfig;

  if (argv.projectType) {
    if (argv.projectType === 'brownfield' && !argv.appPath) {
        console.error('❌ --appPath is required for brownfield projects');
        process.exit(1);
    }
    config = {
      projectType: argv.projectType as 'greenfield' | 'brownfield',
      installPath: argv.installPath || getUniqueProjectName(DEFAULT_PROJECT_NAME),
      appPath: argv.appPath,
    };
  } else {
    console.log("I'm going to ask you a couple of questions to set up your project.");
    config = await runPrompts();
  }


  try {
    // 1. Generate the project files
    await generateProject(config);

    // 2. Ensure Docker volumes exist
    await ensureVolumesExist();

    if (process.env.SKIP_INSTALLER !== 'true') {
      await runInstaller(config.installPath);
    }

    console.log('\n✨ All done! Your new AI development environment is ready to go.');
    console.log('\nHere\'s what to do next:');
    console.log(`\n1.  **Navigate to your project directory:**\n    cd ${config.installPath}`);
    console.log(`\n2.  **Build and start the environment:**\n    make up`);
    console.log(`\n3.  **Open a new terminal and jump into the dev container:**\n    make exec`);
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