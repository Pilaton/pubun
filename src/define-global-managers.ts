import { cache } from './cache.js';
import { type PackageManager, lockFiles } from './define-manager.js';
import cleanNulls from './utils/clean-nulls.js';
import getVersion from './version.js';

export interface IGlobalManagerData {
  manager: PackageManager;
  version: string;
}

/**
 * Checks whether a specified package manager is installed globally.
 * This function attempts to fetch the version of the given package manager to determine its installation status.
 * The result of this check is cached to optimize future calls for the same package manager.
 *
 * @param {PackageManager} manager - The package manager to check for global installation.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the package manager is installed globally, or `false` otherwise.
 */
const checkGlobalInstallation = async (manager: PackageManager): Promise<boolean> => {
  const cacheKey = `globalInstall-${manager}`;
  const cached = cache.get(cacheKey);

  if (cached && 'isGlobalInstalled' in cached) return cached.isGlobalInstalled;

  try {
    const version = await getVersion(manager);
    const isInstalled = /^\d+\.\d+\.\d+$/.test(version);
    cache.set(cacheKey, { isGlobalInstalled: isInstalled });
    return isInstalled;
  } catch {
    cache.set(cacheKey, { isGlobalInstalled: false });
    return false;
  }
};

/**
 * Retrieves data about all globally installed package managers.
 * This function checks each known package manager and determines if it is installed globally
 * by checking its version. The results are cached to optimize performance for subsequent calls.
 *
 * @returns {Promise<IGlobalManagerData[] | null>} A promise that resolves to an array of global manager data
 * including the name and version of each installed package manager, or `null` if none are installed.
 */
export const defineGlobalManagers = async (): Promise<IGlobalManagerData[] | null> => {
  const cacheKey = `globalManagers`;
  const cached = cache.get(cacheKey);
  if (cached && 'globalManagers' in cached) return cached.globalManagers;

  const managers = Object.keys(lockFiles) as PackageManager[];

  const globalManagers = await Promise.all(
    managers.map(async (manager): Promise<IGlobalManagerData | null> => {
      if (await checkGlobalInstallation(manager)) {
        return {
          manager,
          version: await getVersion(manager),
        };
      }
      return null;
    })
  );

  const result = cleanNulls<IGlobalManagerData>(globalManagers);

  cache.set(cacheKey, { globalManagers: result ?? null });
  return result;
};
