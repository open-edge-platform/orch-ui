/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from "cypress";
import { PluginOptions } from "cypress-terminal-report/src/installLogsPrinter.types";
const fs = require("fs");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");

export default defineConfig({
  viewportWidth: 1024,
  viewportHeight: 768,
  hosts: { localhost: "127.0.0.1" },
  screenshotsFolder: "cypress/screenshots",
  trashAssetsBeforeRuns: true,
  video: true,
  videosFolder: "cypress/videos",
  defaultCommandTimeout: 3000,
  pageLoadTimeout: 10000,
  reporter: "../node_modules/cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "e2e-report",
    reportFilename: "[datetime]-[name]_[status]-report",
    // timestamp: "", any format in this library is supported https://www.npmjs.com/package/dateformat
    showHooks: "always",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    debug: true,
    overwrite: false,
  },
  e2e: {
    // to target a different environment use: CYPRESS_BASE_URL=http://localhost:8080 cypress run
    baseUrl: "https://web-ui.orch-10-114-181-106.espdqa.infra-host.com",
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        webpackPreprocessor({
          webpackOptions: require("./webpack.config"),
          watchOptions: {
            devtool: false,
          },
        }),
      );

      // implement node event listeners here
      require("../node_modules/cypress-mochawesome-reporter/plugin")(on);
      // TODO can we customize the output by test name?
      const options: PluginOptions = {
        outputRoot: config.projectRoot + "/cypress/logs/",
        outputTarget: {
          "results.txt": "txt",
          "results.json": "json",
        },
      };

      require("cypress-terminal-report/src/installLogsPrinter")(on, options);

      on("after:spec", (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === "failed"),
          );
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video);
          }
        }
      });
    },
  },
  component: {
    viewportHeight: 1000,
    viewportWidth: 1000,
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
    supportFile: "apps/admin/cypress/support/component.tsx",
    specPattern: [
      "test.cy.ts",
      "../apps/admin/src/components/**/*.cy.tsx",
      "../apps/admin/unit-tests-sample.cy.ts",
      "../apps/infra/src/components/**/*.cy.tsx",
      "../library/components/**/*.cy.tsx",
      "../library/utils/**/*.cy.ts*",
      "unit-tests.cy.ts",
    ],
  },
});
