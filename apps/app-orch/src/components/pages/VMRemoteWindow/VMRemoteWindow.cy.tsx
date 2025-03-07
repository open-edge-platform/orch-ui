/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import VMRemoteWindow from "./VMRemoteWindow";

describe("<VMRemoteWindow />", () => {
  it("should render component", () => {
    cy.mount(<VMRemoteWindow />);
  });
});
