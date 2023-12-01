/** @type import('dts-bundle-generator/config-schema').BundlerConfig */
module.exports = {
  entries: [
    {
      filePath: './src/index.ts',
      outFile: './build/index.d.ts',
      output: {
        sortNodes: true,
      },
    },
  ],
};
