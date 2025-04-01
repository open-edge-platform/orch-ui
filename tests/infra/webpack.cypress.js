/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");

const mode = "development";
module.exports = {
  mode: mode,
  cache: {
    type: "filesystem", // Use filesystem caching
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: ["@jsdevtools/coverage-istanbul-loader", "ts-loader"],
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
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "../../apps/infra/public/runtime-config.js", to: "." },
      ],
    }),
    new DefinePlugin({ process: {}, "process.env": {} }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", "..."],
    alias: {
      //TEMP: need this so that @spark-design's react version is not picked up
      react: path.resolve(__dirname, "../../node_modules/react"),
    },
    plugins: [new TsconfigPathsPlugin({ configFile: "../tsconfig.json" })],
  },
  devServer: {
    historyApiFallback: true,
    port: 8000,
  },
};
