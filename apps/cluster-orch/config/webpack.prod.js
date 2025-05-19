/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { SubresourceIntegrityPlugin } = require("webpack");

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
    publicPath: "/mfe/cluster-orch/",
    clean: true,
  },
  optimization: {
    nodeEnv: mode,
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        EimUI: "EimUI@/mfe/infrastructure/remoteEntry.js",
        Admin: "Admin@/mfe/admin/remoteEntry.js",
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new SubresourceIntegrityPlugin({
      hashFuncNames: ["sha256"],
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
