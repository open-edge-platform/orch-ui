/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ApiErrorPom, EmptyPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { AdminProject as Project, projectStore } from "@orch-ui/utils";
import { CreateEditProjectPom } from "../CreateEditProject/CreateEditProject.pom";
import DeleteProjectDialogPom from "../DeleteProjectDialog/DeleteProjectDialog.pom";
import { dataCy } from "./ProjectsTable";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type SuccessApiAliases =
  | "getProjects"
  | "getProjectsEmpty"
  | "getProjectsWithErrorStatus";
type ErrorApiAliases = "getProjectsError";
type ApiAliases = SuccessApiAliases | ErrorApiAliases;

const projectRoute = "**/projects?*";
const successEndpoints: CyApiDetails<SuccessApiAliases, Project[]> = {
  getProjects: {
    route: projectRoute,
    statusCode: 200,
    response: projectStore.list(),
  },
  getProjectsWithErrorStatus: {
    route: projectRoute,
    statusCode: 200,
    response: [
      {
        name: "project",
        status: {
          projectStatus: {
            message: "Error in Deleting Project",
            statusIndicator: "STATUS_INDICATION_ERROR",
          },
        },
      },
    ],
  },
  getProjectsEmpty: {
    route: projectRoute,
    statusCode: 200,
    response: [],
  },
};

const errorEndpoints: CyApiDetails<ErrorApiAliases> = {
  getProjectsError: {
    route: projectRoute,
    statusCode: 500,
    networkError: true,
  },
};

class ProjectsTablePom extends CyPom<Selectors, ApiAliases> {
  tablePom: TablePom;
  tableUtilPom: SiTablePom;
  emptyPom: EmptyPom;
  apiErrorPom: ApiErrorPom;

  createRenameProjectPom: CreateEditProjectPom;
  deleteProjectPom: DeleteProjectDialogPom;

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], {
      ...successEndpoints,
      ...errorEndpoints,
    });
    this.tablePom = new TablePom("projectsTableList");
    this.tableUtilPom = new SiTablePom();
    this.emptyPom = new EmptyPom();
    this.apiErrorPom = new ApiErrorPom();

    this.createRenameProjectPom = new CreateEditProjectPom();
    this.deleteProjectPom = new DeleteProjectDialogPom();
  }

  getPopupOptionsByRowIndex(row: number) {
    return this.tablePom.getRow(row).find("[data-cy='projectPopup']");
  }
  getPopupOptionsByProjectName(projectName: string) {
    return this.tableUtilPom
      .getRowBySearchText(projectName)
      .find("[data-cy='projectPopup']");
  }
  renameProjectPopup(index: number, name: string) {
    this.getPopupOptionsByRowIndex(index).click().as("popup");
    cy.get("@popup").contains("Rename").click();
    this.createRenameProjectPom.el.projectName.type(name);
  }
  deleteProjectPopup(index: number, name: string) {
    this.getPopupOptionsByRowIndex(index).click().as("popup");
    cy.get("@popup").contains("Delete").click();
    this.deleteProjectPom.el.projectName.type(name);
  }
}
export default ProjectsTablePom;
