/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

const REGEX = /^REACT_/i;
function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter((key) => REGEX.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    process: {
      env: Object.keys(raw).reduce((env, key) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      }, {}),
    },
  };

  return { raw, stringified };
}

module.exports = {
  getClientEnvironment,
};
