/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

const DefinePlugin = require("webpack/lib/DefinePlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpackCommon = require("../../../library/utils/webpack.util");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const fs = require("fs");
const { dependencies, version } = require("../../../package.json");

fs.copyFileSync(
  "../root/public/runtime-config.js",
  "./public/runtime-config.js",
);

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["@jsdevtools/coverage-istanbul-loader", "ts-loader"],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      // Webpack 5 image loading https://webpack.js.org/guides/asset-management/#loading-images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    //https://webpack.js.org/configuration/resolve/#resolveextensions
    // webpack by itself resolves js/json/wasm files but if you override it like
    // we do you need to specify "..." at the end to bring them back
    extensions: [".tsx", ".ts", "..."],
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "ClusterOrchUI",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
        "./Dashboard": "./src/components/pages/Dashboard",
        "./ClusterDetail": "./src/components/pages/ClusterDetailExternal",
        "./ClusterManagement":
          "./src/components/pages/ClusterManagementExternal",
        "./ClusterEdit":
          "./src/components/pages/ClusterEdit/ClusterEditExternal",
        "./ClusterCreation":
          "./src/components/pages/ClusterCreation/ClusterCreationExternal",
        "./ClusterList": "./src/components/organism/ClusterListRemote",
        "./ClusterSummary":
          "./src/components/organism/ClusterSummary/ClusterSummaryExternal",
        "./DeauthorizeNodeConfirmationDialog":
          "./src/components/organism/DeauthorizeNodeConfirmationDialog/DeauthorizeNodeConfirmationDialog",
        "./AddToClusterDrawer":
          "./src/components/pages/AddToClusterDrawer/AddToClusterDrawer",
        "./ClusterTemplates":
          "./src/components/pages/ClusterTemplates/ClusterTemplates",
        "./ClusterTemplateDetails":
          "./src/components/pages/ClusterTemplateDetails/ClusterTemplateDetails",
      },
      shared: {
        "@spark-design/css": dependencies["@spark-design/css"],
        "@spark-design/react": { singleton: true },
        "@spark-design/tokens": { singleton: true },
        react: {
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
        "react-redux": {
          singleton: true,
          requiredVersion: dependencies["react-redux"],
        },
        "react-transition-group": {
          singleton: true,
          requiredVersion: dependencies["react-transition-group"],
        },
        redux: {
          singleton: true,
          requiredVersion: dependencies["redux"],
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: dependencies["react-router-dom"],
        },
        "react-hook-form": {
          singleton: true,
          requiredVersion: dependencies["react-hook-form"],
        },
      },
    }),
    new DefinePlugin(webpackCommon.getClientEnvironment().stringified),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "./public/runtime-config.js", to: "." }],
    }),
  ],
};
