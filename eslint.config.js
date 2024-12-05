import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist"], // Ensure ESLint ignores the 'dist' directory
  },
  {
    files: ["**/*.{js,jsx}"], // Apply settings to JavaScript and JSX files
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript version
      globals: globals.browser, // Include browser globals like window and document
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Enable JSX
        sourceType: "module", // Use ES modules
      },
    },
    settings: {
      react: { version: "detect" }, // Automatically detect React version
      "import/resolver": {
        alias: {
          map: [["@", "./src"]], // Map '@' to './src'
          extensions: [".js", ".jsx", ".ts", ".tsx"], // File extensions for the alias
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint recommended rules
      ...react.configs.recommended.rules, // React recommended rules
      ...react.configs["jsx-runtime"].rules, // Rules for the React JSX transform
      ...reactHooks.configs.recommended.rules, // React Hooks recommended rules
      "react/jsx-no-target-blank": "off", // Disable warnings for links missing rel="noopener noreferrer"
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }, // Warn for improper exports in Fast Refresh
      ],
      "react/prop-types": "off", // Disable prop-types rule
    },
  },
];
