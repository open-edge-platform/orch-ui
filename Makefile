# SPDX-FileCopyrightText: (C) 2025 Intel Corporation
# SPDX-License-Identifier: Apache-2.0
SHELL         := bash -e -o pipefail

.PHONY: license

default: help

# Create the virtualenv with python tools installed
VENV_NAME = venv
$(VENV_NAME): requirements.txt
	echo "Creating virtualenv in $@"
	python3 -m venv $@ ;\
	  . ./$@/bin/activate ; set -u ;\
	  python3 -m pip install --upgrade pip;\
	  python3 -m pip install -r requirements.txt
	echo "To enter virtualenv, run 'source $@/bin/activate'"

license: $(VENV_NAME) ## Check licensing with the reuse tool
	. ./$</bin/activate ; set -u ;\
	reuse --version ;\
	reuse --root . lint

PROJECTS :=  admin app-orch cluster-orch infra root

docker-build: ## build all docker containers
	for dir in $(PROJECTS); do $(MAKE) -C apps/$$dir $@; done

docker-push: ## push all docker containers
	for dir in $(PROJECTS); do $(MAKE) -C apps/$$dir $@; done

docker-list: ## list all docker containers
	@for dir in $(PROJECTS); do $(MAKE) -C apps/$$dir $@; done

CHARTS = apps/admin/deploy apps/app-orch/deploy apps/cluster-orch/deploy apps/infra/deploy apps/root/deploy

helm-build: ## build all helm charts
	for dir in $(PROJECTS); do $(MAKE) -C apps/$$dir $@; done

helm-push: ## push all helm charts
	for dir in $(PROJECTS); do $(MAKE) -C apps/$$dir $@; done

helm-clean: ## clean all helm charts
	for dir in $(PROJECTS); do $(MAKE) -C apps/$$dir $@; done

helm-list: ## List top-level helm charts, tag format, and versions in YAML format
	@echo "charts:"
	@for dir in $(PROJECTS); do \
		version=$$(cat "apps/$${dir}/deploy/Chart.yaml" | yq .version) ;\
		echo "  $${dir}:" ;\
		echo "    version: $${version}" ;\
	  	echo "    gitTagPrefix: 'apps/$${dir}/'" ;\
	  	echo "    outDir: 'apps/$${dir}/'" ;\
	done

### help target ###
help: ## Print help for each target
	@echo $(PROJECT_NAME) make targets
	@echo "Target               Makefile:Line    Description"
	@echo "-------------------- ---------------- -----------------------------------------"
	@grep -H -n '^[[:alnum:]_-]*:.* ##' $(MAKEFILE_LIST) \
    | sort -t ":" -k 3 \
    | awk 'BEGIN  {FS=":"}; {sub(".* ## ", "", $$4)}; {printf "%-20s %-16s %s\n", $$3, $$1 ":" $$2, $$4};'