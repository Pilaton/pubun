import { join } from 'node:path';
import { beforeEach, describe, expect, test } from 'vitest';
import { cache, clearCache } from '../src/cache.js';
import type { GlobalManagerData } from '../src/define-global-managers.js';
import { defineGlobalManagers, defineManager } from '../src/index.js';

describe('Package manager definition tests', () => {
  beforeEach(clearCache);

  const basePath = join(process.cwd(), 'test', 'templates');
  const managers = ['bun', 'npm', 'pnpm', 'yarn', 'empty'];

  test.each(managers)('test %s', async (manager) => {
    const expected = manager === 'empty' ? null : manager;
    const result = await defineManager(join(basePath, manager));
    expect(result).toBe(expected);
  });

  test('test with empty path', async () => {
    const result = await defineManager();

    const validManagers = managers.filter((m) => m !== 'empty');
    expect(validManagers).toContain(result);
  });
});

describe('Define Manager tests', () => {
  beforeEach(clearCache);

  test('Define Manager test', async () => {
    const testPath = './testPath';
    const cacheKey = `lockfile-${testPath}`;
    const mockPackageManager = 'npm';

    cache.set(cacheKey, { lockFileType: mockPackageManager });
    const result = await defineManager(testPath);

    expect(result).toBe(mockPackageManager);
  });
});

describe('Defining global package managers test', () => {
  beforeEach(clearCache);

  test('returns an array of global managers or null', async () => {
    const result = await defineGlobalManagers();

    if (result === null) {
      expect(result).toBeNull();
    } else {
      expect(result.length).toBeGreaterThan(0);
      for (const managerData of result) {
        expect(managerData).toHaveProperty('manager');
        expect(['npm', 'yarn', 'pnpm', 'bun']).toContain(managerData.manager);
        expect(managerData).toHaveProperty('version');
      }
    }
  });

  test('returns cached global managers', async () => {
    const cachedGlobalManagers = [
      { manager: 'npm', version: '6.14.8' },
      { manager: 'yarn', version: '1.22.5' },
    ] satisfies GlobalManagerData[];

    cache.set('globalManagers', { globalManagers: cachedGlobalManagers });
    const result = await defineGlobalManagers();
    expect(result).toEqual(cachedGlobalManagers);
  });
});

describe('Cache tests', () => {
  const manager = 'pnpm';
  const cacheKey = `globalInstall-${manager}`;
  const globalInstalledCache = { isGlobalInstalled: true };

  beforeEach(clearCache);

  test('writing and reading from cache', () => {
    expect(cache.get(cacheKey)).toBeUndefined();
    cache.set(cacheKey, globalInstalledCache);

    const cached = cache.get(cacheKey);
    expect(cached).toEqual(globalInstalledCache);
  });

  test('clear cache', () => {
    expect(cache.get(cacheKey)).toBeUndefined();
    cache.set(cacheKey, globalInstalledCache);

    expect(cache.get(cacheKey)).toEqual(globalInstalledCache);

    clearCache();
    expect(cache.get(cacheKey)).toBeUndefined();
  });
});
