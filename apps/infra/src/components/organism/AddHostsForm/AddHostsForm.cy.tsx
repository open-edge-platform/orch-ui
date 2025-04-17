/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import AddHostsForm, { ErrorMessages } from "./AddHostsForm";
import AddHostsFormPom from "./AddHostsForm.pom";

const pom = new AddHostsFormPom();
describe("<AddHostsForm/>", () => {
  it("should render component", () => {
    cy.mount(<AddHostsForm />);
    pom.root.should("exist");
  });

  describe("happy path flow should", () => {
    beforeEach(() => {
      cy.mount(<AddHostsForm />);
    });
    it("not allow addition of rows when pristine", () => {
      pom.el.add.should("have.class", "spark-button-disabled");
    });

    it("require host name if empty", () => {
      pom.newHostNamePom.root.type("host-name").clear();
      pom.newHostNamePom
        .getInvalidEl()
        .should("be.visible")
        .contains("Is Required");
      pom.el.add.should("have.class", "spark-button-disabled");
    });

    it("require either serial number or uuid when clearing serial number", () => {
      pom.newSerialNumberPom.root.type("serial-number").clear();
      pom.newSerialNumberPom
        .getInvalidEl()
        .should("be.visible")
        .contains(ErrorMessages.RequireSerialNumber);
      pom.newUuidPom
        .getInvalidEl()
        .should("be.visible")
        .contains(ErrorMessages.RequireUuid);
      pom.el.add.should("have.class", "spark-button-disabled");
    });

    it("cannot put more than 20 characters for serial number", () => {
      pom.newSerialNumberPom.root.type("123456789012345678901");
      pom.newSerialNumberPom.root
        .invoke("val")
        .should("equal", "12345678901234567890");
    });

    it("cannot put more than 20 characters for host name", () => {
      pom.newHostNamePom.root.type("123456789012345678901");
      pom.newHostNamePom.root
        .invoke("val")
        .should("equal", "12345678901234567890");
    });

    it("error on incorrect serial number format", () => {
      pom.newSerialNumberPom.root.type("!34892$");
      pom.newSerialNumberPom
        .getInvalidEl()
        .should("be.visible")
        .contains(ErrorMessages.SerialNumberFormat);
      pom.el.add.should("have.class", "spark-button-disabled");
    });

    it("require either serial number or uuid when clearing uuid", () => {
      pom.newUuidPom.root.type("uuid").clear();
      pom.newUuidPom
        .getInvalidEl()
        .should("be.visible")
        .contains(ErrorMessages.RequireUuid);
      pom.newSerialNumberPom
        .getInvalidEl()
        .should("be.visible")
        .contains(ErrorMessages.RequireSerialNumber);
      pom.el.add.should("have.class", "spark-button-disabled");
    });

    it("error on invalid uuid format", () => {
      pom.newUuidPom.root.type("uuid");
      pom.newUuidPom
        .getInvalidEl()
        .should("be.visible")
        .contains(ErrorMessages.UuidFormat);
      pom.el.add.should("have.class", "spark-button-disabled");
    });

    it("adds new host rows when valid", () => {
      pom.newHostNamePom.root.type("new-host");
      pom.newSerialNumberPom.root.type("123456789");
      pom.newUuidPom.root.type("12345678-1234-1234-1234-123456123456");
      pom.el.add.click();
      pom.el.entryRow.should("be.visible");
    });
  });

  describe("after entering a new host should", () => {
    beforeEach(() => {
      cy.mount(<AddHostsForm />);
      pom.newHostNamePom.root.type("new-host");
      pom.newSerialNumberPom.root.type("123456789");
      pom.newUuidPom.root.type("12345678-1234-1234-1234-123456123456");
      pom.el.add.click();
    });

    it("error on duplicate host name", () => {
      pom.newHostNamePom.root.type("new-host");
      pom.newHostNamePom
        .getInvalidEl()
        .should("be.visible")
        .contains(ErrorMessages.HostNameExists);
      pom.el.add.should("have.class", "spark-button-disabled");
    });

    it("error on duplicate serial number", () => {
      pom.newSerialNumberPom.root.type("123456789");
      pom.newSerialNumberPom
        .getInvalidEl()
        .should("be.visible")
        .contains(ErrorMessages.SerialNumberExists);
      pom.el.add.should("have.class", "spark-button-disabled");
    });
  });
});
