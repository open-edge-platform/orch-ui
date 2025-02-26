# SPDX-FileCopyrightText: (C) 2022 Intel Corporation
# SPDX-License-Identifier: LicenseRef-Intel

include ../../common.mk

# Variables
PROJECT_NAME       			:= admin
VERSION                 ?= $(shell cat ./VERSION)
VERSION_DEV_SUFFIX      :=
DOCKER_VERSION 					?= $(shell git branch --show-current)
DOCKER_IMG_NAME    			:= $(PROJECT_NAME)
DOCKER_TAG              := $(DOCKER_REGISTRY)/$(DOCKER_REPOSITORY)/$(DOCKER_SUB_REPOSITORY)/$(DOCKER_IMG_NAME):$(VERSION)
DOCKER_TAG_BRANCH	    	:= $(DOCKER_REGISTRY)/$(DOCKER_REPOSITORY)/$(DOCKER_SUB_REPOSITORY)/$(DOCKER_IMG_NAME):$(DOCKER_VERSION)

DOCKER_FILE             = "$(shell pwd)/build/Dockerfile"
DOCKER_CONTEXT          = "$(shell pwd)/"

HELM_CHART 							= "$(shell pwd)/deploy/"
CHART_NAME              ?= orch-ui-admin

IS_RELEASED_VERSION=$(shell MY_STRING="${VERSION}"; MY_REGEX='^([0-9]+)\.([0-9]+)\.([0-9]+)$$'; if [[ $$MY_STRING =~ $$MY_REGEX ]]; then echo true; else echo false; fi)

admin_version = $(VERSION)

# Docker variables
DOCKER_EXTRA_ARGS           ?=
## Docker labels. Only set ref and commit date if committed
DOCKER_LABEL_VCS_URL        ?= $(shell git remote get-url $(shell git remote))
DOCKER_LABEL_VCS_REF        = $(shell git rev-parse HEAD)
DOCKER_LABEL_BUILD_DATE     ?= $(shell date -u "+%Y-%m-%dT%H:%M:%SZ")
DOCKER_LABEL_COMMIT_DATE    = $(shell git show -s --format=%cd --date=iso-strict HEAD)

## These labels need valid content or to be blank
LABEL_DESCRIPTION           ?= $(shell echo "Orch UI")
LABEL_LICENSE               ?= $(shell echo "LicenseRef-Intel")
LABEL_TITLE                 ?= ${DOCKER_REPOSITORY}
LABEL_URL                   ?= ${DOCKER_LABEL_VCS_URL}
LABEL_MAINTAINER            ?= $(shell echo "Orch UI Maintainers <orchui-maint@intel.com>")

DOCKER_LABEL_ARGS            ?= \
	--label org.opencontainers.image.source="${DOCKER_LABEL_VCS_URL}" \
	--label org.opencontainers.image.version="${VERSION}" \
	--label org.opencontainers.image.revision="${DOCKER_LABEL_VCS_REF}" \
	--label org.opencontainers.image.created="${DOCKER_LABEL_BUILD_DATE}" \
	--label org.opencontainers.image.description="${LABEL_DESCRIPTION}" \
	--label org.opencontainers.image.licenses="${LABEL_LICENSE}" \
	--label org.opencontainers.image.title="${LABEL_TITLE}" \
	--label org.opencontainers.image.url="${LABEL_URL}" \
	--label maintainer="${LABEL_MAINTAINER}"

# example DOCKER_EXTRA_ARGS="--progress=plain"
DOCKER_EXTRA_ARGS ?= ""

DOCKER_BUILD_ARGS ?= \
	${DOCKER_EXTRA_ARGS} \
	${DOCKER_LABEL_ARGS}

# Public targets
all: help

# Create the virtualenv with python tools installed
VENV_NAME = venv-lp
$(VENV_NAME): requirements.txt
	echo "Creating virtualenv in $@"
	python3 -m venv $@ ;\
	  . ./$@/bin/activate ; set -u ;\
	  python3 -m pip install --upgrade pip;\
	  python3 -m pip install -r requirements.txt
	echo "To enter virtualenv, run 'source $@/bin/activate'"


node_modules:
	npm ci

dist: node_modules ## @HELP Builds the react application using webpack
	NODE_ENV=production npm run app:admin:build

docker-build: common-docker-build

docker-push: common-docker-push

KIND_CLUSTER_NAME="kind"
docker-kind-load: ## @HELP Loads the docker image on a kind cluster
	kind load docker-image ${DOCKER_REGISTRY}${DOCKER_REPOSITORY}:${DOCKER_TAG} --name=${KIND_CLUSTER_NAME}

HELM_DIRS = ./deploy/

helm-lint:
	for d in $(HELM_DIRS); do \
		helm dep update $$d ; \
		helm lint $$d ; \
	done

helm-clean: helm-reset-annotations ## @HELP Clean helm chart build annotations.
	rm orch-ui-admin-*.tgz || true

helm-build: helm-clean helm-annotate ## @HELP Package helm charts.
	helm dep update ${HELM_CHART}
	helm package --app-version=${VERSION} --version=${VERSION} --debug -u ${HELM_CHART}

helm-push: common-helm-push

helm_version = $(shell helm show chart ${HELM_CHART} | yq e '.appVersion' -)
helm-version-check: ## @HELP validates that the version is the same in the package.json and in the helm-chart
	@echo "Verify VERSION (${VERSION}) matches Helm Chart App Version (${helm_version})"
	@bash -c "diff -u <(echo ${VERSION}) <(echo ${helm_version})"

helm-annotate: ## @HELP Apply build context to chart annotations and appVersion
	yq eval -i '.annotations.revision = "${DOCKER_LABEL_VCS_REF}"' ${HELM_CHART}Chart.yaml
	yq eval -i '.annotations.created = "${DOCKER_LABEL_BUILD_DATE}"' ${HELM_CHART}Chart.yaml
	yq eval -i '.appVersion = "${VERSION}"' ${HELM_CHART}Chart.yaml

helm-reset-annotations: ## @HELP Clear build context annotations and appVersion
	yq eval -i 'del(.annotations.revision)' ${HELM_CHART}Chart.yaml
	yq eval -i 'del(.annotations.created)' ${HELM_CHART}Chart.yaml
	yq eval -i '.appVersion = "${VERSION}"' ${HELM_CHART}Chart.yaml

apply-version: helm-clean ## @HELP apply version from the top level package.json to all sub-projectsare the same across the different projects
	@echo "Setting chart version to ${VERSION}"
	yq eval -i '.version = "${VERSION}"' ./deploy/Chart.yaml ;
	yq eval -i '.appVersion = "${VERSION}"' ./deploy/Chart.yaml ;

version-check: ## @HELP ensure that all version are the same across the different projects
	@echo "Checking that all versions match ${VERSION}"
	@echo "Administration version is: ${admin_version}"
	@bash -c "diff -u <(echo ${VERSION}) <(echo ${admin_version})"

check-valid-api:
	bash ./tools/api-versions.sh validate

license: $(VENV_NAME) ## @HELP Check licensing with the reuse tool
	. ./$</bin/activate ; set -u ;\
	reuse --version ;\
	reuse --root . lint

help: # @HELP Print the command options
	@echo
	@printf "\033[0;31m    Orch UI     \033[0m"
	@echo
	@grep -E '^.*: .* *# *@HELP' $(MAKEFILE_LIST) \
		| sort \
		| awk ' \
			BEGIN {FS = ": .* *# *@HELP"}; \
			{printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}; \
		'

lint:
	npm run app:admin:lint

test:
	npm run app:admin:cy:component

build:	dist
