#!/usr/bin/env bash

# Copyright 2018-2022 Open Networking Foundation
# Copyright 2023 Intel Corp.
# SPDX-License-Identifier: Apache-2.0

VERSIONFILE="VERSION" # file path to file containing version number
NEW_VERSION="" # version number found in $VERSIONFILE
TAG_VERSION="" # version that might have a leading v to work around go mod funkyness
TAG_PREFIX=${TAG_PREFIX:-""}

SEMVER_STRICT=${SEMVER_STRICT:-0} # require semver versions
DOCKERPARENT_STRICT=${DOCKERPARENT_STRICT:-1} # require semver versions on parent images in dockerfiles

RELEASE_VERSION=0
FAIL_VALIDATION=0

# when not running under Jenkins, use current dir as workspace
WORKSPACE=${WORKSPACE:-.}
BASEDIR=${BASEDIR:-}

# identify whether is traditional SemVer or CalVer
# note that CalVer is still a valid SemVer (eg: 24.03.1)
CALENDAR_VERSION=${CALENDAR_VERSION:-"false"}

# find the version string in the repo, read into NEW_VERSION
# Add additional places NEW_VERSION could be found to this function
# supports:
#  - bare VERSION files - used in C, Go, Python, and most languages
#  - package.json - used for Javascript/node/etc
#  - pom.xml - used for Java programs (Maven)
function read_version {
  echo "Reading version in $BASEDIR"
  if [ -f "$VERSIONFILE" ]
  then
    NEW_VERSION=$(head -n1 "$VERSIONFILE")

    # If this is a golang project, use funky v-prefixed versions
    if [ -f "Gopkg.toml" ] || [ -f "go.mod" ]
    then
      echo "go-based project found, using v-prefixed version for git tags: v${NEW_VERSION}"
      TAG_VERSION=v${NEW_VERSION}
    else
      TAG_VERSION=${NEW_VERSION}
    fi

  elif [ -f "package.json" ]
  then
    NEW_VERSION=$(python3 -c 'import json,sys;obj=json.load(sys.stdin); print (obj["version"])' < package.json)
    TAG_VERSION=$NEW_VERSION
    VERSIONFILE="package.json"

  elif [ -f "pom.xml" ]
  then
    NEW_VERSION=$(xmllint --xpath '/*[local-name()="project"]/*[local-name()="version"]/text()' pom.xml)
    # shellcheck disable=SC2034 # consumed by the dependent scripts
    TAG_VERSION=$NEW_VERSION
    VERSIONFILE="pom.xml"

  elif [ -f ".chartver.yaml" ] && [ -n "$(yq '.release // "" ' .chartver.yaml)" ]
  then
    VERSIONFILE="$(yq .release .chartver.yaml)/Chart.yaml"
    NEW_VERSION=$(yq .version "$VERSIONFILE")
    TAG_VERSION=$NEW_VERSION

  else
    echo "ERROR: No versioning file found!"
    FAIL_VALIDATION=1
  fi
}

# increment the supplied version string with an optional suffix
function get_next_version {
  local version=$1
  local new_suffix=${2:-}

  if [[ "$version" =~ ^v?([0-9]+)\.([0-9]+)\.([0-9]+)(\-?.*)$ ]]
  then
    major="${BASH_REMATCH[1]}"
    minor="${BASH_REMATCH[2]}"
    patch="${BASH_REMATCH[3]}"
    suffix="${BASH_REMATCH[4]}"

    # The "patch" value stays the same if the current version has a suffix and
    # the requested version has no suffix or the requested suffix is alphabetiacally
    # greater than the existing suffix. This will result in:
    #   0.1.0-dev -> 0.1.0 -> 0.1.1-dev -> 0.1.1-rc1 -> 0.1.1 -> 0.1.2
    if [ -z "$new_suffix" ]
    then
      # no new_suffix, if there is no suffix, increment patch otherwise leave it as is
      if [ -z "$suffix" ]
      then
        patch=$((patch+1))
      fi
    else
      # new_suffix exists, if not greater than suffix, increment patch otherwise leave it as is
      if [ -z "$suffix" ] || [[ ! "$new_suffix" > "$suffix" ]]
      then
        patch=$((patch+1))
      fi
    fi

    echo "$major.$minor.$patch$new_suffix"
    return
  fi

  # default to 0.1.0 with the supplied new_suffix if no release tag can be found
  echo "0.1.0$new_suffix"
}

# Evaluate if supplied version string is a release or non-release version
# return 0/success if it is a release version.
function is_release_version {
  local version=$1
  [[ "$version" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)$ ]] && return 0
  return 1
}

# check if the version is a released version
function check_if_releaseversion {
  # consider versions with RC as release versions
  if [[ "$NEW_VERSION" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)(-rc[0-9]+)$ ]]
  then
    echo "Version string '$NEW_VERSION' in '$VERSIONFILE' is a SemVer released version"
    RELEASE_VERSION=1
    return 0
  fi
  # consider versions with nightly tag (-n) as valid release versions
  if [[ "$NEW_VERSION" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)(-n[0-9]+)$ ]]
  then
    echo "Version string '$NEW_VERSION' in '$VERSIONFILE' is a SemVer released version"
    RELEASE_VERSION=1
    return 0
  fi
  if [[ "$NEW_VERSION" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]
  then
    echo "Version string '$NEW_VERSION' in '$VERSIONFILE' is a SemVer released version!"
    # shellcheck disable=SC2034 # consumed by the dependent scripts
    RELEASE_VERSION=1
  else
    if [ "$SEMVER_STRICT" -eq "1" ]
    then
      echo "Version string '$NEW_VERSION' in '$VERSIONFILE' is not a SemVer released version, SEMVER_STRICT enabled, failing!"
      # shellcheck disable=SC2034 # consumed by the dependent scripts
      FAIL_VALIDATION=1
    else
      echo "Version string '$NEW_VERSION' in '$VERSIONFILE' is not a SemVer released version, skipping."
    fi
  fi
}

# check there are no local changes
function check_no_local_changes {
  # Make sure there are no unwanted changes
  echo "Verify there are no local changes"
  diff -u <(echo -n) <(git diff)
}

# check if the version is already a tag in git
function is_git_tag_duplicated {
  for existing_tag in $(git tag)
  do
    if [ "$TAG_PREFIX$TAG_VERSION" = "$existing_tag" ]
    then
      echo "ERROR: Duplicate tag: $existing_tag"
      # shellcheck disable=SC2034 # consumed by the dependent scripts
      FAIL_VALIDATION=2
    fi
  done
}

# check if Dockerfiles have a released version as their parent
function dockerfile_parentcheck {
  if [ "$DOCKERPARENT_STRICT" -eq "0" ];
  then
    echo "DOCKERPARENT_STRICT is disabled - skipping parent checks"
  else
    while IFS= read -r -d '' dockerfile
    do
      echo "Checking dockerfile: '$dockerfile'"


      # create list of parent containers
      df_parents=()
      IFS=$'\n' # split on newlines
      while IFS='' read -r line; do df_paremnts+=("$line"); done < <(grep -i "^FROM" "$dockerfile")

      if [ -z "${df_parents:-""}" ]
      then
          return
      fi

      # check all parents in the Dockerfile
      for df_parent in "${df_parents[@]}"
      do

        df_pattern="[FfRrOoMm] +(--platform=[^ ]+ +)?([^@: ]+)(:([^: ]+)|@sha[^ ]+)?"
        if [[ "$df_parent" =~ $df_pattern ]]
        then

          p_image="${BASH_REMATCH[2]}"
          p_sha=${BASH_REMATCH[3]}
          p_version="${BASH_REMATCH[4]}"

          echo "IMAGE: '$p_image'"
          echo "VERSION: '$p_version'"
          echo "SHA: '$p_sha'"

          if [[ "${p_image}" == "scratch" ]]
          then
            echo "  OK: Using the versionless 'scratch' parent: '$df_parent'"
          elif [[ "${p_image}:${p_version}" == "gcr.io/distroless/static:nonroot" ]]
          then
            echo "  OK: Using static distroless image with nonroot: '${p_image}:${p_version}'"
          elif [[ "${p_version}" =~ ^([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]
          then
            echo "  OK: Parent '$p_image:$p_version' is a released SemVer version"
          elif [[ "${p_sha}" =~ ^@sha256:[0-9a-f]{64}.*$ ]]
          then
            # allow sha256 hashes to be used as version specifiers
            echo "  OK: Parent '$p_image$p_sha' is using a specific sha256 hash as a version"
          elif [[ "${p_version}" =~ ^.*([0-9]+)\.([0-9]+).*$ ]]
          then
            # handle non-SemVer versions that have a Major.Minor version specifier in the name
            #  'ubuntu:16.04'
            #  'postgres:10.3-alpine'
            #  'openjdk:8-jre-alpine3.8'
            echo "  OK: Parent '$p_image:$p_version' is using a non-SemVer, but sufficient, version"
          elif [[ -z "${p_version}" ]]
          then
            echo "  ERROR: Parent '$p_image' is NOT using a specific version"
            FAIL_VALIDATION=1
          else
            echo "  ERROR: Parent '$p_image:$p_version' is NOT using a specific version"
            # shellcheck disable=SC2034 # consumed by the dependent scripts
            FAIL_VALIDATION=1
          fi

        else
          echo "  ERROR: Couldn't find a parent image in $df_parent"
        fi

      done

    done  < <( find "${WORKSPACE}" -name 'Dockerfile*' ! -path "*/vendor/*" ! -name "*dockerignore" -print0 )
  fi
}

# parse semver into variable names provided
# inspired by: https://github.com/cloudflare/semver_bash/blob/master/semver.sh
# switched to use `eval` shell builtin rather than sed
function semverParse() {
    local version="$1"
    local prefix="${TAG_PREFIX}"

    # Remove the prefix if it exists
    if [[ -n "$prefix" ]]; then
        version="${version#"$prefix"}"
    fi

    # Remove the 'v' prefix if it exists
    version="${version#v}"

    # Parse the version
    eval "$2"="$(expr "$version" : '\([0-9]*\)\..*')"  # MAJOR
    eval "$3"="$(expr "$version" : '[0-9]*\.\([0-9]*\)\..*')"  # MINOR
    eval "$4"="$(expr "$version" : '[0-9]*\.[0-9]*\.\([0-9]*\)')"  # PATCH

    # unused:    eval "$5"="$(expr "$1" : '^[^[:digit:]]*[[:digit:]]*\.[[:digit:]]*\.[[:digit:]]*\(.*\)$' )"  #SPECIAL
}
