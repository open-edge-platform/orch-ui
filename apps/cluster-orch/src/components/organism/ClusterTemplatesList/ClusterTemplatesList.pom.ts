/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TablePom } from "@orch-ui/components";
import { CyApiDetails, cyGet, CyPom } from "@orch-ui/tests";
import {
  clusterTemplateOneV1,
  clusterTemplateOneV2,
  clusterTemplateTwoV1,
} from "@orch-ui/utils";
import { dataCy } from "./ClusterTemplatesList";

const dataCySelectors = ["empty", "uploadInput"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getAllTemplatesEmpty"
  | "getAllTemplates"
  | "getAllTemplatesError"
  | "postTemplate"
  | "setAsDefault"
  | "deleteTemplate";

const route = "**/v2/**/templates**";

const endpoints: CyApiDetails<ApiAliases> = {
  getAllTemplatesEmpty: {
    route: `${route}?default=false`,
    statusCode: 200,
    response: {
      defaultTemplateInfo: {
        name: "",
        version: "",
      },
      templateInfoList: null,
    },
  },
  getAllTemplates: {
    route: `${route}?default=false`,
    statusCode: 200,
    response: {
      defaultTemplateInfo: {
        name: clusterTemplateOneV2.name,
        version: clusterTemplateOneV2.version!,
      },
      templateInfoList: [
        clusterTemplateOneV1,
        clusterTemplateOneV2,
        clusterTemplateTwoV1,
      ],
    },
  },
  getAllTemplatesError: {
    route: `${route}?default=false`,
    statusCode: 500,
  },
  postTemplate: {
    method: "POST",
    route,
    statusCode: 200,
  },
  setAsDefault: {
    method: "PUT",
    route: `${route}/**/default`,
    statusCode: 200,
  },
  deleteTemplate: {
    method: "DELETE",
    route: `${route}/**/**`,
    statusCode: 200,
  },
};

class ClusterTemplatesListPom extends CyPom<Selectors, ApiAliases> {
  public tablePom = new TablePom();

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  public selectPopupOption(templateName: string, option: string) {
    this.tablePom.getRows().each((el) => {
      if (cy.wrap(el).contains(templateName)) {
        cy.wrap(el)
          .contains(templateName)
          .parent()
          .parent()
          .within(() => {
            cyGet("popup").click({ force: true });
            cy.contains(option).click();
          });
        return false;
      }
    });
  }
}
export default ClusterTemplatesListPom;
