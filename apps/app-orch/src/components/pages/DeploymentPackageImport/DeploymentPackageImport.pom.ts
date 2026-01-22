/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog, CatalogUploadDeploymentPackageResponse } from "@orch-ui/apis";
import { ConfirmationDialogPom } from "@orch-ui/components";
import { Cy, CyApiDetails, CyPom } from "@orch-ui/tests";

// FIXME remove me once @orch-ui/components@0.0.17 is published
const ubDataCySelectors = ["uploadBtn", "uploadInput"] as const;
type UbSelectors = (typeof ubDataCySelectors)[number];
class UploadButtonPom extends CyPom<UbSelectors> {
  constructor(public rootCy: string) {
    super(rootCy, [...ubDataCySelectors]);
  }

  public uploadSingleFile(path: string) {
    this.el.uploadInput.selectFile(path, { force: true });
  }

  public uploadFile(path: string) {
    this.el.uploadInput.selectFile(
      [
        `${path}deployment_file_one.yaml`,
        `${path}deployment_file_two.yaml`,
        `${path}deployment_file_three.tar.gz`,
        `${path}deployment_file_four.tar.gz`,
      ],
      { force: true },
    );
  }

  public dragDropFile(path: string) {
    this.el.uploadInput.selectFile(
      [
        `${path}deployment_file_one.yaml`,
        `${path}deployment_file_two.yaml`,
        `${path}deployment_file_three.tar.gz`,
        `${path}deployment_file_four.tar.gz`,
      ],
      { force: true, action: "drag-drop" },
    );
  }
}
// END FIXME remove me once @orch-ui/components@0.0.17 is published

const dataCySelectors = [
  "title",
  "subTitle",
  "dragDropArea",
  "dpImportEmpty",
  "fileList",
  "importButton",
  "cancelButton",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "dpImportFail"
  | "dpImportSuccess"
  | "listDeploymentPackages"
  | "listDeploymentPackagesWithDuplicates";

const caApiUrl = "**/upload";
const listDpApiUrl = "**/deployment_packages*";

export const apApis: CyApiDetails<
  ApiAliases,
  | CatalogUploadDeploymentPackageResponse
  | catalog.CatalogServiceListDeploymentPackagesApiResponse
> = {
  dpImportFail: {
    route: caApiUrl,
    method: "POST",
    statusCode: 500,
    response: {
      responses: [
        {
          sessionId: "test",
          uploadNumber: 0,
          errorMessages: ["root cause of failure"],
        },
      ],
    },
  },
  dpImportSuccess: {
    route: caApiUrl,
    method: "POST",
    statusCode: 201,
    response: { responses: [] },
  },
  listDeploymentPackages: {
    route: listDpApiUrl,
    method: "GET",
    statusCode: 200,
    response: {
      deploymentPackages: [],
      totalElements: 0,
    },
  },
  listDeploymentPackagesWithDuplicates: {
    route: listDpApiUrl,
    method: "GET",
    statusCode: 200,
    response: {
      deploymentPackages: [
        {
          name: "test-package",
          version: "1.0.0",
          description: "Test package",
          createTime: "2024-01-01T00:00:00Z",
          applicationReferences: [],
          artifacts: [],
          extensions: [],
        },
      ],
      totalElements: 1,
    },
  },
};

class DeploymentPackageImportPom extends CyPom<Selectors, ApiAliases> {
  public uploadButtonEmpty: UploadButtonPom;
  public uploadButtonList: UploadButtonPom;
  public confirmationDialog: ConfirmationDialogPom;

  constructor(public rootCy = "deploymentPackageImport") {
    super(rootCy, [...dataCySelectors], apApis);
    this.uploadButtonEmpty = new UploadButtonPom("uploadButtonEmpty");
    this.uploadButtonList = new UploadButtonPom("uploadButtonList");
    this.confirmationDialog = new ConfirmationDialogPom("dialog");
  }

  public getFiles() {
    return this.el.fileList.find("li");
  }

  public getFileByIndex(i: number): Cy {
    return this.el.fileList.find(`li[data-key=${i}]`);
  }

  public deleteFileByIndex(i: number): Cy {
    return this.el.fileList.find(`[data-cy=deleteFile${i}]`).click();
  }

  public get messageBanner() {
    return this.root.find('[data-testid="message-banner"]');
  }

  public get confirmDialog() {
    return cy.get('[data-cy="confirmationDialog"]');
  }
}
export default DeploymentPackageImportPom;
