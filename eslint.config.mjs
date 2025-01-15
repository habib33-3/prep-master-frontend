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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const shouldTypeCheck = typeof process.env.VSCODE_PID === "string";

const eslintConfig = [
  ...compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended"
  ),
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2022,
        project: shouldTypeCheck
          ? [
              "./packages/*/tsconfig.json",
              "./packages/vite/src/*/tsconfig.json",
            ]
          : undefined,
      },
      globals: {
        process: "readonly", 
        ...globals.es2021,
        ...globals.node,
        browser: true,
        es2022: true,
        node: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      eqeqeq: ["error", "smart"],
      "prefer-const": "error",
      "no-var": "error",
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "none",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "tailwindcss/no-custom-classname": "warn",
      "tailwindcss/classnames-order": "off",
      "tailwindcss/no-contradicting-classname": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-empty-function": [
        "error",
        { allow: ["arrowFunctions"] },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", disallowTypeAnnotations: false },
      ],
      "regexp/prefer-regexp-exec": "error",
      "regexp/prefer-regexp-test": "error",
      "consistent-return": "error",
      "arrow-body-style": ["error", "as-needed"],
      "no-else-return": "error",
      "no-shadow": "error",
      "object-shorthand": "error",
      "no-nested-ternary": "error",
      "prefer-destructuring": ["error", { object: true, array: false }],
      "no-useless-rename": "error",
      "prefer-template": "error",
      "no-implicit-globals": "error",
      "no-new-wrappers": "error",
      "no-lone-blocks": "error",
      "prefer-regex-literals": "error",
      "no-duplicate-imports": ["error"],
    },
  },
  {
    plugins: {
      "@tanstack/query": pluginQuery,
      regexp: regexpPlugin, // Add the plugin here
      import: importPlugin,
    },
    rules: {
      "@tanstack/query/exhaustive-deps": "error",
    },
  },
  // Override to exclude node_modules
  {
    files: ["node_modules/**", "dist/**"],
    rules: {
      // Disable all rules for node_modules and dist
      "no-console": "off",
      "no-debugger": "off",
      eqeqeq: "off",
      "prefer-const": "off",
      "no-var": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "off",
      "tailwindcss/no-contradicting-classname": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "regexp/prefer-regexp-exec": "off",
      "regexp/prefer-regexp-test": "off",
    },
  },
  // Add "ignores" instead of "ignorePatterns" to comply with ESLint flat config
  {
    ignores: ["node_modules/**", "dist/**"],
  },
];

export default eslintConfig;
