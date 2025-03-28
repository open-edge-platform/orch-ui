#!/usr/bin/env bash

# Copyright 2025 Intel Corp.
# SPDX-License-Identifier: Apache-2.0

CYAN='\033[0;36m'
YELLOW='\e[33m'
NC='\033[0m' # No Color
RED='\e[31m'

echo -e "\nList changes between head and the previous tagged version of all UI orch apps"

# Loop through all the apps
APPS=("admin" "app-orch" "cluster-orch" "infra" "root")

for APP in "${APPS[@]}"; do

   # Read the version number from the file
   OLD_VERSION=$(cat "apps/$APP/VERSION")

   # Split the version number into an array using '.' as the delimiter
   IFS='.-' read -r -a version_parts <<< "$OLD_VERSION"

   # Get the length of the array
   length=${#version_parts[@]}

   if [[ $length -eq 3 || $length -eq 4 ]]; then

      # Decrement the 3 decimal place of the version number
      version_parts[2]=$((version_parts[2] - 1))

      # Remove -dev if it is there.
      if [ $length -eq 4 ]; then
         unset 'version_parts[-1]'
      fi

      # Join the array back into a version string
      prev_version=$(IFS='.'; echo "${version_parts[*]}")


      # Display logs that have changed since previous version
      echo -e "\n${CYAN}Comparing ${YELLOW}$APP${CYAN} Head to Previous Version : $prev_version${NC}"
      git log --pretty=oneline "apps/$APP/$prev_version"...HEAD -- apps/$APP/ |  awk '{$1=""}1' | awk '{$1=$1}1' | sort | uniq 
   else
      echo -e "\n${RED}ERROR: ${YELLOW}$APP${RED} has an invalid format${NC}"
   fi

done


