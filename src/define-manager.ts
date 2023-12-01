import { cache } from './cache.js';

import isPathExists from './utils/is-path-exists.js';
import { resolve } from 'node:path';

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

// Mapping of package managers to their respective lock files.
export const lockFiles = {
  npm: 'package-lock.json',
  yarn: 'yarn.lock',
  pnpm: 'pnpm-lock.yaml',
  bun: 'bun.lockb',
} satisfies Record<PackageManager, string>;

/**
 * Defines the package manager used in a given directory.
 * Checks for the presence of characteristic files (e.g., package-lock.json for npm)
 * for each known package manager.
 *
 * @param {string} [path=process.cwd()] The path to the directory to check. If not provided, defaults to the current working directory.
 * @returns {Promise<PackageManager | null>} A promise that resolves to the type of package manager or `null` if no package manager is determined.
 */
export const defineManager = async (path = process.cwd()): Promise<PackageManager | null> => {
  const cacheKey = `lockfile-${path}`;
  const cached = cache.get(cacheKey);
  if (cached && 'lockFileType' in cached) return cached.lockFileType;

  for (const [manager, fileName] of Object.entries(lockFiles)) {
    if (await isPathExists(resolve(path, fileName))) {
      cache.set(cacheKey, {
        lockFileType: manager as PackageManager,
      });
      return manager as PackageManager;
    }
  }

  cache.set(cacheKey, { lockFileType: null });
  return null;
};
