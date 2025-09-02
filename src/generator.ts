import * as fs from 'fs/promises';
import * as path from 'path';
import { ScaffoldingConfig } from './config';

// Note: __dirname is not available in ES modules by default. 
// This will work with our current tsconfig.json (module: commonjs)
const TEMPLATE_DIR = path.resolve(__dirname, '../template');

async function copyTemplateDir(dirName: string, destPath: string) {
  const sourceDir = path.join(TEMPLATE_DIR, dirName);
  const destDir = path.join(destPath, dirName);
  await fs.cp(sourceDir, destDir, { recursive: true });
}

async function copyTemplateFile(fileName: string, destName: string, destPath: string) {
  const sourceFile = path.join(TEMPLATE_DIR, fileName);
  const destFile = path.join(destPath, destName);
  await fs.copyFile(sourceFile, destFile);
}

async function processDockerCompose(config: ScaffoldingConfig, destPath: string) {
  const sourceFile = path.join(TEMPLATE_DIR, 'docker-compose.template.yaml');
  const destFile = path.join(destPath, 'docker-compose.yaml');
  let fileContents = await fs.readFile(sourceFile, 'utf8');
  const appServiceRegex = /  # app:[\s\S]*?(?=\nvolumes:)/;

  if (config.projectType === 'greenfield') {
    // For greenfield projects, remove the 'app' service.
    fileContents = fileContents.replace(appServiceRegex, '');
  } else if (config.projectType === 'brownfield' && config.appPath) {
    // For brownfield projects, uncomment and configure the app service.
    const appService = `  app:\n    build:\n      context: ./app\n      target: development\n    volumes:\n      - ${config.appPath}:/app\n      - /app/node_modules\n      - /app/.next`;
    fileContents = fileContents.replace(appServiceRegex, appService);
  }

  await fs.writeFile(destFile, fileContents);
}


export async function generateProject(config: ScaffoldingConfig) {
  const destPath = path.resolve(process.cwd(), config.installPath);

  // Create the root project directory
  console.log(`✅ Creating project directory at ${destPath}...`);
  await fs.mkdir(destPath, { recursive: true });

  // Copy template files and directories
  console.log('✅ Generating Docker and Makefile configurations...');
  await copyTemplateDir('dev', destPath);
  await copyTemplateFile('Makefile.template', 'Makefile', destPath);
  
  // Process and create the docker-compose.yaml
  await processDockerCompose(config, destPath);

  console.log('✅ Project files generated.');
}
