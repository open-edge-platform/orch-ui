/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SidebarMain } from "./SidebarMain";
import { SidebarMainPom } from "./SidebarMain.pom";

const pom = new SidebarMainPom();
describe("<SidebarMain />", () => {
  it("should render", () => {
    cy.mount(<SidebarMain main={<p>main</p>} sidebar={<p>sidebar</p>} />);
    pom.root.should("exist");
    pom.el.main.contains("main");
    pom.el.sidebar.contains("sidebar");
  });
});
