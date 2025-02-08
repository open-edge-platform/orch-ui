/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import ReceiversList from "./ReceiversList";
import ReceiversListPom from "./ReceiversList.pom";

const pom = new ReceiversListPom();
describe("<ReceiversList/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.receiversList]);
    cy.mount(<ReceiversList isOpen={true} />);
    pom.waitForApis();
    pom.root.should("exist");
    pom.table.root.contains("LastNameB, FirstNameB");
  });
});
