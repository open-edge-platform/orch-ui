/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import * as _ from "lodash";
import { Status } from "../StatusIcon/StatusIcon";
import {
  AggregatedStatuses,
  AggregatedStatusesMap,
  aggregateStatuses,
  GenericStatus,
} from "./AggregatedStatuses";
import { AggregatedStatusesPom } from "./AggregatedStatuses.pom";

const pom = new AggregatedStatusesPom();
const timestamp = new Date("2024-05-26").getTime();

const statusOne: GenericStatus = {
  indicator: "STATUS_INDICATION_IDLE",
  message: "statusOne message",
  timestamp,
};

const statusTwo: GenericStatus = {
  indicator: "STATUS_INDICATION_IDLE",
  message: "statusTwo message",
  timestamp,
};

// NOTE this is just an example of how to type the component,
// CO and EIM will define their own AggregatedStatuses so that defaultStatusName
// can be vaildated
type TestStatus = {
  statusOne: GenericStatus;
  statusTwo: GenericStatus;
};

describe("<AggregatedStatuses/>", () => {
  const statuses = {
    statusOne: statusOne,
    statusTwo: statusTwo,
  };
  it("should render 'Status message not found' if the defaultStatusName is not in statuses", () => {
    cy.mount(
      <AggregatedStatuses<AggregatedStatusesMap>
        statuses={statuses}
        defaultStatusName="foo"
      />,
    );
    pom.statusIconPom.root.should("contain.text", "Status message not found");
  });
  describe("when correctly configured", () => {
    describe("when all statuses are IDLE", () => {
      it("should display the default status message", () => {
        cy.mount(
          <AggregatedStatuses<TestStatus>
            statuses={statuses}
            defaultStatusName="statusTwo"
          />,
        );
        pom.statusIconPom.root.should("contain.text", statusTwo.message);
      });
    });
    describe("when all status are IDLE or UNSPECIFIED", () => {
      it("should display the default status message", () => {
        const withUnknown = {
          statusOne: _.merge(_.clone(statusOne), {
            indicator: "STATUS_INDICATION_UNSPECIFIED",
          }),
          statusTwo: _.merge(_.clone(statusTwo), {
            indicator: "STATUS_INDICATION_IDLE",
          }),
        };
        cy.mount(
          <AggregatedStatuses<TestStatus>
            statuses={withUnknown}
            defaultStatusName="statusTwo"
          />,
        );
        pom.statusIconPom.root.should("contain.text", statusTwo.message);
      });
    });
  });
  describe("when passing a custom inProgress message", () => {
    describe("when all statuses are IN_PROGRESS", () => {
      it("should display a the custom message", () => {
        const inProgress = {
          statusOne: _.merge(_.clone(statusOne), {
            indicator: "STATUS_INDICATION_IN_PROGRESS",
          }),
          statusTwo: _.merge(_.clone(statusTwo), {
            indicator: "STATUS_INDICATION_IN_PROGRESS",
          }),
        };
        cy.mount(
          <AggregatedStatuses<TestStatus>
            statuses={inProgress}
            defaultStatusName="statusTwo"
            defaultMessages={{ inProgress: "Custom Message" }}
          />,
        );
        pom.statusIconPom.root.should("contain.text", "Custom Message");
      });
    });
    describe("when only one status is IN_PROGRESS", () => {
      it("should display the corresponding message", () => {
        const inProgress = {
          statusOne: _.merge(_.clone(statusOne), {
            indicator: "STATUS_INDICATION_IN_PROGRESS",
          }),
          statusTwo: _.merge(_.clone(statusTwo), {
            indicator: "STATUS_INDICATION_IDLE",
          }),
        };
        cy.mount(
          <AggregatedStatuses<TestStatus>
            statuses={inProgress}
            defaultStatusName="statusTwo"
            defaultMessages={{ inProgress: "Custom Message" }}
          />,
        );
        pom.statusIconPom.root.should("contain.text", statusOne.message);
      });
    });
  });
  describe("when passing a custom error message", () => {
    describe("when all statuses are ERROR", () => {
      it("should display a the custom message", () => {
        const error = {
          statusOne: _.merge(_.clone(statusOne), {
            indicator: "STATUS_INDICATION_ERROR",
          }),
          statusTwo: _.merge(_.clone(statusTwo), {
            indicator: "STATUS_INDICATION_ERROR",
          }),
        };
        cy.mount(
          <AggregatedStatuses<TestStatus>
            statuses={error}
            defaultStatusName="statusTwo"
            defaultMessages={{ error: "Custom Message" }}
          />,
        );
        pom.statusIconPom.root.should("contain.text", "Custom Message");
      });
    });
    describe("when only one status is ERROR", () => {
      it("should display the corresponding message", () => {
        const error = {
          statusOne: _.merge(_.clone(statusOne), {
            indicator: "STATUS_INDICATION_ERROR",
          }),
          statusTwo: _.merge(_.clone(statusTwo), {
            indicator: "STATUS_INDICATION_IDLE",
          }),
        };
        cy.mount(
          <AggregatedStatuses<TestStatus>
            statuses={error}
            defaultStatusName="statusTwo"
            defaultMessages={{ error: "Custom Message" }}
          />,
        );
        pom.statusIconPom.root.should("contain.text", statusOne.message);
      });
    });
  });
  describe("when passing a custom idle message", () => {
    describe("when all statuses are STATUS_INDICATION_UNSPECIFIED", () => {
      it("should display the status message", () => {
        const unspecified = {
          statusOne: _.merge(_.clone(statusOne), {
            indicator: "STATUS_INDICATION_UNSPECIFIED",
          }),
          statusTwo: _.merge(_.clone(statusTwo), {
            indicator: "STATUS_INDICATION_UNSPECIFIED",
          }),
        };
        cy.mount(
          <AggregatedStatuses<TestStatus>
            statuses={unspecified}
            defaultStatusName="statusTwo"
            defaultMessages={{ idle: "Not connected" }}
          />,
        );
        pom.statusIconPom.root.should("contain.text", "statusTwo message");
      });
      it("should display the default message if message is empty", () => {
        const unspecified = {
          statusOne: _.merge(_.clone(statusOne), {
            indicator: "STATUS_INDICATION_UNSPECIFIED",
          }),
          statusTwo: _.merge(_.clone(statusTwo), {
            indicator: "STATUS_INDICATION_UNSPECIFIED",
            message: "", // empty message in status
          }),
        };
        cy.mount(
          <AggregatedStatuses<TestStatus>
            statuses={unspecified}
            defaultStatusName="statusTwo"
            defaultMessages={{ idle: "Not connected" }}
          />,
        );
        pom.statusIconPom.root.should("contain.text", "Not connected");
      });
    });

    describe("when statuses are STATUS_INDICATION_UNSPECIFIED or STATUS_INDICATION_IDLE", () => {
      it("should display the status message", () => {
        const unspecified = {
          statusOne: _.merge(_.clone(statusOne), {
            indicator: "STATUS_INDICATION_UNSPECIFIED",
          }),
          statusTwo: _.merge(_.clone(statusTwo), {
            indicator: "STATUS_INDICATION_IDLE",
            message: "Running",
          }),
        };
        cy.mount(
          <AggregatedStatuses<TestStatus>
            statuses={unspecified}
            defaultStatusName="statusTwo"
            defaultMessages={{ idle: "Not connected" }}
          />,
        );
        pom.statusIconPom.root.should("contain.text", "Running");
      });
      it("should display the default message if message is empty", () => {
        const unspecified = {
          statusOne: _.merge(_.clone(statusOne), {
            indicator: "STATUS_INDICATION_IDLE",
          }),
          statusTwo: _.merge(_.clone(statusTwo), {
            indicator: "STATUS_INDICATION_UNSPECIFIED",
            message: "", // empty message in status
          }),
        };
        cy.mount(
          <AggregatedStatuses<TestStatus>
            statuses={unspecified}
            defaultStatusName="statusTwo"
            defaultMessages={{ idle: "Not connected" }}
          />,
        );
        pom.statusIconPom.root.should("contain.text", "Not connected");
      });
    });
  });
});

describe("AggregatedStatuses utilities", () => {
  describe("when all statuses are STATUS_INDICATION_IDLE", () => {
    it("should return Status.Ready and the defaultStatus message", () => {
      const statuses: AggregatedStatusesMap = {
        statusOne: statusOne,
        statusTwo: statusTwo,
      };
      const res = aggregateStatuses(statuses, "statusTwo");
      expect(res.status).to.equal(Status.Ready);
      expect(res.message).to.equal(statuses["statusTwo"].message);
    });
  });
  describe("when one status is STATUS_INDICATION_ERROR", () => {
    it("should return Status.Error and the corresponding message", () => {
      const statuses: AggregatedStatusesMap = {
        statusOne: statusOne,
        statusTwo: { ...statusTwo, indicator: "STATUS_INDICATION_ERROR" },
      };
      const res = aggregateStatuses(statuses, "statusTwo");
      expect(res.status).to.equal(Status.Error);
      expect(res.message).to.equal(statuses["statusTwo"].message);
    });
  });
  describe("when multiple statuses are STATUS_INDICATION_ERROR", () => {
    it("should return Status.Error and a generic error message", () => {
      const statuses: AggregatedStatusesMap = {
        statusOne: { ...statusOne, indicator: "STATUS_INDICATION_ERROR" },
        statusTwo: { ...statusTwo, indicator: "STATUS_INDICATION_ERROR" },
      };
      const res = aggregateStatuses(statuses, "statusTwo");
      expect(res.status).to.equal(Status.Error);
      expect(res.message).to.equal("Error");
    });
    it("should return Status.Error and a custom error message", () => {
      const statuses: AggregatedStatusesMap = {
        statusOne: { ...statusOne, indicator: "STATUS_INDICATION_ERROR" },
        statusTwo: { ...statusTwo, indicator: "STATUS_INDICATION_ERROR" },
      };
      const errMsg = "Custom Error Msg";
      const res = aggregateStatuses(statuses, "statusTwo", { error: errMsg });
      expect(res.status).to.equal(Status.Error);
      expect(res.message).to.equal(errMsg);
    });
  });
  describe("when one status is STATUS_INDICATION_IN_PROGRESS", () => {
    it("should return Status.Error and the corresponding message", () => {
      const statuses: AggregatedStatusesMap = {
        statusOne: statusOne,
        statusTwo: { ...statusTwo, indicator: "STATUS_INDICATION_IN_PROGRESS" },
      };
      const res = aggregateStatuses(statuses, "statusTwo");
      expect(res.status).to.equal(Status.NotReady);
      expect(res.message).to.equal(statuses["statusTwo"].message);
    });
  });
  describe("when multiple statuses are STATUS_INDICATION_IN_PROGRESS", () => {
    it("should return Status.Error and a generic error message", () => {
      const statuses: AggregatedStatusesMap = {
        statusOne: { ...statusOne, indicator: "STATUS_INDICATION_IN_PROGRESS" },
        statusTwo: { ...statusTwo, indicator: "STATUS_INDICATION_IN_PROGRESS" },
      };
      const res = aggregateStatuses(statuses, "statusTwo");
      expect(res.status).to.equal(Status.NotReady);
      expect(res.message).to.equal("In Progress");
    });
    it("should return Status.Error and a custom error message", () => {
      const statuses: AggregatedStatusesMap = {
        statusOne: { ...statusOne, indicator: "STATUS_INDICATION_IN_PROGRESS" },
        statusTwo: { ...statusTwo, indicator: "STATUS_INDICATION_IN_PROGRESS" },
      };
      const progressMsg = "Custom In Progress Msg";
      const res = aggregateStatuses(statuses, "statusTwo", {
        inProgress: progressMsg,
      });
      expect(res.status).to.equal(Status.NotReady);
      expect(res.message).to.equal(progressMsg);
    });
  });
});
