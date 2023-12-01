import { execa } from 'execa';
import { type PackageManager } from './define-manager.js';

/**
 * Retrieves the version of a given package manager.
 * Executes the package manager command with '--version' flag and returns the output.
 *
 * @param {PackageManager} manager - The package manager whose version is to be fetched.
 * @returns {Promise<string>} A promise that resolves to the version string of the specified package manager.
 */
const getVersion = async (manager: PackageManager): Promise<string> => {
  const { stdout } = await execa(manager, ['--version']);
  return stdout;
};

export default getVersion;
