# SPDX-FileCopyrightText: (C) 2025 Intel Corporation
# SPDX-License-Identifier: Apache-2.0

# Configure shell
SHELL = bash -e -o pipefail

.PHONY: help build

VERSION                     ?= $(shell cat ./VERSION)
GIT_BRANCH                  ?= $(shell git branch --show-current | sed -r 's/[\/]+/-/g')

DOCKER_REGISTRY             ?= 080137407410.dkr.ecr.us-west-2.amazonaws.com/edge-orch
DOCKER_REPOSITORY           ?= orch-ui
DOCKER_IMG_NAME             := $(PROJECT_NAME)
DOCKER_TAG                  := $(DOCKER_REGISTRY)/$(DOCKER_REPOSITORY)/$(DOCKER_IMG_NAME):$(VERSION)
DOCKER_TAG_BRANCH           := $(DOCKER_REGISTRY)/$(DOCKER_REPOSITORY)/$(DOCKER_IMG_NAME):$(GIT_BRANCH)
DOCKER_CONTEXT              := "$(shell pwd)/"
DOCKER_FILE                 := "$(shell pwd)/build/Dockerfile"

## Docker labels. Only set ref and commit date if committed
DOCKER_LABEL_VCS_URL        ?= $(shell git remote get-url $(shell git remote))
DOCKER_LABEL_VCS_REF        := $(shell git rev-parse HEAD)
DOCKER_LABEL_BUILD_DATE     ?= $(shell date -u "+%Y-%m-%dT%H:%M:%SZ")
DOCKER_LABEL_COMMIT_DATE    := $(shell git show -s --format=%cd --date=iso-strict HEAD)

HELM_CHART_PREFIX           ?= charts
HELM_CHART_PATH             := "$(shell pwd)/deploy/"

HELM_CHART_NAME             := orch-ui-$(PROJECT_NAME)
HELM_DIRS                   := ./deploy/

## These labels need valid content or to be blank
LABEL_DESCRIPTION           := $(shell echo "Orch UI")
LABEL_LICENSE               ?= $(shell echo "Apache-2.0")
LABEL_TITLE                 ?= ${DOCKER_REPOSITORY}
LABEL_URL                   ?= ${DOCKER_LABEL_VCS_URL}
LABEL_MAINTAINER            ?= $(shell echo "Orch UI Maintainers <orchui-maint@intel.com>")

DOCKER_LABEL_ARGS         ?= \
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
DOCKER_EXTRA_ARGS ?=

DOCKER_BUILD_ARGS ?= \
	${DOCKER_EXTRA_ARGS} \
	${DOCKER_LABEL_ARGS}

# Public targets
all: help

../../node_modules: ## @HELP Install the node modules
	npm ci

build: ../../node_modules ## @HELP Builds the react application using webpack
	NODE_ENV=production npm run app:$(PROJECT_NAME):build

docker-build: build ## @HELP Build the docker image
	cp -r ../../library/nginxCommon .

	docker build $(DOCKER_BUILD_ARGS) --platform=linux/x86_64 ${DOCKER_EXTRA_ARGS} \
		-t $(DOCKER_TAG) \
		-f ${DOCKER_FILE} ${DOCKER_CONTEXT}

docker-push: ## @HELP Push the docker image to a registry
	aws ecr create-repository --region us-west-2 --repository-name edge-orch/$(DOCKER_REPOSITORY)/$(DOCKER_IMG_NAME) || true
	docker push $(DOCKER_TAG)
	# NOTE do we need to push with the branch name?
	# If we need we should modify CI so that we can run the docker push twice with different env vars
	# docker tag $(DOCKER_TAG) $(DOCKER_TAG_BRANCH)
	# docker push $(DOCKER_TAG_BRANCH)

KIND_CLUSTER_NAME="kind"
docker-kind-load: ## @HELP Loads the docker image on a kind cluster
	kind load docker-image ${DOCKER_REGISTRY}${DOCKER_REPOSITORY}:${DOCKER_TAG} --name=${KIND_CLUSTER_NAME}

helm-lint: ## @HELP Lint helm charts.
	for d in $(HELM_DIRS); do \
		helm dep update $$d ; \
		helm lint $$d ; \
	done

helm-clean: helm-reset-annotations ## @HELP Clean helm chart build annotations.
	rm $(HELM_CHART_NAME)-*.tgz || true

helm-build: helm-clean helm-annotate ## @HELP Package helm charts.
	helm dep update ${HELM_CHART_PATH}
	helm package --app-version=${VERSION} --version=${VERSION} --debug -u ${HELM_CHART_PATH}

helm_version = $(shell helm show chart ${HELM_CHART_PATH} | yq e '.appVersion' -)
helm-version-check: ## @HELP validates that the version is the same in the package.json and in the helm-chart
	@echo "Verify VERSION (${VERSION}) matches Helm Chart App Version (${helm_version})"
	@bash -c "diff -u <(echo ${VERSION}) <(echo ${helm_version})"

helm-annotate: ## @HELP Apply build context to chart annotations and appVersion
	yq eval -i '.annotations.revision = "${DOCKER_LABEL_VCS_REF}"' ${HELM_CHART_PATH}Chart.yaml
	yq eval -i '.annotations.created = "${DOCKER_LABEL_BUILD_DATE}"' ${HELM_CHART_PATH}Chart.yaml
	yq eval -i '.appVersion = "${VERSION}"' ${HELM_CHART_PATH}Chart.yaml

helm-reset-annotations: ## @HELP Clear build context annotations and appVersion
	yq eval -i 'del(.annotations.revision)' ${HELM_CHART_PATH}Chart.yaml
	yq eval -i 'del(.annotations.created)' ${HELM_CHART_PATH}Chart.yaml
	yq eval -i '.appVersion = "${VERSION}"' ${HELM_CHART_PATH}Chart.yaml

apply-version: helm-clean ## @HELP apply version from the top level package.json to all sub-projectsare the same across the different projects
	@echo "Setting chart version to ${VERSION}"
	yq eval -i '.version = "${VERSION}"' ./deploy/Chart.yaml ;
	yq eval -i '.appVersion = "${VERSION}"' ./deploy/Chart.yaml ;

helm-push: ## @HELP Push helm charts.
	aws ecr create-repository --region us-west-2 --repository-name edge-orch/$(DOCKER_REPOSITORY)/$(HELM_CHART_PREFIX)/$(HELM_CHART_NAME) || true
	helm push ${HELM_CHART_NAME}-${VERSION}.tgz oci://$(DOCKER_REGISTRY)/$(DOCKER_REPOSITORY)/$(HELM_CHART_PREFIX)

lint: ## @HELP Lint the code
	npm run app:$(PROJECT_NAME):lint

test: ## @HELP Run the tests
	npm run app:$(PROJECT_NAME):cy:component

check-valid-api: ## @HELP Check if the API versions are valid
	bash ./tools/api-versions.sh validate

help: # @HELP Print the command options
	@echo
	@printf "\033[0;31m    $(PROJECT_NAME) UI     \033[0m"
	@echo
	@grep -E '^.*: .* *# *@HELP' $(MAKEFILE_LIST) \
		| sort \
		| awk ' \
			BEGIN {FS = ": .* *# *@HELP"}; \
			{printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}; \
		'
