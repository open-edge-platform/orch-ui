/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const CopyPlugin = require("copy-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpackUtils = require("../../../library/utils/webpack.util");
const { dependencies, version } = require("../../../package.json");
const path = require("path");

const fs = require("fs");
fs.copyFileSync(
  "../root/public/runtime-config.js",
  "./public/runtime-config.js",
);

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
      // Webpack 5 image loading https://webpack.js.org/guides/asset-management/#loading-images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  output: {
    uniqueName: "root",
  },
  resolve: {
    //https://webpack.js.org/configuration/resolve/#resolveextensions
    // webpack by itself resolves js/json/wasm files but if you override it like
    // we do you need to specify "..." at the end to bring them back
    extensions: [".tsx", ".ts", ".js", "..."],
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })],
    // alias:{
    //   '@spark-design/react' : path.resolve(__dirname, '../../../library/@spark-design/react/lib/esm')
    // }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
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
    new CopyPlugin({
      patterns: [{ from: "./public/runtime-config.js", to: "." }],
    }),
  ],
};
