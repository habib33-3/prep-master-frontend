// Import necessary modules for ESLint configuration.
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import tseslint from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import regexpPlugin from "eslint-plugin-regexp";
import globals from "globals";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

// Define the current file and directory path based on the ES module context.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up compatibility for various recommended ESLint configurations.
const compat = new FlatCompat({
  baseDirectory: __dirname, // Base directory for compatibility settings.
  recommendedConfig: js.configs.recommended, // Use the recommended JS config.
  allConfig: js.configs.all, // Include all JS rules.
});

// Check if TypeScript should be type-checked based on the VSCode PID environment variable.
const shouldTypeCheck = typeof process.env.VSCODE_PID === "string";

// Define base ESLint rules to enforce code style and quality.
const baseRules = {
  "no-console": ["warn", { allow: ["warn", "error"] }], // Allow warnings and errors in console.
  "no-debugger": "error", // Disallow debugger statements.
  eqeqeq: ["error", "smart"], // Enforce strict equality (===) with smart handling.
  "prefer-const": "error", // Prefer const over let when variables are not reassigned.
  "no-var": "error", // Disallow the use of var.
  "jsx-a11y/anchor-is-valid": [
    "error",
    { aspects: ["invalidHref", "preferButton"] },
  ], // Accessibility rule for anchor tags.
  "@typescript-eslint/no-unused-vars": [
    "warn",
    { args: "none", ignoreRestSiblings: true, errorOnUnusedParameters: true },
  ], // Warn about unused variables.
  "@typescript-eslint/explicit-module-boundary-types": "off", // Turn off requirement for explicit module boundary types.
  "react/react-in-jsx-scope": "off", // Turn off react scope check in JSX (for Next.js support).
  "react/prop-types": "off", // Disable prop types check for React (TypeScript handles types).
  "react-hooks/rules-of-hooks": "error", // Enforce rules of React hooks.
  "react-hooks/exhaustive-deps": "warn", // Warn if dependencies of hooks are not correctly specified.
  "tailwindcss/no-custom-classname": "warn", // Warn if custom class names are used in Tailwind CSS.
  "tailwindcss/classnames-order": "off", // Turn off ordering of class names in Tailwind CSS.
  "tailwindcss/no-contradicting-classname": "error", // Disallow conflicting class names in Tailwind CSS.
  "@typescript-eslint/ban-ts-comment": "error", // Disallow usage of TypeScript `@ts-ignore` comments.
  "@typescript-eslint/no-empty-function": [
    "error",
    { allow: ["arrowFunctions"] },
  ], // Disallow empty functions, except arrow functions.
  "@typescript-eslint/consistent-type-imports": [
    "error",
    { prefer: "type-imports", disallowTypeAnnotations: false },
  ], // Enforce consistent type imports.
  "regexp/prefer-regexp-exec": "error", // Prefer `exec` over `match` in regular expressions.
  "regexp/prefer-regexp-test": "error", // Prefer `test` over `match` in regular expressions.
  "consistent-return": "error", // Enforce consistent return statements in functions.
  "arrow-body-style": ["error", "as-needed"], // Require arrow functions to have a concise body if possible.
  "no-else-return": "error", // Disallow return statements in `else` blocks.
  "no-shadow": "error", // Disallow variable declarations that shadow variables in outer scopes.
  "object-shorthand": "error", // Require shorthand syntax for object literals.
  "no-nested-ternary": "error", // Disallow nested ternary operators.
  "prefer-destructuring": ["error", { object: true, array: false }], // Prefer destructuring for objects, not arrays.
  "no-useless-rename": "error", // Disallow renaming variables to their own name.
  "prefer-template": "error", // Enforce the use of template literals instead of string concatenation.
  "no-implicit-globals": "error", // Disallow implicit global variable declarations.
  "no-new-wrappers": "error", // Disallow the use of wrapper objects for primitive types.
  "no-lone-blocks": "error", // Disallow unnecessary blocks.
  "prefer-regex-literals": "error", // Prefer using regular expression literals over `RegExp` constructor.
  "no-duplicate-imports": ["error"], // Disallow duplicate imports.
  "@typescript-eslint/consistent-type-definitions": ["error", "type"],
};

// Define file-specific ESLint configurations for JavaScript/TypeScript files.
const fileConfigs = {
  files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"], // Apply to all JavaScript and TypeScript files.
  languageOptions: {
    parser: tseslint.parser, // Use the TypeScript parser.
    parserOptions: {
      sourceType: "module", // Enable ECMAScript module support.
      ecmaVersion: 2022, // Set ECMAScript version to 2022.
      project: shouldTypeCheck
        ? ["./packages/*/tsconfig.json", "./packages/vite/src/*/tsconfig.json"]
        : undefined, // Enable type-checking if necessary.
    },
    globals: {
      process: "readonly", // Treat `process` as a global object.
      ...globals.es2021, // Include ES2021 globals.
      ...globals.node, // Include Node.js globals.
      browser: true, // Allow browser globals.
      es2022: true, // Enable ES2022 globals.
      node: true, // Enable Node.js globals.
    },
  },
  settings: {
    react: { version: "detect" }, // Automatically detect React version.
  },
  rules: baseRules, // Apply the base rules to all JavaScript/TypeScript files.
};

// Define rules for files inside `node_modules` and `dist` directories.
const nodeModulesAndDistRules = {
  files: ["node_modules/**", "dist/**"], // Apply to files in `node_modules` and `dist` directories.
  rules: {
    "no-console": "off", // Allow console statements in node_modules/dist.
    "no-debugger": "off", // Allow debugger statements.
    eqeqeq: "off", // Turn off strict equality check.
    "prefer-const": "off", // Allow `let` and `var`.
    "no-var": "off", // Allow `var`.
    "jsx-a11y/anchor-is-valid": "off", // Disable accessibility rules for anchor tags.
    "@typescript-eslint/no-unused-vars": "off", // Disable unused variable warnings.
    "@typescript-eslint/explicit-module-boundary-types": "off", // Disable explicit module boundary types requirement.
    "react/react-in-jsx-scope": "off", // Disable React scope check in JSX.
    "react/prop-types": "off", // Disable prop types check for React.
    "react-hooks/rules-of-hooks": "off", // Disable React hooks rules.
    "react-hooks/exhaustive-deps": "off", // Disable React hooks exhaustive dependencies rule.
    "tailwindcss/no-custom-classname": "off", // Disable Tailwind CSS custom class name check.
    "tailwindcss/classnames-order": "off", // Disable Tailwind CSS class name ordering check.
    "tailwindcss/no-contradicting-classname": "off", // Disable contradictory class name check.
    "@typescript-eslint/ban-ts-comment": "off", // Allow TypeScript `@ts-ignore` comments.
    "@typescript-eslint/no-empty-function": "off", // Allow empty functions.
    "@typescript-eslint/consistent-type-imports": "off", // Disable consistent type imports rule.
    "regexp/prefer-regexp-exec": "off", // Disable regular expression `exec` preference.
    "regexp/prefer-regexp-test": "off", // Disable regular expression `test` preference.
  },
};

// ESLint configuration combining all rules and plugins.
const eslintConfig = [
  ...compat.extends(
    "eslint:recommended", // Extend ESLint's recommended rules.
    "plugin:react/recommended", // Extend React's recommended rules.
    "plugin:react/jsx-runtime", // Use JSX runtime with React.
    "plugin:react-hooks/recommended", // Enforce React hooks rules.
    "plugin:jsx-a11y/recommended", // Enforce accessibility rules.
    "plugin:@typescript-eslint/recommended", // Extend TypeScript's recommended rules.
    "plugin:tailwindcss/recommended" // Extend Tailwind CSS's recommended rules.
  ),
  fileConfigs, // Apply base file rules.
  {
    plugins: {
      "@tanstack/query": pluginQuery,
      regexp: regexpPlugin,
      import: importPlugin, // Add ESLint import plugin.
    },
    rules: {
      "@tanstack/query/exhaustive-deps": "error", // Enforce exhaustive dependencies for query hooks.
      "import/order": "off", // Turn off ESLint's import sorting rule.
      // Additional custom ESLint rules can be added here.
    },
  },
  nodeModulesAndDistRules, // Apply specific rules for node_modules and dist directories.
  {
    ignores: ["node_modules", "dist", "**/*.json", "**/*.md"], // Ignore specific file types.
  },
];

export default eslintConfig;
