/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { GenericStatus } from "../AggregatedStatuses/AggregatedStatuses";
import { DetailedStatuses, FieldLabels } from "./DetailedStatuses";
import DetailedStatusesPom from "./DetailedStatuses.pom";

// NOTE this is just an example of how to type the component,
// CO and EIM will define their own AggregatedStatuses so that defaultStatusName
// can be vaildated
type TestStatus = {
  statusOne: GenericStatus;
  statusTwo: GenericStatus;
};

const timestamp = new Date("2024-05-26").getTime();

const statusOne: GenericStatus = {
  indicator: "STATUS_INDICATION_IDLE",
  message: "statusOne messaage",
  timestamp,
};

type CustomStatus = GenericStatus & { expiration: string };
const statusTwo: CustomStatus = {
  indicator: "STATUS_INDICATION_IDLE",
  message: "statusTwo messaage",
  timestamp,
  expiration: "now",
};

const statusFields: FieldLabels<TestStatus> = {
  statusOne: {
    label: "Status One",
  },
  statusTwo: {
    label: "Status Two",
    formatter: (s: CustomStatus) => `${s.message} - ${s.expiration}`,
  },
};

const pom = new DetailedStatusesPom();
describe("<DetailedStatuses/>", () => {
  const statuses = {
    statusOne: statusOne,
    statusTwo: statusTwo,
  };

  beforeEach(() => {
    cy.mount(
      <DetailedStatuses<TestStatus>
        statusFields={statusFields}
        data={statuses}
      />,
    );
  });
  it("should render component", () => {
    pom.root.should("exist");
  });

  it("should render the proper labels", () => {
    pom.label("statusOne").should("contain.text", statusFields.statusOne.label);
    pom.label("statusTwo").should("contain.text", statusFields.statusTwo.label);
  });

  it("should render the unchanged message for statusOne", () => {
    pom.icon("statusOne").should("contain.text", statuses.statusOne.message);
  });

  it("should render the formatted label for statusTwo", () => {
    pom
      .icon("statusTwo")
      .should("contain.text", statusFields.statusTwo.formatter!(statusTwo));
  });

  it("should not render the Last Change column by default", () => {
    cyGet("last-change").should("not.exist");
  });

  it("should render the Last Change column on demand", () => {
    cy.mount(
      <DetailedStatuses<TestStatus>
        statusFields={statusFields}
        data={statuses}
        showTimestamp
      />,
    );
    cyGet("last-change").should("be.visible");
  });
});
