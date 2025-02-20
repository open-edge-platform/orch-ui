/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

const path = require("path");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
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
  plugins: [new DefinePlugin({ process: {}, "process.env": {} })],
  resolve: {
    extensions: [".tsx", ".ts", "..."],
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })],
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 8000,
  },
};
