import type { GlobalManagerData } from './define-global-managers.js';
import type { PackageManager } from './define-manager.js';

interface CacheGlobalInstalled {
  isGlobalInstalled: boolean;
}
interface CacheLockFileType {
  lockFileType: PackageManager | null;
}
interface CacheGlobalManagers {
  globalManagers: GlobalManagerData[] | null;
}

type Cache = CacheGlobalInstalled | CacheLockFileType | CacheGlobalManagers;

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
