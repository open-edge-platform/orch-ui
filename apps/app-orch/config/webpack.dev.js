/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const openBrowser = require("react-dev-utils/openBrowser");
const webpack = require("webpack");

const mode = "development";
const devConfig = {
  mode: mode,
  output: {
    publicPath: process.env.REACT_LP_REMOTE_EP
      ? `http://${process.env.REACT_LP_REMOTE_EP}:8081/`
      : "http://localhost:8081/",
  },
  devServer: {
    port: 8081,
    historyApiFallback: true,
    open: false,
    ...(process.env.REACT_MA_HMR !== "true" && {
      watchFiles: ["src/**/*.tsx", "src/**/*.ts", "public/**/*"],
    }),
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
      const port = devServer.server.address().port;
      openBrowser(`http://localhost:${port}`);
    },
    hot: process.env.REACT_MA_HMR === "true" ? true : false,
  },
  optimization: {
    nodeEnv: mode,
    ...(process.env.REACT_MA_HMR === "true" && { runtimeChunk: "single" }),
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        ClusterOrchUI: `ClusterOrchUI@http://${
          process.env.REACT_LP_REMOTE_EP
            ? process.env.REACT_LP_REMOTE_EP
            : "localhost"
        }:8083/remoteEntry.js`,
        EimUI: `EimUI@http://${
          process.env.REACT_LP_REMOTE_EP
            ? process.env.REACT_LP_REMOTE_EP
            : "localhost"
        }:8082/remoteEntry.js`,
        Admin: `Admin@http://${
          process.env.REACT_LP_REMOTE_EP
            ? process.env.REACT_LP_REMOTE_EP
            : "localhost"
        }:8084/remoteEntry.js`,
      },
    }),
    ...(process.env.REACT_MA_HMR === "true"
      ? [new webpack.HotModuleReplacementPlugin()]
      : []),
  ],
};

module.exports = merge(commonConfig, devConfig);
