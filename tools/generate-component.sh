#!/bin/bash

CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

LICENSE="/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
"
usage() { echo "Usage: /bin/bash $0 -p <path> -n <name>" 1>&2; exit 1; }

while getopts p:n: flag
do
    case "${flag}" in
        p) path=${OPTARG};;
        n) name=${OPTARG};;
    esac
done

if [ -z "${path}" ] || [ -z "${name}" ]; then
  echo -e "${RED}Missing Parameters${NC}"
  usage
fi

kebabName=$(echo "$name" | perl -pe 's/^([A-Z])/\L$1/g' | perl -pe 's/([A-Z])/-\L$1/g')
lowerName=$(echo "$name" | perl -pe 's/^([A-Z])/\L$1/g')

CY="
import ${name} from \"./${name}\";
import ${name}Pom from \"./${name}.pom\";

const pom = new ${name}Pom();
describe(\"<${name}/>\", () => {
  it(\"should render component\", () => {
    cy.mount(<${name} />);
    pom.root.should(\"exist\");
  });
});
"

POM="
import { CyPom } from \"@orch-ui/tests\";
import { dataCy } from \"./${name}\";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ${name}Pom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default ${name}Pom;"

TSX="
import \"./${name}.scss\";
export const dataCy = \"${lowerName}\";
interface ${name}Props {}
const ${name} = ({}: ${name}Props) => {
  const cy = { \"data-cy\": dataCy };
  return <div {...cy} className=\"${kebabName}\"></div>;
};

export default ${name};"

SCSS="
.${kebabName} {
    /*Add styles*/
}
"

mkdir -p "${path}/${name}"
echo "${LICENSE}${CY}" > "${path}/${name}/${name}.cy.tsx"
echo "${LICENSE}${POM}" > "${path}/${name}/${name}.pom.ts"
echo "${LICENSE}${TSX}" > "${path}/${name}/${name}.tsx"
echo "${LICENSE}${SCSS}" > "${path}/${name}/${name}.scss"
