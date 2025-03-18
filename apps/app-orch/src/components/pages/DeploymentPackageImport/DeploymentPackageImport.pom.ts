/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogUploadDeploymentPackageResponse } from "@orch-ui/apis";
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
      [`${path}test.yaml`, `${path}example.yaml`],
      { force: true },
    );
  }

  public dragDropFile(path: string) {
    this.el.uploadInput.selectFile(
      [`${path}test.yaml`, `${path}example.yaml`],
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

type ApiAliases = "dpImportFail" | "dpImportSuccess";

const caApiUrl = "**/upload";

export const apApis: CyApiDetails<
  ApiAliases,
  CatalogUploadDeploymentPackageResponse
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
};

class DeploymentPackageImportPom extends CyPom<Selectors, ApiAliases> {
  public uploadButtonEmpty: UploadButtonPom;
  public uploadButtonList: UploadButtonPom;
  constructor(public rootCy = "deploymentPackageImport") {
    super(rootCy, [...dataCySelectors], apApis);
    this.uploadButtonEmpty = new UploadButtonPom("uploadButtonEmpty");
    this.uploadButtonList = new UploadButtonPom("uploadButtonList");
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
}
export default DeploymentPackageImportPom;
