/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { hostOne, scheduleFour } from "@orch-ui/utils";
import { useState } from "react";
import { ScheduleMaintenanceList } from "./ScheduleMaintenanceList";
import { ScheduleMaintenanceListPom } from "./ScheduleMaintenanceList.pom";

const TestingComponent = () => {
  const [onEditMaintenance, setOnEditSelection] = useState<string>();
  const [onClose, setOnClose] = useState<boolean>(false);
  return (
    <>
      <ScheduleMaintenanceList
        targetEntity={hostOne}
        onEditSelection={(maintenance) =>
          setOnEditSelection(maintenance.resourceId)
        }
        onClose={() => setOnClose(true)}
      />
      <div data-cy="onClose">{onClose && "Drawer is closed"}</div>
      <div data-cy="onEdit">
        {onEditMaintenance && `edit is on ${onEditMaintenance}`}
      </div>
    </>
  );
};

const pom = new ScheduleMaintenanceListPom();
describe("<ScheduleMaintenanceList/>", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.getMaintenance]);
    cy.mount(<TestingComponent />);
    pom.waitForApis();
  });

  it("should render component", () => {
    pom.maintenanceTable.getRows().should("have.length", 7);
  });

  it("should close the drawer", () => {
    pom.el.footerButtons.contains("Close").click();
    cyGet("onClose").should("have.text", "Drawer is closed");
  });

  describe("when popup is open on a maintenance", () => {
    describe("delete maintenance for a host", () => {
      it("delete single schedule maintenance", () => {
        pom.tablePom
          .getRowBySearchText("schedule4")
          .find("[data-cy='popup']")
          .click()
          .contains("Delete")
          .as("deleteBtn");
        cy.get("@deleteBtn").click();
        pom.interceptApis([pom.api.deleteSingleMaintenance]);
        cy.get(".spark-modal .spark-modal-grid")
          .find("[data-cy='confirmBtn']")
          .click();
        pom.waitForApis();
      });
      it("delete repeated schedule maintenance", () => {
        pom.tablePom
          .getRowBySearchText("r-schedule1")
          .find("[data-cy='popup']")
          .click()
          .contains("Delete")
          .as("deleteBtn");
        cy.get("@deleteBtn").click();
        pom.interceptApis([pom.api.deleteRepeatedMaintenance]);
        cy.get(".spark-modal .spark-modal-grid")
          .find("[data-cy='confirmBtn']")
          .click();
        pom.waitForApis();
      });
      it("should cancels in delete maintenance box", () => {
        pom.tablePom
          .getRowBySearchText("r-schedule1")
          .find("[data-cy='popup']")
          .click()
          .contains("Delete")
          .as("deleteBtn");
        cy.get("@deleteBtn").click();
        cy.get(".spark-modal .spark-modal-grid")
          .find("[data-cy='cancelBtn']")
          .click();
        cy.get(".spark-modal .spark-modal-grid").should("not.exist");
        pom.root.should("exist");
      });
    });

    it("edits maintenance for a host", () => {
      pom.tablePom
        .getRowBySearchText(scheduleFour.name!)
        .find("[data-cy='popup']")
        .click()
        .contains("Edit")
        .as("editBtn");
      cy.get("@editBtn").click();

      cyGet("onEdit").should(
        "have.text",
        `edit is on ${scheduleFour.resourceId!}`,
      );
    });
  });

  describe("should give indication for open-ended single-schedule maintenance", () => {
    beforeEach(() => {
      cy.clock(new Date("4/29/2024"));
    });
    // ("open-ended" or maintenance without end-time)
    it("for open-ended enabled maintenance", () => {
      pom.tablePom
        .getRowBySearchText("schedule2")
        .find("[data-cy='rowExpander']")
        .click();
      pom.el.scheduleType.should("have.text", "Does not Repeat (Open-ended)");
    });
    it("for open-ended disabled maintenance", () => {
      pom.tablePom
        .getRowBySearchText("schedule3")
        .find("[data-cy='rowExpander']")
        .click();
      pom.el.scheduleType.should("have.text", "Does not Repeat");
    });
  });

  describe("Local timezone testing", () => {
    // NOTE: timezone test doesnot work on windows due to a cypress bug in `cyVersion > 9.1.1`
    // Refer to Issue: https://github.com/cypress-io/cypress/issues/1043
    if (window.navigator.platform.toLowerCase().startsWith("win")) {
      // TODO: Timezone/time tests are skipped on Windows environment! Check alternative way to set timezone for cypress in windows.
      return;
    }

    describe("should render subcomponent single-schedule maintenance (with no end-time)", () => {
      beforeEach(() => {
        pom.tablePom
          .getRowBySearchText("schedule2")
          .find("[data-cy='rowExpander']")
          .click();
      });

      it("should render timezone", () => {
        pom.el.timezone.should(
          "have.text",
          "India Standard Time (IST) (GMT+05:30)",
        );
      });

      it("should render start date and time", () => {
        pom.el.startDate.should("have.text", "6/30/2023");
        pom.el.startTime.should("have.text", "11:45 PM");
      });

      it("should render end date and time", () => {
        pom.el.endDate.should("have.text", "N/A");
        pom.el.endTime.should("have.text", "N/A");
      });
    });

    describe("should render subcomponent single-schedule maintenance (with end-time)", () => {
      beforeEach(() => {
        pom.tablePom
          .getRowBySearchText("schedule3")
          .find("[data-cy='rowExpander']")
          .click();
      });

      it("should render timezone", () => {
        pom.el.timezone.should(
          "have.text",
          "India Standard Time (IST) (GMT+05:30)",
        );
      });

      it("should render start date and time", () => {
        pom.el.startDate.should("have.text", "6/30/2023");
        pom.el.startTime.should("have.text", "11:45 PM");
      });

      it("should render end date and time", () => {
        pom.el.endDate.should("have.text", "11/10/2067");
        pom.el.endTime.should("have.text", "05:49 PM");
      });
    });

    describe("should render subcomponent repeat-schedule maintenance", () => {
      beforeEach(() => {
        pom.tablePom
          .getRowBySearchText("r-schedule2")
          .find("[data-cy='rowExpander']")
          .click();
      });

      it("should render timezone", () => {
        pom.el.timezone.should(
          "have.text",
          "India Standard Time (IST) (GMT+05:30)",
        );
      });

      it("should render start time", () => {
        pom.el.startTime.should("have.text", "02:00 PM");
      });

      /** TODO: [NEX-2118] Edge-case - test cron day of week, day of month and month upon timezone change
       * Note: Month selection on local time zone change can make Jan 1st 00:00(UTC) can be Dec 31st 20:00(EST/GMT-4:00)
       */
    });

    describe("should show proper dayOfWeek values on timezone", () => {
      it("when UTC/GMT 11:00PM previous day converts to IST(GMT+530) 4:30AM next day", () => {
        pom.interceptApis([pom.api.getMaintenanceRepeatWeekdaysFor11PMUTC]);
        cy.mount(<TestingComponent />);
        pom.waitForApis();

        pom.tablePom
          .getRowBySearchText("r-schedule1")
          .find("[data-cy='rowExpander']")
          .click();

        pom.el.startTime.should("have.text", "04:30 AM");
        pom.el.dayOfWeek.should("have.text", "Wed,Fri,Sun");
      });

      it("when UTC/GMT 11:00AM same day converts to IST(GMT+530) 4:30PM same day", () => {
        pom.interceptApis([pom.api.getMaintenanceRepeatWeekdaysFor11AMUTC]);
        cy.mount(<TestingComponent />);
        pom.waitForApis();

        pom.tablePom
          .getRowBySearchText("r-schedule1")
          .find("[data-cy='rowExpander']")
          .click();

        pom.el.startTime.should("have.text", "04:30 PM");
        pom.el.dayOfWeek.should("have.text", "Tue,Thu,Sat");
      });
    });

    describe("should show proper dayOfMonth values on timezone", () => {
      it("when UTC/GMT 11:00PM previous day converts to IST(GMT+530) 4:30AM next day", () => {
        pom.interceptApis([pom.api.getMaintenanceRepeatDaysFor11PMUTC]);
        cy.mount(<TestingComponent />);
        pom.waitForApis();

        pom.tablePom
          .getRowBySearchText("r-schedule1")
          .find("[data-cy='rowExpander']")
          .click();

        pom.el.startTime.should("have.text", "04:30 AM");
        pom.el.dayOfMonth.should(
          "have.text",
          "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31",
        );
      });

      it("when UTC/GMT 11:00AM same day converts to IST(GMT+530) 4:30PM same day", () => {
        pom.interceptApis([pom.api.getMaintenanceRepeatDaysFor11AMUTC]);
        cy.mount(<TestingComponent />);
        pom.waitForApis();

        pom.tablePom
          .getRowBySearchText("r-schedule1")
          .find("[data-cy='rowExpander']")
          .click();

        pom.el.startTime.should("have.text", "04:30 PM");
        pom.el.dayOfMonth.should(
          "have.text",
          "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30",
        );
      });
    });
  });
});
