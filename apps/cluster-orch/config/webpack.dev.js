/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const openBrowser = require("react-dev-utils/openBrowser");

const mode = "development";
const devConfig = {
  mode: mode,
  devtool: "source-map",
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.dev.json" })],
  },
  output: {
    publicPath: `auto`,
  },
  devServer: {
    port: 8083,
    historyApiFallback: true,
    open: false,
    watchFiles: ["src/**/*.tsx", "src/**/*.ts", "public/**/*"],
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
    hot: process.env.REACT_MA_HMR === "true" ? true : false,
  },
  optimization: {
    nodeEnv: mode,
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        EimUI: `EimUI@http://localhost:8082/remoteEntry.js`,
        Admin: `Admin@http://localhost:8084/remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
