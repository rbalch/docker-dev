import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import * as path from 'path';
import * as fsExtra from 'fs-extra';
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

async function handleBrownfieldSetup(config: ScaffoldingConfig, destPath: string) {
  if (!config.appPath) return;
  
  console.log('✅ Setting up brownfield project...');
  
  // Create app directory
  const appDir = path.join(destPath, 'app');
  await fs.mkdir(appDir, { recursive: true });
  
  // Copy brownfield project files to app/
  console.log(`✅ Copying files from ${config.appPath} to app/...`);
  await fsExtra.copy(config.appPath, appDir, {
    overwrite: false,
    errorOnExist: false,
    filter: (src) => {
      // Skip node_modules and .git directories
      const relativePath = path.relative(config.appPath!, src);
      return !relativePath.includes('node_modules') && !relativePath.includes('.git');
    }
  });
  
  // Handle Vercel-specific setup
  if (config.useVercel) {
    await handleVercelSetup(destPath, appDir);
  }
}

async function handleVercelSetup(destPath: string, appDir: string) {
  console.log('✅ Setting up Vercel configuration...');
  
  // Check if Dockerfile already exists in app directory
  const dockerfilePath = path.join(appDir, 'Dockerfile');
  if (fsSync.existsSync(dockerfilePath)) {
    throw new Error(`Dockerfile already exists in app directory. Please remove it before proceeding with Vercel setup.`);
  }
  
  // Copy Vercel-specific files to app/
  await copyTemplateFile('vercel/Dockerfile', 'Dockerfile', appDir);
  await copyTemplateFile('vercel/docker-entrypoint.sh', 'docker-entrypoint.sh', appDir);
  
  // Copy Vercel docker-compose template to project root
  await copyTemplateFile('vercel/docker-compose.vercel.template.yaml', 'docker-compose.vercel.yaml', destPath);
}

async function processDockerCompose(_config: ScaffoldingConfig, destPath: string) {
  const sourceFile = path.join(TEMPLATE_DIR, 'docker-compose.template.yaml');
  const destFile = path.join(destPath, 'docker-compose.yaml');
  const fileContents = await fs.readFile(sourceFile, 'utf8');
  
  // Just copy the template as-is, no modifications needed
  // App service configuration is now handled by Vercel docker-compose override files
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
  
  // Handle brownfield-specific setup
  if (config.projectType === 'brownfield' && config.appPath) {
    await handleBrownfieldSetup(config, destPath);
  }
  
  // Process and create the docker-compose.yaml
  await processDockerCompose(config, destPath);

  // Copy .bmad-flattenignore
  await copyTemplateFile('.bmad-flattenignore', '.bmad-flattenignore', destPath);
  
  // Create empty .env file
  const envPath = path.join(destPath, '.env');
  await fs.writeFile(envPath, '', 'utf8');

  // Copy ADK files if requested
  if (config.adkSupport) {
    console.log('✅ Copying Google ADK files...');
    await copyTemplateDir('adk', destPath);
  }

  console.log('✅ Project files generated.');
}
