/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

const DefinePlugin = require("webpack/lib/DefinePlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { dependencies } = require("../../../package.json");
const webpackUtils = require("../../../library/utils/webpack.util");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/, /\.cy\.tsx$/, /\.pom\.ts/],
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    uniqueName: "infra",
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
      name: "EimUI",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
        "./HostStatus": "./src/components/organism/hosts/DashboardHostStatus",
        "./UnallocatedHostsWheel":
          "./src/components/organism/hosts/DashboardUnallocatedHostsWheel",
        "./HostsTableRemote":
          "./src/components/organism/HostsTable/HostsTableRemote",
        "./SiteCellRemote": "./src/components/atom/SiteCell/SiteCellRemote",
        "./HostLink": "./src/components/atom/HostLink/HostLinkRemote",
        "./OSProfiles": "./src/components/pages/OSProfiles/OSProfilesRemote",
        "./AggregateHostStatus":
          "./src/components/atom/AggregateHostStatus/AggregateHostStatusRemote",
        "./RegionSiteTree":
          "./src/components/organism/hostConfigure/RegionSiteSelectTree/RegionSiteSelectTreeRemote.tsx",
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
    new DefinePlugin(webpackUtils.getClientEnvironment().stringified),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
