# SPDX-FileCopyrightText: (C) 2022 Intel Corporation
# SPDX-License-Identifier: LicenseRef-Intel

# Configure shell
SHELL = bash -e -o pipefail

# Variables
VERSION                 ?= $(shell cat ./VERSION)
DOCKER_TAG              ?= $(VERSION)
VERSION_DEV_SUFFIX      :=
DOCKER_REPOSITORY       ?= apps/app-orch
DOCKER_REGISTRY         ?=
DOCKER_FILE             = "$(shell pwd)/build/Dockerfile"
DOCKER_CONTEXT          = "$(shell pwd)/../.."

HELM_CHART = "$(shell pwd)/deploy/"
IS_RELEASED_VERSION=$(shell MY_STRING="${VERSION}"; MY_REGEX='^([0-9]+)\.([0-9]+)\.([0-9]+)$$'; if [[ $$MY_STRING =~ $$MY_REGEX ]]; then echo true; else echo false; fi)

help: # @HELP Print the command options
	@echo
	@printf "\033[0;31m    App Orchestration UI     \033[0m"
	@echo
	@grep -E '^.*: .* *# *@HELP' $(MAKEFILE_LIST) \
		| sort \
		| awk ' \
			BEGIN {FS = ": .* *# *@HELP"}; \
			{printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}; \
		'

# Public targets
all: help

node_modules: ## @HELP Install Dependencies
	npm ci

HELM_DIRS = ./deploy/

helm-lint: ## @HELP Check Helm Lint
	for d in $(HELM_DIRS); do \
		helm dep update $$d ; \
		helm lint $$d ; \
	done

helm-clean: helm-reset-annotations ## @HELP Clean helm chart build annotations.
	rm ./web-ui-app-orch-*.tgz || true

helm-annotate: ## @HELP Apply build context to chart annotations and appVersion
	yq eval -i '.annotations.revision = "${DOCKER_LABEL_VCS_REF}"' ${HELM_CHART}Chart.yaml
	yq eval -i '.annotations.created = "${DOCKER_LABEL_BUILD_DATE}"' ${HELM_CHART}Chart.yaml
	yq eval -i '.appVersion = "${DOCKER_TAG}"' ${HELM_CHART}Chart.yaml


helm_version = $(shell helm show chart ${HELM_CHART} | yq e '.appVersion' -)
helm-version-check: ## @HELP validates that the version is the same in the package.json and in the helm-chart
	@echo "Verify package.json VERSION (${VERSION}) matches Helm Chart App Version (${helm_version})"
	@bash -c "diff -u <(echo ${VERSION}) <(echo ${helm_version})"

helm-package: helm-clean helm-annotate ## @HELP Package helm charts.
	helm dep update ${HELM_CHART}
	helm package --app-version=${DOCKER_TAG} --version=${VERSION} --debug -u ${HELM_CHART}

dist: node_modules ## @HELP Builds the react application using webpack
	NODE_ENV=production npm run app:app-orch:build

docker-push: ## @HELP Push the docker image to a registry
	docker push ${DOCKER_REGISTRY}${DOCKER_REPOSITORY}:${DOCKER_TAG}

docker-build: dist ## @HELP Build the docker image
	docker build $(DOCKER_BUILD_ARGS) --platform=linux/x86_64 ${DOCKER_EXTRA_ARGS} \
	  -t ${DOCKER_REGISTRY}${DOCKER_REPOSITORY}:${DOCKER_TAG} \
	  -f ${DOCKER_FILE} ${DOCKER_CONTEXT}

KIND_CLUSTER_NAME="kind"
docker-kind-load: ## @HELP Loads the docker image on a kind cluster
	kind load docker-image ${DOCKER_REGISTRY}${DOCKER_REPOSITORY}:${DOCKER_TAG} --name=${KIND_CLUSTER_NAME}

apply-version-x:
	@echo "hi"

app-version: ## @HELP ensure that all version are the same across the different projects
	@echo "App Orchestration version is: ${VERSION}"