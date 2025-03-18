/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
    "plugin:no-unsanitized/DOM",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "linebreak-style": ["warn", "unix"],
    "no-const-assign": ["error"],
    "no-constant-condition": ["error"],
    "no-dupe-else-if": ["error"],
    "no-duplicate-imports": ["error"],
    "no-irregular-whitespace": ["error"],
    "no-mixed-spaces-and-tabs": ["error"],
    "no-self-assign": ["error", { props: true }],
    "no-self-compare": ["error"],
    "no-unexpected-multiline": ["error"],
    "no-unreachable": ["error"],
    "no-unreachable-loop": ["error"],
    "no-unused-expressions": [
      "error",
      { allowShortCircuit: false, allowTernary: false },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    quotes: ["error", "double", { avoidEscape: true }],
    semi: ["error", "always"],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unsanitized/method": "error",
    "no-unsanitized/property": "error",
    "no-unused-expressions": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "cypress/no-unnecessary-waiting": "warn",
    "no-only-tests/no-only-tests": "error",
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "cypress",
    "no-unsanitized",
    "prettier",
    "no-only-tests",
  ],
};
