import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["dist/**/*", "node_modules/**/*", "*.d.ts"],
    languageOptions: {
      parser: typescriptParser, // Use the default export of the parser module
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": typescript,
    },
    rules: {
      "react/jsx-no-target-blank": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off", // Desactiva la regla básica de ESLint
      "@typescript-eslint/no-unused-vars": ["error"], // Ensure this rule is correct
    },
  },
];
