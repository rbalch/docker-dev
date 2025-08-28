import fs from 'fs';
import path from 'path';

export interface ScaffoldingConfig {
  installPath: string;
  projectType: 'greenfield' | 'brownfield';
  brownfield?: {
    existingPath: string;
    importMethod: 'move' | 'copy';
  };
}

/**
 * Finds a unique directory name by appending a number if the original name exists.
 * @param baseName The base name for the directory.
 * @returns A unique directory name.
 */
export function getUniqueProjectName(baseName: string): string {
  let newName = baseName;
  let counter = 1;
  while (fs.existsSync(path.resolve(process.cwd(), newName))) {
    newName = `${baseName}-${counter}`;
    counter++;
  }
  return newName;
}
