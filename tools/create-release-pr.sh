#!/usr/bin/env bash

# Copyright 2025 Intel Corp.
# SPDX-License-Identifier: Apache-2.0

CYAN='\033[0;36m'
YELLOW='\e[33m'
NC='\033[0m' # No Color
RED='\e[31m'
BOLD='\033[1m'


ask_yes_no() {
    local prompt="$1"
    local response

    while true; do
	echo -en "${YELLOW}${BOLD}${prompt} (Y/N):${NC} "
        read -r response
        case "$response" in
            [Yy]* ) return 0;;  # Yes
            [Nn]* ) return 1;;  # No
            * ) echo "Please answer y or n.";;
        esac
    done
}

git fetch --tags

does_tag_exist() {
  if git rev-parse "$1" >/dev/null 2>&1; then
    return 0;  # Tag exists
  else
    return 1;  # Tag does NOT exist
  fi
}


echo -e "\nCreate a release of the UI orch apps\n"

# Check if set-vesion.sh is executable as it's required for this script.
if ! [ -x "./tools/set-version.sh" ]; then
    echo -e "${YELLOW}WARNING: ./tools/set-version.sh is not executable.  Attempting to make it executable.${NC}"
    chmod +x ./tools/set-version.sh
    if [ $? -ne 0 ]; then
       echo -e "${RED}ERROR: Failed to make set-version.sh executable${NC}"
       exit 1
    else
       echo -e "${NC}Successful${NC}\n\n"
    fi
fi


if ask_yes_no "Do you want to create a git branch first"; then
    read -p "Enter Branch Name: " branch
    git checkout -b $branch
fi

active_branch=$(git rev-parse --abbrev-ref HEAD)
echo -e "\n${CYAN}Active Branch is:${NC} $active_branch"

# Loop through all the apps
APPS=("admin" "app-orch" "cluster-orch" "infra" "root")

echo "Release Notes" > temp_release_notes.txt

for APP in "${APPS[@]}"; do

   # Read the version number from the file
   OLD_VERSION=$(cat "apps/$APP/VERSION")

   # Split the version number into an array using '.' as the delimiter
   IFS='.-' read -r -a next_version_parts <<< "$OLD_VERSION"

   # Get the length of the array
   length=${#next_version_parts[@]}

   if [[ $length -eq 3 || $length -eq 4 ]]; then

      # Copy the version array to a previous version
      prev_version_parts=("${next_version_parts[@]}")

      # Check to see if the -dev is there (assumption if it's a 4 part version, the 4th part is the -dev)
      version_changed=1
      if [ $length -eq 4 ]; then
         # Decrement the 3 decimal place of the version number to create the previous
         prev_version_parts[2]=$((prev_version_parts[2] - 1))

         # Remove -dev part
         unset 'prev_version_parts[3]'
         unset 'next_version_parts[3]'
         echo -e ""
      else
         # Note -dev does not exist.  
         # Lets first determine if this version was released and they just forgot to create a -dev version
         error_version=$(IFS='.'; echo "${next_version_parts[*]}") 
         if does_tag_exist "apps/$APP/$error_version"; then
           # tag exists, so this was released, increment the version
           next_version_parts[2]=$((next_version_parts[2] + 1))
   	   IFS='.'; echo -e "\n${RED}WARNING: $error_version does not end in -dev incrementing next version to: ${next_version_parts[*]}${NC}"
         else 
           # tag does not exist, it was never released, so we can still use this version
           prev_version_parts[2]=$((prev_version_parts[2] - 1))
   	   IFS='.'; echo -e "\n${RED}WARNING: $error_version does not end in -dev, but version was never released (tagged), so keeping next version: ${next_version_parts[*]}${NC}"
           version_changed=0
         fi
      fi

      # Join the arrays into version strings
      prev_version=$(IFS='.'; echo "${prev_version_parts[*]}")
      next_version=$(IFS='.'; echo "${next_version_parts[*]}")

      # Just an extra check to verify that the new version does not already exist
      if does_tag_exist "apps/$APP/$next_version"; then
         # Tag exists, I am not going to try to figure out the next valid version, I am just going to display an error.
         echo -e "\n${RED}ERROR: $next_version tag already exists for $APP.  Please fix the VERSION file.  This will fail CI/CD.${NC}"
      fi

      # Display logs that have changed since previous version
      echo -e "${CYAN}Comparing ${YELLOW}$APP${CYAN} Head to Previous Version : $prev_version  Next Version: $next_version${NC}"
      git log --pretty=oneline "apps/$APP/$prev_version"...HEAD -- apps/$APP/ |  awk '{$1=""}1' | awk '{$1=$1}1' | sort | uniq 

      if ask_yes_no "Release $APP"; then
         # Add logs to release notes file
         echo -e "\n**$APP Version: $next_version**" >> temp_release_notes.txt
         git log --pretty=oneline "apps/$APP/$prev_version"...HEAD -- apps/$APP/ |  awk '{$1=""}1' | awk '{$1=$1}1' | sort | uniq >> temp_release_notes.txt

         # Update VERSION file
	 echo "next version: $next_version"
         ./tools/set-version.sh $APP "$next_version"
         if [ $? -ne 0 ]; then
            echo -e "${RED}set-version.sh failed to execute.${NC}"
            exit 1
         fi

         # Check if the Chart.yaml file changed, if the wrong version of yq was installed this won't be updated
         CHART_STATUS=$(git status --porcelain "apps/$APP/deploy/Chart.yaml" | xargs)
         echo "status: $CHART_STATUS"
         if [[ $CHART_STATUS != M* ]]; then
            if [ version_changed == 1 ]; then
	       echo -e "${RED}ERROR: apps/$APP/deploy/Chart.yaml was not modified and should have been. Check yq version.${NC}"
               exit 1
            else
	       echo -e "${RED}WARNING: apps/$APP/deploy/Chart.yaml was not modified, but the version is the same, so this is likely okay${NC}"
            fi
         fi

         # Add files to branch
         git add apps/$APP/VERSION
         git add apps/$APP/deploy/Chart.yaml
      fi

   else
      echo -e "\n${RED}ERROR: ${YELLOW}$APP${RED} has an invalid format${NC}"
   fi
done

# print horizontal line so it's a little more clear we are doing something different now
printf '\n\n%*s\n' "$(tput cols)" '' | tr ' ' '-'
echo -e "${BOLD}Git Actions${NC}"
printf '%*s\n' "$(tput cols)" '' | tr ' ' '-'

if ask_yes_no "Commit release to git"; then
   echo -e "${NC}"
   nano temp_release_notes.txt
   git commit -F temp_release_notes.txt
else
   echo -e "${NC}"
fi

echo -e "\n${CYAN}Release Notes:${NC}"
cat temp_release_notes.txt

if ask_yes_no "\nPush to origin"; then
   echo -e "${NC}"
   git push --set-upstream origin $active_branch
   echo -e "\n${CYAN}Click link to create pull request:${NC}"
   echo "https://github.com/open-edge-platform/orch-ui/pull/new/$active_branch"
else
   echo -e "${NC}"
fi




