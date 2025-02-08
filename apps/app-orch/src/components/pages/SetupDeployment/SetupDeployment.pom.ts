/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog, ecm, tm } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { Cy, CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  ClusterStore,
  packageFour,
  packageOne,
  packageOneExtension,
  packageThree,
  packageTwo,
  packageWithParameterTemplates,
} from "@orch-ui/utils";
import DeploymentProfileFormPom from "../../organisms/profiles/DeploymentProfileForm/DeploymentProfileForm.pom";
import NetworkInterconnectPom from "../../organisms/setup-deployments/NetworkInterconnect/NetworkInterconnect.pom";
import { ReviewPom } from "../../organisms/setup-deployments/Review/Review.pom";
import SelectClusterPom from "../../organisms/setup-deployments/SelectCluster/SelectCluster.pom";
import SelectDeploymentTypePom from "../../organisms/setup-deployments/SelectDeploymentType/SelectDeploymentType.pom";
import { SelectPackagePom } from "../../organisms/setup-deployments/SelectPackage/SelectPackage.pom";
import { SelectProfileTablePom } from "../../organisms/setup-deployments/SelectProfileTable/SelectProfileTable.pom";
import SetupMetadataPom from "../../organisms/setup-deployments/SetupMetadata/SetupMetadata.pom";

const cs = new ClusterStore();

const dataCySelectors = ["nextBtn", "stepper"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ProjectApiAliases = "getProjectNetworks" | "emptyProjectNetworks";

type DeploymentPackagesApiAliases =
  | "getDeploymentPackages"
  | "getDeploymentPackagesMocked"
  | "getDeploymentPackagesEmpty";

type DeploymentPackageApiAliases = "getDeploymentPackageSingleMocked";

type ApiAliases =
  | ProjectApiAliases
  | DeploymentPackagesApiAliases
  | DeploymentPackageApiAliases
  | "postDeployment"
  | "postDeploymentMocked"
  | "getClusters";

const project = defaultActiveProject.name;
const routeDeploymentPackages = `**/v3/projects/${project}/catalog/deployment_packages?**`;

const deploymentPackagesApis: CyApiDetails<
  DeploymentPackagesApiAliases,
  catalog.ListDeploymentPackagesResponse
> = {
  getDeploymentPackages: {
    route: routeDeploymentPackages,
    statusCode: 200,
  },
  getDeploymentPackagesMocked: {
    route: routeDeploymentPackages,
    statusCode: 200,
    response: {
      deploymentPackages: [
        packageOne,
        packageTwo,
        packageThree,
        packageFour,
        packageWithParameterTemplates,
        packageOneExtension,
      ],
      totalElements: 6,
    },
  },
  getDeploymentPackagesEmpty: {
    route: routeDeploymentPackages,
    statusCode: 200,
    response: {
      deploymentPackages: [],
      totalElements: 0,
    },
  },
};

const projectApis: CyApiDetails<
  ProjectApiAliases,
  tm.ListV1ProjectsProjectProjectNetworksApiResponse
> = {
  emptyProjectNetworks: {
    route: `**/v1/projects/${project}/networks`,
    statusCode: 200,
    response: [],
  },
  getProjectNetworks: {
    route: `**/v1/projects/${project}/networks`,
    statusCode: 200,
    response: [
      {
        name: "Network one",
        spec: {
          description: "first network",
        },
      },
      {
        name: "Network two",
        spec: {
          description: "second network",
        },
      },
      {
        name: "Network three",
        spec: {
          description: "third network",
        },
      },
    ],
  },
};

const deploymentPackageApis: CyApiDetails<
  DeploymentPackageApiAliases,
  catalog.GetDeploymentPackageResponse
> = {
  getDeploymentPackageSingleMocked: {
    route: `**/v3/projects/${project}/catalog/deployment_packages/**/versions/**`,
    statusCode: 200,
    response: {
      deploymentPackage: packageWithParameterTemplates,
    },
  },
};

const apis: CyApiDetails<ApiAliases> = {
  ...projectApis,
  ...deploymentPackagesApis,
  ...deploymentPackageApis,
  postDeploymentMocked: {
    route: "**/deployments",
    method: "POST",
    statusCode: 200,
    delay: 2000,
    response: {
      deploymentId: "generated-id",
    },
  },
  postDeployment: {
    route: "**/deployments",
    method: "POST",
    statusCode: 200,
  },
  getClusters: {
    route: "**/clusters*",
    statusCode: 200,
    response: {
      clusterInfoList: cs.list(),
    } as ecm.GetV1ProjectsByProjectNameClustersApiResponse,
  },
};

class SetupDeploymentPom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  public tableUtils: SiTablePom;
  selectPackage: SelectPackagePom;
  selectProfile: SelectProfileTablePom;
  OverrideProfileValues: DeploymentProfileFormPom;
  selectType: SelectDeploymentTypePom;
  selectCluster: SelectClusterPom;
  metadataPom: SetupMetadataPom;
  reviewPom: ReviewPom;
  networkInterconnect: NetworkInterconnectPom;

  constructor(public rootCy: string = "setupDeployment") {
    super(rootCy, [...dataCySelectors], apis);
    this.table = new TablePom("table");
    this.tableUtils = new SiTablePom("table");
    this.selectPackage = new SelectPackagePom();
    this.selectProfile = new SelectProfileTablePom();
    this.OverrideProfileValues = new DeploymentProfileFormPom();
    this.selectType = new SelectDeploymentTypePom();
    this.selectCluster = new SelectClusterPom();
    this.metadataPom = new SetupMetadataPom();
    this.reviewPom = new ReviewPom("review");
    this.networkInterconnect = new NetworkInterconnectPom();
  }

  // TODO: Below `code block` can be removed as it is only used in a e2e test
  public getRowBySearchTerms(terms: string[], onRowFound: (row: Cy) => void) {
    const rows = this.table.getRows();
    let matchingRow;
    let result;
    rows.then(($el: JQuery<HTMLElement>) => {
      if (!$el) return;
      for (let i = 0; i < $el.length; i++) {
        //going through rows
        const text = $el[i].innerText;
        matchingRow = $el[i];
        for (const index in terms) {
          if (!text.includes(terms[index])) {
            matchingRow = null;
            break;
          }
        }
        if (matchingRow !== null) {
          result = cy.wrap($el[i]);
          onRowFound(result);
        }
      }
    });
  }
  public selectPackageByNameVersion(name: string, version: string) {
    this.getRowBySearchTerms([name, version], (row: Cy) => {
      row.find("input").click();
    });
  }
  // `code block` ends

  public enterNewPackageInformation(
    name: string,
    metadata: { key: string; value: string }[],
  ) {
    const { metadataFormPom: form } = this.metadataPom;
    this.metadataPom.el.deploymentNameField.type(name);
    for (let i = 0; i < metadata.length; i++) {
      form.getNewEntryInput("Key").type(metadata[i].key);
      form.getNewEntryInput("Value").type(metadata[i].value);
      form.el.add.click();
      /* eslint-disable cypress/no-unnecessary-waiting */
      cy.wait(200); //need to wait for component to render new entry input
    }
  }

  public getDeploymentPackageResponse() {
    return CyPom.isResponseMocked
      ? this.api.getDeploymentPackagesMocked
      : this.api.getDeploymentPackages;
  }

  public getDeploymentResponse() {
    return CyPom.isResponseMocked
      ? this.api.postDeploymentMocked
      : this.api.postDeployment;
  }
}

export default SetupDeploymentPom;
