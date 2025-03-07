/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const mode = "production";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const prodConfig = {
  mode: mode,
  module: {
    rules: [
      {
        test: /.*\.pom.tsx?$/,
        use: [{ loader: "ignore-loader" }],
      },
      {
        test: /.*\.cy.tsx?$/,
        use: [{ loader: "ignore-loader" }],
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "webpack-remove-code-blocks",
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/mfe/infrastructure/",
    clean: true,
  },
  optimization: {
    nodeEnv: mode,
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        ClusterOrchUI: `ClusterOrchUI@/mfe/cluster-orch/remoteEntry.js`,
        Admin: `Admin@/mfe/admin/remoteEntry.js`,
      },
    }),
  ],
  resolve: {
    // https://stackoverflow.com/questions/50679031/why-are-these-tsconfig-paths-not-working
    // https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
    // for the aliased paths to work we need this plugin so wepack doesnt see them as erroneous
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })],
  },
};

module.exports = merge(commonConfig, prodConfig);
