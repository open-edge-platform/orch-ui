/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

const { merge } = require("webpack-merge");
const openBrowser = require("react-dev-utils/openBrowser");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");

const mode = "development";

const devConfig = {
  mode: mode,
  devtool: "source-map",
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
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.dev.json" })],
  },
  output: {
    publicPath: `http://localhost:${devServer.server.address().port}/`,
  },
  devServer: {
    open: false,
    ...(process.env.REACT_INFRA_HMR !== "true" && {
      watchFiles: ["src/**/*.tsx", "src/**/*.ts", "public/**/*"],
    }),
    port: 8082,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      if (!process.env.ROOT === "true") {
        const port = devServer.server.address().port;
        openBrowser(`http://localhost:${port}`);
      }
    },
    hot: process.env.REACT_INFRA_HMR === "true" ? true : false,
  },
  optimization: {
    nodeEnv: mode,
    // Imported modules are initialized for each runtime chunk separately. For HMR to work, there should be only one instance. Setting runtimeChunk to 'single' ensures this behavior.
    ...(process.env.REACT_INFRA_HMR === "true" && { runtimeChunk: "single" }),
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        ClusterOrchUI: `ClusterOrchUI@http://localhost:8083/remoteEntry.js`,
        Admin: `Admin@http://localhost:8084/remoteEntry.js`,
      },
    }),
    ...(process.env.REACT_INFRA_HMR === "true"
      ? [new webpack.HotModuleReplacementPlugin()]
      : []),
  ],
};

module.exports = merge(commonConfig, devConfig);
