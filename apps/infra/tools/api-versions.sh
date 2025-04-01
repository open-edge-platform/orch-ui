#!/bin/bash

#
# SPDX-FileCopyrightText: (C) 2023 Intel Corporation
# SPDX-License-Identifier: Apache-2.0
#

CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color
FILE="api_versions.md"

# This script should be executed anytime the APIs are updated to make it easy to track
# API compatibility

# Evaluate if supplied version string is a release or non-release version
# return 0/success if it is a release version.
function is_release_version {
  local version=$1
  [[ "$version" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)$ ]] && return 0
  return 1
}


usage() { echo "Usage: /bin/bash $0 generate|validate|annotate" 1>&2; exit 1; }

generate() {
  _FILE=$1
  echo -e "${CYAN}Generating API Versions in ${_FILE}${NC}"
  # get a list of API submodules
  APIS=$(cat .gitmodules | grep submodule | grep api | cut -c 13- | sed 's/.\{2\}$//')

  # convert the list to an array
  SAVEIFS=$IFS   # Save current IFS (Internal Field Separator)
  IFS=$'\n'      # Change IFS to newline char
  apis=($APIS) # split the `names` string into an array by the same name
  IFS=$SAVEIFS   # Restore original IFS

  # create or empty the file to store dependencies
  echo -e "# API Compatibility\n" > "$_FILE"

  echo "| Path      | Version | Commit ID |" >> "$_FILE"
  echo "| ----------- | ----------- | ----------- |" >> "$_FILE"

  # iterate
  for (( i=0; i<${#apis[@]}; i++ ))
  do
    api="${apis[$i]}"
    apiVersion=$(cat $api/VERSION)
    pushd $api > /dev/null
    apiCommit=$(git rev-parse HEAD)
    popd > /dev/null
    echo "| $api | $apiVersion | $apiCommit |" >> "$_FILE"
  done
}

validate() {
  # otherwise just check that the file is up to date
  echo -e "${CYAN}Validating API Versions${NC}"

  TMP="$(mktemp -u)"
  generate "$TMP"
  echo -e "${CYAN}Comparing API Versions in $FILE and $TMP${NC}"
  # if the two files don't match, throw an error
  diff -u "$TMP" "$FILE" || exit 1

  version=$(cat package.json | jq .version | tr -d '"')
  if is_release_version "$version"
  then
    echo -e "${CYAN}$version Is a released version, checking for -dev APIs${NC}"
    # it this is a released version, make sure we depend on released versions
    # NOTE for now we are skipping to check the 5G APIs as those are not strictly part of orch
    API=$(cat "$FILE" | grep -v "five-g")

    # grep reads from a file, so create a temporary one with the content we want to check for -dev versions
    TMP=$(mktemp)
    echo "$API" > "$TMP"

    echo -e "\n\nAPI: $TMP"
    if grep -q "dev" "$TMP"; then
        echo -e "${RED}Found -dev VERSION in API dependencies${NC}"
        cat "$TMP" | grep "dev"
        # clean up the tmp file
        rm "$TMP"
        exit 1
    fi

    # clean up the tmp file
    rm "$TMP"
  fi
}

annotate() {
  APIS=$(cat $FILE | grep "^| api" )
  # convert the list to an array
  _IFS=$IFS   # Save current IFS (Internal Field Separator)
  IFS=$'\n'      # Change IFS to newline char
  apis=($APIS) # split the `names` string into an array by the same name
  IFS=$_IFS   # Restore original IFS

  for (( i=0; i<${#apis[@]}; i++ ))
  do
    api="${apis[$i]}" # eg: | api/orch-infra.api | 0.7.1 | 576ed6a20358233c7370fe3e9201610acef25650 |
    # split the line at |
    _IFS=$IFS   # Save current IFS (Internal Field Separator)
    IFS='|'      # Change IFS to newline char
    pieces=($api) # split the `names` string into an array by the same name
    IFS=$_IFS   # Restore original IFS
    api_name="${pieces[1]// /}"
    # shellcheck disable=SC2001
    api_name=$(echo $api_name | sed 's/\//_/g' | sed 's/\./_/g' | sed 's/-/_/g' )
    api_version="${pieces[2]// /}"
    cmd="yq eval -i '.annotations.${api_name} = \"${api_version}\"' ./deploy//Chart.yaml"
    eval "$cmd"
  done
}

subcommand=$1
case $subcommand in
    "" | "-h" | "--help")
        usage
        ;;
    "generate")
      generate $FILE
      cat $FILE
      ;;
    "validate")
      validate
      ;;
    "annotate")
      annotate
      ;;
    *)
        usage
        ;;
esac


