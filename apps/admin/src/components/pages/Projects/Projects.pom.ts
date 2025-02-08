/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ApiErrorPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { NoProjectsDialogPom } from "../../organisms/NoProjectsDialog/NoProjectsDialog.pom";
import ProjectsTablePom from "../../organisms/ProjectsTable/ProjectsTable.pom";
import { dataCy } from "./Projects";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ProjectsPom extends CyPom<Selectors> {
  apiErrorPom: ApiErrorPom;
  public projectsTablePom: ProjectsTablePom;
  public noProjectsDialogPom: NoProjectsDialogPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.projectsTablePom = new ProjectsTablePom();
    this.apiErrorPom = new ApiErrorPom();
    this.noProjectsDialogPom = new NoProjectsDialogPom();
  }
}
export default ProjectsPom;
