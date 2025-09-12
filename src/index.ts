#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runPrompts } from './prompts';
import { generateProject } from './generator';
import { ensureVolumesExist } from './docker';
import { runInstaller } from './installer';
import { ScaffoldingConfig, getUniqueProjectName } from './config';

const DEFAULT_PROJECT_NAME = 'ai-dev-environment';

function printPostInstallationNotes(config: ScaffoldingConfig) {
  console.log('\n📋 WHAT WAS DONE:');
  console.log(`   • Created project directory: ${config.installPath}`);
  console.log('   • Generated Docker development environment');
  console.log('   • Configured BMAD agentic framework');
  console.log('   • Created empty .env file');
  console.log('   • Added .bmad-flattenignore for code analysis');
  
  if (config.projectType === 'brownfield') {
    console.log(`   • Copied brownfield project files to app/ directory`);
    if (config.useVercel) {
      console.log('   • Configured Vercel-specific Dockerfile and entrypoint');
      console.log('   • Created docker-compose.vercel.yaml override file');
    }
  }
  
  console.log('\n📝 WHAT WAS GENERATED:');
  console.log('   • dev/ - Development container configuration');
  console.log('   • Makefile - Build and container management commands');
  console.log('   • docker-compose.yaml - Main container orchestration');
  if (config.useVercel) {
    console.log('   • docker-compose.vercel.yaml - Vercel-specific overrides');
  }
  console.log('   • .bmad-core/ - BMAD framework configuration');
  if (config.projectType === 'brownfield') {
    console.log('   • app/ - Your application code');
    console.log('   • docs/codebase.xml - Flattened codebase for AI analysis');
  }
  
  console.log('\n🚀 NEXT STEPS:');
  console.log(`   1. Navigate to your project: cd ${config.installPath}`);
  console.log('   2. Build containers: make build');
  console.log('   3. Start environment: make up');
  console.log('   4. Connect with VS Code Remote Extension (recommended):');
  console.log('      • Install "Dev Containers" extension');
  console.log('      • Command Palette > "Dev Containers: Attach to Running Container"');
  console.log('   5. Or use terminal: make exec');
  
  if (config.useVercel) {
    console.log('\n🌐 VERCEL PROXY INFO:');
    console.log('   • The Makefile automatically detects docker-compose.vercel.yaml');
    console.log('   • This enables port 3000 proxy for Vercel apps');
    console.log('   • Test proxy: make verify-proxy (after make up)');
    console.log('   • Your app will be available at http://localhost:3000');
  }
  
  console.log('\n' + '='.repeat(60));
}

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
    .option('vercel', {
      type: 'boolean',
      description: 'Use Vercel configuration for brownfield projects',
      default: false,
    })
    .option('adk-setup', {
      type: 'boolean',
      description: 'Include support for the Google Agent Development Kit (ADK)',
      default: false,
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
      useVercel: argv.vercel,
      adkSupport: argv.adkSetup,
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
      await runInstaller(config);
    }

    console.log('\n✨ All done! Your new AI development environment is ready to go.');
    console.log('\n' + '='.repeat(60));
    
    // Generate detailed post-installation notes
    printPostInstallationNotes(config);

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