import { access } from 'node:fs/promises';

/**
 * Asynchronously checks if a given path exists in the file system.
 * This function tries to access the path and resolves to `true` if the path exists, or `false` if it does not exist.
 *
 * @param {string} path - The file or directory path to check for existence.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the path exists, or `false` if it does not exist.
 */
const isPathExists = async (path: string): Promise<boolean> =>
  await access(path)
    .then(() => true)
    .catch(() => false);

export default isPathExists;
