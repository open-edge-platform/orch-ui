/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const mode = "production";
const prodConfig = {
  mode: mode,
  devtool: false,
  module: {
    rules: [
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
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Replace style-loader
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/mfe/admin/",
    clean: true,
  },
  optimization: {
    nodeEnv: mode,
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        AppOrchUI: "AppOrchUI@http://localhost:8081/remoteEntry.js",
        ClusterOrchUI: "ClusterOrchUI@/mfe/cluster-orch/remoteEntry.js",
        EimUI: "EimUI@/mfe/infrastructure/remoteEntry.js",
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
