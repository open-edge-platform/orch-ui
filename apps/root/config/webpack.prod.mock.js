/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod");

const mockConfig = {
  mode: "development",
};

module.exports = merge(prodConfig, mockConfig);
