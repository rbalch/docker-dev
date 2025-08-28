import { spawn } from 'child_process';
import * as path from 'path';

export function runInstaller(installPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const destPath = path.resolve(process.cwd(), installPath);

    console.log(`✅ Installing core agentic framework with 'npx bmad-method install'...`);
    console.log(`   (This might take a moment, grabbing the latest and greatest for you.)`);

    const child = spawn('npx', ['bmad-method', 'install', '--directory', '.', '--ide', 'gemini', '--ide', 'claude-code', '--full'], {
      cwd: destPath,
      stdio: 'inherit', // This pipes the output directly to the parent process
      shell: true // Use shell to handle `npx` correctly, especially on Windows
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Framework installation complete.');
        resolve();
      } else {
        reject(new Error(`Installer failed with exit code: ${code}`));
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}
