import { clearCache } from './cache.js';
import { defineGlobalManagers } from './define-global-managers.js';
import { defineManager } from './define-manager.js';

export { clearCache } from './cache.js';
export { defineGlobalManagers } from './define-global-managers.js';
export { defineManager } from './define-manager.js';

/**
 * A pmjs object that integrates package manager functionality.
 */
const pmjs = {
  /** @see clearCache */
  clearCache,
  /** @see defineGlobalManagers */
  defineGlobalManagers,
  /** @see defineManager */
  defineManager,
};

export default pmjs;
