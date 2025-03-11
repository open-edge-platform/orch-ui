#!/usr/bin/env bash

# SPDX-FileCopyrightText: (C) 2023 Intel Corporation
# SPDX-License-Identifier: Apache-2.0

pushd apps/root; NODE_ENV=development REACT_LP_MOCK_API=true npx webpack --config=config/webpack.prod.mock.js; popd
pushd apps/app-orch; NODE_ENV=development REACT_LP_MOCK_API=true npx webpack --config=config/webpack.prod.js; popd
pushd apps/cluster-orch; NODE_ENV=development REACT_LP_MOCK_API=true npx webpack --config=config/webpack.prod.js; popd
pushd apps/eim; NODE_ENV=development REACT_LP_MOCK_API=true npx webpack --config=config/webpack.prod.js; popd
pushd apps/admin; NODE_ENV=development REACT_LP_MOCK_API=true npx webpack --config=config/webpack.prod.js; popd

mkdir -p dist dist/mfe/applications dist/mfe/cluster-orch dist/mfe/infrastructure dist/mfe/admin

cp -r apps/root/dist/* dist/
cp apps/root/public/mockServiceWorker.js dist
cp -r apps/app-orch/dist/* dist/mfe/applications
cp -r apps/cluster-orch/dist/* dist/mfe/cluster-orch
cp -r apps/eim/dist/* dist/mfe/infrastructure
cp -r apps/admin/dist/* dist/mfe/admin
