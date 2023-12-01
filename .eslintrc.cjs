const requiredExtensions = ["plugin:unicorn/recommended", "prettier"];
const requiredPlugins = ["unicorn", "prettier"];
const mainRules = {
  "unicorn/prevent-abbreviations": [
    "error",
    {
      checkFilenames: false,
      allowList: {
        props: true,
      },
    },
  ],
  "unicorn/filename-case": [
    "error",
    {
      case: "kebabCase",
    },
  ],
  "unicorn/no-null": "off",
};

/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    es2023: true,
    node: true,
  },

  overrides: [
    {
      files: ["**/*.ts", "**/*.{test,spec,d}.ts"],
      parser: "@typescript-eslint/parser",
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "standard-with-typescript",
        ...requiredExtensions,
      ],
      plugins: ["@typescript-eslint", ...requiredPlugins],
      rules: {
        "@typescript-eslint/strict-boolean-expressions": "off",
        ...mainRules,
      },
    },
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      env: {
        node: true,
      },
      extends: ["eslint:recommended", "plugin:package-json/recommended"],
      files: ["package.json"],
      plugins: ["package-json"],
    },
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  ignorePatterns: ["*.md"],
};
