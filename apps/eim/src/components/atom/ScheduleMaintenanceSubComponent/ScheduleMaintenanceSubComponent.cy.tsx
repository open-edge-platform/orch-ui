/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import {
  maintenanceRepeatDaysFor11AMUTC,
  maintenanceRepeatDaysFor11PMUTC,
  noRepeatMaintenance,
  noRepeatOpenEndedMaintenance,
  repeatWeeklyMaintenanceFor11AMUTC,
  repeatWeeklyMaintenanceFor11PMUTC,
} from "@orch-ui/utils";

import { ScheduleMaintenanceSubComponent } from "./ScheduleMaintenanceSubComponent";
import { ScheduleMaintenanceSubComponentPom } from "./ScheduleMaintenanceSubComponent.pom";

const pom = new ScheduleMaintenanceSubComponentPom();
describe("<ScheduleMaintenanceSubComponent/>", () => {
  it("should render component", () => {
    cy.mount(
      <ScheduleMaintenanceSubComponent maintenance={noRepeatMaintenance} />,
    );
    pom.root.should("exist");
  });

  describe("Local timezone testing", () => {
    // NOTE: timezone test doesnot work on windows due to a cypress bug in `cyVersion > 9.1.1`
    // Refer to Issue: https://github.com/cypress-io/cypress/issues/1043
    if (window.navigator.platform.toLowerCase().startsWith("win")) {
      // TODO: Timezone/time tests are skipped on Windows environment! Check alternative way to set timezone for cypress in windows.
      return;
    }

    it("for open-ended disabled maintenance", () => {
      cy.mount(
        <ScheduleMaintenanceSubComponent maintenance={noRepeatMaintenance} />,
      );
      pom.el.scheduleType.should("have.text", "Does not Repeat");
      pom.el.startTime.should("have.text", "11:43 PM");
      pom.el.startDate.should("have.text", "6/30/2023");
      pom.el.endTime.should("have.text", "11:46 PM");
      pom.el.endDate.should("have.text", "6/30/2023");
    });

    describe("should render subcomponent single-schedule maintenance (with no end-time)", () => {
      beforeEach(() => {
        cy.mount(
          <ScheduleMaintenanceSubComponent
            maintenance={noRepeatOpenEndedMaintenance}
          />,
        );
      });
      it("should render timezone", () => {
        pom.el.timezone.should(
          "have.text",
          "India Standard Time (IST) (GMT+05:30)",
        );
      });

      it("should give indication for open-ended single-schedule maintenance", () => {
        pom.el.scheduleType.should("have.text", "Does not Repeat (Open-ended)");
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

    describe("should show proper dayOfWeek values on timezone", () => {
      it("when UTC/GMT 11:00PM previous day converts to IST(GMT+530) 4:30AM next day", () => {
        cy.mount(
          <ScheduleMaintenanceSubComponent
            maintenance={repeatWeeklyMaintenanceFor11PMUTC}
          />,
        );

        pom.el.startTime.should("have.text", "04:30 AM");
        pom.el.dayOfWeek.should("have.text", "Wed,Fri,Sun");
      });

      it("when UTC/GMT 11:00AM same day converts to IST(GMT+530) 4:30PM same day", () => {
        cy.mount(
          <ScheduleMaintenanceSubComponent
            maintenance={repeatWeeklyMaintenanceFor11AMUTC}
          />,
        );

        pom.el.startTime.should("have.text", "04:30 PM");
        pom.el.dayOfWeek.should("have.text", "Tue,Thu,Sat");
      });
    });

    describe("should show proper dayOfMonth values on timezone", () => {
      it("when UTC/GMT 11:00PM previous day converts to IST(GMT+530) 4:30AM next day", () => {
        cy.mount(
          <ScheduleMaintenanceSubComponent
            maintenance={maintenanceRepeatDaysFor11PMUTC}
          />,
        );

        pom.el.startTime.should("have.text", "04:30 AM");
        pom.el.dayOfMonth.should(
          "have.text",
          "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31",
        );
      });

      it("when UTC/GMT 11:00AM same day converts to IST(GMT+530) 4:30PM same day", () => {
        cy.mount(
          <ScheduleMaintenanceSubComponent
            maintenance={maintenanceRepeatDaysFor11AMUTC}
          />,
        );
        pom.el.startTime.should("have.text", "04:30 PM");
        pom.el.dayOfMonth.should(
          "have.text",
          "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30",
        );
      });
    });
  });
});
