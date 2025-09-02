import inquirer from 'inquirer';
import { ScaffoldingConfig, getUniqueProjectName } from './config';

const DEFAULT_PROJECT_NAME = 'ai-dev-environment';

export async function runPrompts(): Promise<ScaffoldingConfig> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'installPath',
      message: 'First, where should I set up your project?',
      default: getUniqueProjectName(DEFAULT_PROJECT_NAME),
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
    }
  ]);

  const config: ScaffoldingConfig = {
    installPath: answers.installPath,
    projectType: answers.projectType,
  };

  if (answers.appPath) {
    config.appPath = answers.appPath;
  }

  return config;
}
