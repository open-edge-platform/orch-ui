# SPDX-FileCopyrightText: (C) 2022 Intel Corporation
# SPDX-License-Identifier: LicenseRef-Intel

include ../../common.mk

# Variables
PROJECT_NAME       			:= app-orch
VERSION                 ?= $(shell cat ./VERSION)
VERSION_DEV_SUFFIX      :=
DOCKER_VERSION 					?= $(shell git branch --show-current)
DOCKER_IMG_NAME    			:= $(PROJECT_NAME)
DOCKER_TAG              := $(DOCKER_REGISTRY)/$(DOCKER_REPOSITORY)/$(DOCKER_SUB_REPOSITORY)/$(DOCKER_IMG_NAME):$(VERSION)
DOCKER_TAG_BRANCH	    	:= $(DOCKER_REGISTRY)/$(DOCKER_REPOSITORY)/$(DOCKER_SUB_REPOSITORY)/$(DOCKER_IMG_NAME):$(DOCKER_VERSION)

DOCKER_FILE             = "$(shell pwd)/build/Dockerfile"
DOCKER_CONTEXT          = "$(shell pwd)/"

HELM_CHART 							= "$(shell pwd)/deploy/"
CHART_NAME              ?= orch-ui-app-orch

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
	yq eval -i '.appVersion = "${VERSION}"' ${HELM_CHART}Chart.yaml

helm-reset-annotations: ## @HELP Clear build context annotations and appVersion
	yq eval -i 'del(.annotations.revision)' ${HELM_CHART}Chart.yaml
	yq eval -i 'del(.annotations.created)' ${HELM_CHART}Chart.yaml
	yq eval -i '.appVersion = "${VERSION}"' ${HELM_CHART}Chart.yaml

helm_version = $(shell helm show chart ${HELM_CHART} | yq e '.appVersion' -)
helm-version-check: ## @HELP validates that the version is the same in the package.json and in the helm-chart
	@echo "Verify package.json VERSION (${VERSION}) matches Helm Chart App Version (${helm_version})"
	@bash -c "diff -u <(echo ${VERSION}) <(echo ${helm_version})"

helm-build: helm-clean helm-annotate ## @HELP Package helm charts.
	helm dep update ${HELM_CHART}
	helm package --app-version=${VERSION} --version=${VERSION} --debug -u ${HELM_CHART}

helm-push: common-helm-push

dist: node_modules ## @HELP Builds the react application using webpack
	NODE_ENV=production npm run app:app-orch:build

docker-build: common-docker-build

docker-push: common-docker-push

KIND_CLUSTER_NAME="kind"
docker-kind-load: ## @HELP Loads the docker image on a kind cluster
	kind load docker-image ${DOCKER_REGISTRY}${DOCKER_REPOSITORY}:${DOCKER_TAG} --name=${KIND_CLUSTER_NAME}

apply-version: helm-clean ## @HELP apply version from the top level package.json to all sub-projectsare the same across the different projects
	@echo "Setting chart version to ${VERSION}"
	yq eval -i '.version = "${VERSION}"' ./deploy/Chart.yaml ;
	yq eval -i '.appVersion = "${VERSION}"' ./deploy/Chart.yaml ;

app-version: ## @HELP ensure that all version are the same across the different projects
	@echo "App Orchestration version is: ${VERSION}"

lint:
	npm run app:app-orch:lint

test:
	npm run app:app-orch:cy:component

build:	dist
