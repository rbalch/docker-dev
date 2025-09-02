import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const REQUIRED_VOLUMES = [
  'root-history',
  'vscode-server',
  'huggingface-cache',
  'google-vscode-extension-cache',
];

async function getExistingVolumes(): Promise<string[]> {
  try {
    // Use the format flag for easy parsing
    const { stdout } = await execAsync("docker volume ls --format '{{.Name}}'");
    return stdout.trim().split('\n').filter(Boolean);
  } catch (error: any) {
    if (error.stderr && error.stderr.includes('permission denied')) {
      console.warn('   Permission denied. Trying with sudo...');
      const { stdout } = await execAsync("sudo docker volume ls --format '{{.Name}}'");
      return stdout.trim().split('\n').filter(Boolean);
    }
    console.error('❌ Error listing Docker volumes. Is Docker running?');
    throw error;
  }
}

export async function ensureVolumesExist(): Promise<void> {
  console.log('✅ Checking for required Docker volumes...');
  const existingVolumes = await getExistingVolumes();
  const missingVolumes = REQUIRED_VOLUMES.filter(
    (vol) => !existingVolumes.includes(vol)
  );

  if (missingVolumes.length === 0) {
    console.log('   All required volumes already exist.');
    return;
  }

  console.log(`   Found ${missingVolumes.length} missing volume(s). Creating them now...`);

  for (const volume of missingVolumes) {
    try {
      console.log(`   - Creating volume: ${volume}`);
      await execAsync(`docker volume create ${volume}`);
    } catch (error) {
      console.error(`❌ Failed to create volume ${volume}.`);
      throw error;
    }
  }

  console.log('✅ All required Docker volumes are ready.');
}
