import { spawn } from 'child_process';
import * as path from 'path';
import { ScaffoldingConfig } from './config';

export function runInstaller(config: ScaffoldingConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    const destPath = path.resolve(process.cwd(), config.installPath);

    console.log(`✅ Installing core agentic framework with 'npx bmad-method install'...`);
    console.log(`   (This might take a moment, grabbing the latest and greatest for you.)`);

    const installChild = spawn('npx', ['bmad-method', 'install', '--directory', '.', '--ide', 'gemini', '--ide', 'claude-code', '--full'], {
      cwd: destPath,
      stdio: 'inherit', // This pipes the output directly to the parent process
      shell: true // Use shell to handle `npx` correctly, especially on Windows
    });

    installChild.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Framework installation complete.');

        if (config.projectType === 'brownfield' && config.appPath) {
          console.log(`✅ Generating codebase XML for brownfield project...`);
          const outputPath = path.join(destPath, 'docs', 'codebase.xml');
          const flattenChild = spawn('sh', ['-c', `echo n | npx bmad-method flatten --input "${destPath}" --output "${outputPath}"`], {
            cwd: destPath,
            stdio: 'inherit',
            shell: true
          });

          flattenChild.on('close', (flattenCode) => {
            if (flattenCode === 0) {
              console.log('✅ Codebase XML generated successfully.');
              resolve();
            } else {
              reject(new Error(`Codebase flatten failed with exit code: ${flattenCode}`));
            }
          });

          flattenChild.on('error', (err) => {
            reject(err);
          });
        } else {
          resolve();
        }
      } else {
        reject(new Error(`Installer failed with exit code: ${code}`));
      }
    });

    installChild.on('error', (err) => {
      reject(err);
    });
  });
}


export async function promptForAppPath(): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write('Is this a brownfield project (existing application)? (y/N): ');
    process.stdin.once('data', (data) => {
      const answer = data.toString().trim().toLowerCase();
      if (answer === 'y') {
        process.stdout.write('Please provide the absolute path to your existing application: ');
        process.stdin.once('data', (appPathData) => {
          resolve(appPathData.toString().trim());
        });
      } else {
        resolve(''); // Not a brownfield project
      }
    });
  });
}

