# SPDX-FileCopyrightText: (C) 2025 Intel Corporation
# SPDX-License-Identifier: Apache-2.0

.PHONY: license

# Create the virtualenv with python tools installed
VENV_NAME = venv
$(VENV_NAME): requirements.txt
	echo "Creating virtualenv in $@"
	python3 -m venv $@ ;\
	  . ./$@/bin/activate ; set -u ;\
	  python3 -m pip install --upgrade pip;\
	  python3 -m pip install -r requirements.txt
	echo "To enter virtualenv, run 'source $@/bin/activate'"

license: $(VENV_NAME) ## @HELP Check licensing with the reuse tool
	. ./$</bin/activate ; set -u ;\
	reuse --version ;\
	reuse --root . lint
