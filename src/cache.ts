import { type IGlobalManagerData } from './define-global-managers.js';
import { type PackageManager } from './define-manager.js';

interface ICacheGlobalInstalled {
  isGlobalInstalled: boolean;
}
interface ICacheLockFileType {
  lockFileType: PackageManager | null;
}
interface ICacheGlobalManagers {
  globalManagers: IGlobalManagerData[] | null;
}

type Cache = ICacheGlobalInstalled | ICacheLockFileType | ICacheGlobalManagers;

// Cache initialization using a Map.
export const cache = new Map<string, Cache>();

/**
 * Clears the entire cache.
 * This function removes all cached data related to package manager checks.
 * Useful for resetting the state or during testing to ensure fresh data is fetched.
 */
export const clearCache = (): void => {
  cache.clear();
};
