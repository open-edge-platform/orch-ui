# SPDX-FileCopyrightText: (C) 2025 Intel Corporation
# SPDX-License-Identifier: Apache-2.0

../node_modules:
	npm ci

build: ../node_modules
	npx webpack build --config webpack.config.js

lint:
	npx prettier --check .
	npx eslint .