# Configure shell
SHELL = bash -e -o pipefail

.PHONY: help dist build

DOCKER_REGISTRY         ?= 080137407410.dkr.ecr.us-west-2.amazonaws.com
DOCKER_REPOSITORY       ?= edge-orch
DOCKER_SUB_REPOSITORY   ?= orch-ui

common-docker-build: dist ## @HELP Build the orch-ui docker image
	docker build $(DOCKER_BUILD_ARGS) --platform=linux/x86_64 ${DOCKER_EXTRA_ARGS} \
		-t $(DOCKER_IMG_NAME):$(DOCKER_VERSION) \
	  -f ${DOCKER_FILE} ${DOCKER_CONTEXT}

common-docker-push: ## @HELP Push the docker image to a registry
	aws ecr create-repository --region us-west-2 --repository-name  $(DOCKER_REPOSITORY)/$(DOCKER_SUB_REPOSITORY)/$(DOCKER_IMG_NAME) || true
	docker tag $(DOCKER_IMG_NAME):$(DOCKER_VERSION) $(DOCKER_TAG_BRANCH)
	docker tag $(DOCKER_IMG_NAME):$(DOCKER_VERSION) $(DOCKER_TAG)
	docker push $(DOCKER_TAG)
	docker push $(DOCKER_TAG_BRANCH)
