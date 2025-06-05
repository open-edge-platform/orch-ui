/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mode = "production";
const prodConfig = {
  mode: mode,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /\.cy\.tsx$/, /\.pom\.ts/],
        use: ["ts-loader"],
      },
      {
        test: /.*\.pom.(ts|tsx)?$/,
        use: [{ loader: "ignore-loader" }],
      },
      {
        test: /.*\.cy.(ts|tsx)?$/,
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
    publicPath: "/mfe/applications/",
    clean: true,
  },
  optimization: {
    nodeEnv: mode,
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        ClusterOrchUI: `ClusterOrchUI@/mfe/cluster-orch/remoteEntry.js`,
        EimUI: `EimUI@/mfe/infrastructure/remoteEntry.js`,
        Admin: `Admin@/mfe/admin/remoteEntry.js`,
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
