/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

const DefinePlugin = require("webpack/lib/DefinePlugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./index.ts",
  devtool: false,
  ignoreWarnings: [
    {
      message: /export .* was not found in .*/,
    },
  ],
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // Translates CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
    ],
  },
  plugins: [new DefinePlugin({ process: {}, "process.env": { test: true } })],
  resolve: {
    extensions: [".tsx", ".ts", "..."],
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })],
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
};
