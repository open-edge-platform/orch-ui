/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

const { defineConfig } = require("cypress");
const webpackCfg = require("./webpack.cypress");

const config = {
  hosts: { localhost: "127.0.0.1" },
  component: {
    viewportHeight: 1000,
    viewportWidth: 1000,
    supportFolder: ".",
    indexHtmlFile: "./component-index.html",
    supportFile: "./component.tsx",
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: webpackCfg,
    },
    retries: {
      runMode: 3,
    },
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
    specPattern: ["../../library/**/*cy.tsx", "./unit-tests.cy.ts"],
  },
};

module.exports = defineConfig(config);
