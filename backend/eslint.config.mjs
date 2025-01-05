import { dirname, resolve } from "path";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: resolve(__dirname, "tsconfig.json"),
                tsconfigRootDir: __dirname,
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            // NestJS-specific improvements
            "@typescript-eslint/interface-name-prefix": "off", // Allow interfaces to have any name
            "@typescript-eslint/no-explicit-any": "warn", // Avoid using 'any', prefer stricter typing
            "@typescript-eslint/explicit-module-boundary-types": "off", // Enforce type annotations on functions returning values

            // Ensure type is used instead of interface
            "@typescript-eslint/consistent-type-definitions": ["error", "type"], // Enforce type instead of interface

            // Code consistency and best practices
            "no-console": "warn", // Warn against using console.log
            "no-unused-vars": "off", // Disable the base rule for unused variables
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ], // Adjusted for TypeScript
            "prefer-const": "error", // Prefer const over let where possible
            "no-var": "error", // Disallow var, prefer let/const
            "no-magic-numbers": [
                "warn",
                { ignore: [0, 1], ignoreArrayIndexes: true },
            ], // Warn against magic numbers, except for common cases like 0 and 1
            "@typescript-eslint/no-floating-promises": "error", // Ensure async functions are handled correctly

            "arrow-body-style": ["error", "as-needed"], // Enforce consistent arrow function style
            "no-duplicate-imports": "error", // Prevent duplicate imports

            // TypeScript-specific best practices
            "@typescript-eslint/ban-ts-comment": [
                "warn",
                {
                    "ts-ignore": "allow-with-description",
                    "ts-nocheck": "allow-with-description",
                },
            ], // Allow ts-ignore/ts-nocheck with a description
            "@typescript-eslint/consistent-type-imports": "error", // Prefer consistent imports for types
        },
        settings: {},
    },
    {
        ignores: [".eslintrc.mjs"],
    },
];
