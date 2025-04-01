/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentType, lazy, LazyExoticComponent } from "react";
import { BreadcrumbWrapper } from "./BreadcrumbWrapper";
import { BreadcrumbWrapperPom } from "./BreadcrumbWrapper.pom";

const pom = new BreadcrumbWrapperPom();

type RemoteComponent = LazyExoticComponent<ComponentType<any>> | null;
describe("<BreadcrumbWrapper/>", () => {
  const ChildComponent = () => <>Page Seen</>;

  const p1 = new Promise<{ default: ComponentType<any> }>((resolve) => {
    resolve({ default: ChildComponent });
  });
  const ChildComponentRemote: RemoteComponent = lazy(() => p1);

  it("should render component", () => {
    cy.mount(<BreadcrumbWrapper subComponent={ChildComponentRemote} />);
    pom.root.should("exist");
    pom.root.should("contain.text", "Page Seen");
  });
});
