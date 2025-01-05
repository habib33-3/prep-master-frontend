import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended"
  ),
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        node: true,
        browser: true,
        es2022: true,
      },
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "error",
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      "@next/next/no-html-link-for-pages": [
        "error",
        path.join(__dirname, "pages"),
      ],
      "@next/next/no-img-element": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "tailwindcss/no-custom-classname": "warn",
      "tailwindcss/classnames-order": "off",
      "tailwindcss/no-contradicting-classname": "error",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "smart"],
    },
  },
];

export default eslintConfig;
