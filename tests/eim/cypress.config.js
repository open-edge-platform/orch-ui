/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
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
    supportFolder: ".",
    indexHtmlFile: "./component-index.html",
    supportFile: "./component.tsx",
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
    specPattern:[
      "../../apps/eim/src/**/*cy.tsx",
      "../../apps/eim/src/**/*cy.ts",
      "../../apps/eim/unit-tests.cy.ts",
    ],
  },
};
module.exports = defineConfig(config);
