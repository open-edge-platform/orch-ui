/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import * as utils from "@orch-ui/utils";
import { DownloadButton } from "./DownloadButton";
import { DownloadButtonPom } from "./DownloadButton.pom";

const pom = new DownloadButtonPom();
describe("<DownloadButton/>", () => {
  xit("should render component", () => {
    cy.stub(utils, "downloadFile").as("downloadFile");
    cy.mount(<DownloadButton data={"testing"} />);
    pom.root.should("exist").click();
    cy.get("@downloadFile").should("be.calledWith", "testing");
  });
});
