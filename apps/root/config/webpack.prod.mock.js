/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const { dependencies } = require("../../../package.json");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const prodConfig = {
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        AppOrchUI: `AppOrchUI@/mfe/applications/remoteEntry.js`,
        EimUI: `EimUI@/mfe/infrastructure/remoteEntry.js`,
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
