/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

const { defineConfig } = require("cypress");
const webpackCfg = require("./webpack.cypress");

const config = {
  hosts: { localhost: "127.0.0.1" },
  component: {
    viewportHeight: 1000,
    viewportWidth: 1000,
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: webpackCfg,
    },
    retries: {
      runMode: 3,
    },
    supportFolder: ".",
    indexHtmlFile: "./component-index.html",
    supportFile: "./component.tsx",
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
    specPattern: [
      "../../apps/root/src/**/*cy.tsx",
      "../../apps/root/src/**/*cy.{ts,tsx}",
      "../../apps/root/unit-tests.cy.ts",
    ],
  },
};
module.exports = defineConfig(config);
