# SPDX-FileCopyrightText: (C) 2025 Intel Corporation
# SPDX-License-Identifier: Apache-2.0

../node_modules:
	npm ci

build: ../node_modules
	@for file in $(shell find cypress -name '*.cy.ts'); do \
		echo "Building $$file"; \
		npx webpack build --config webpack.config.js --stats --progress --entry ./$$file; \
	done

lint:
	npx prettier --check .
	npx eslint .