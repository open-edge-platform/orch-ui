/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { cyGet } from "@orch-ui/tests";
import { hostOne, regionAshland, siteBoston } from "@orch-ui/utils";
import { useState } from "react";
import { store } from "../../../store/store";
import {
  displayNameErrMsgForInvalidCharacter,
  getNameErrorMsgForMaxLength,
  nameErrorMsgForRequired,
} from "../../../store/utils";
import { supportedTimezones } from "../../../utils/worldTimezones";
import { ScheduleMaintenanceForm } from "./ScheduleMaintenanceForm";
import {
  ScheduleMaintenanceBasicFill,
  ScheduleMaintenanceFormPom,
} from "./ScheduleMaintenanceForm.pom";

const isOnMarchDaylightSaving = false;

const TestingComponent = ({
  mockEntity = hostOne,
  mockEntityType = "host",
}: {
  mockEntity?: enhancedEimSlice.ScheduleMaintenanceTargetEntity;
  mockEntityType?: enhancedEimSlice.ScheduleMaintenanceTargetEntityType;
}) => {
  const initialMaintenanceFormData: enhancedEimSlice.ScheduleMaintenance = {
    type: "no-repeat",
    name: "",
    scheduleStatus: "SCHEDULE_STATUS_UNSPECIFIED",
  };
  // Note: target can be host or site. If targetSite is set then targetHost is undefined (not-set).
  if (mockEntityType === "region") {
    initialMaintenanceFormData.targetRegion = mockEntity as eim.RegionRead;
  } else if (mockEntityType === "site") {
    initialMaintenanceFormData.targetSite = mockEntity as eim.SiteRead;
  } else {
    initialMaintenanceFormData.targetHost = mockEntity as eim.HostRead;
  }
  const [maintenance, setMaintenance] =
    useState<enhancedEimSlice.ScheduleMaintenance>(initialMaintenanceFormData);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  return (
    <>
      <ScheduleMaintenanceForm
        targetEntityType="host"
        maintenance={maintenance}
        onUpdate={setMaintenance}
        onClose={() => setIsClosed(true)}
        onSave={() => setIsSaved(true)}
      />
      {/* Only for test purpose */}
      <div data-cy="onClose">{isClosed && "Drawer is closed"}</div>
      <div data-cy="onSave">{isSaved && "Drawer is saved sucessfully"}</div>
    </>
  );
};

const startDate = "2024-02-13"; // Note: startDate and endDate are both same
const startTime = "17:32";
const endTime = "18:31";

const pom = new ScheduleMaintenanceFormPom();

describe("<ScheduleMaintenanceForm/>", () => {
  const defaultFill: ScheduleMaintenanceBasicFill = {
    name: "Demo Maintenance",
    scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
    type: "no-repeat",
    timezone: {
      label: "Greenwich (GMT-00:00)",
      tzCode: "Greenwich",
      utc: "-00:00",
    },
  };
  const expectedMaintenance: enhancedEimSlice.ScheduleMaintenance = {
    name: defaultFill.name,
    scheduleStatus: defaultFill.scheduleStatus!,
    type: "no-repeat",
    single: {
      startSeconds: 1707845520,
      endSeconds: 1707849060,
    },
    repeated: {
      durationSeconds: 50,
      cronHours: "17",
      cronMinutes: "32",
      cronDayWeek: "1,3",
      cronMonth: "2,6,8,12",
      cronDayMonth: "1,3,31",
    },
  };
  describe("basic form functionality", () => {
    beforeEach(() => {
      cy.mount(<TestingComponent />);
    });

    it("should show add button", () => {
      pom.el.saveButton.contains("Add");
    });

    it("should see default schedule type", () => {
      pom.fillBasicMaintenanceForm({
        ...defaultFill,
        type: undefined,
      });
      pom.el.type
        .find(".spark-dropdown-button-label-is-selected")
        .contains("Does not repeat");
    });

    it("should close drawer", () => {
      pom.el.footerButtons.contains("Close").click();
      cyGet("onClose").should("have.text", "Drawer is closed");
    });

    describe("name validation", () => {
      beforeEach(() => {
        pom.fillBasicMaintenanceForm({
          ...defaultFill,
          name: undefined,
        });
      });
      it("should show invalid name for name with symbols", () => {
        pom.el.name.type("$systemInfo();//");
        pom.nameTextField.contains(displayNameErrMsgForInvalidCharacter);
        pom.el.saveButton.should("have.class", "spark-button-disabled");
      });
      it("should show name error and disable add button when max length is reached", () => {
        pom.el.name.type("deploymentklkjlkjlkj");
        pom.nameTextFieldInvalidIndicator.should("not.exist");
        pom.el.saveButton.should("not.have.class", "spark-button-disabled");
        pom.el.name.type("k");
        pom.nameTextField.contains(getNameErrorMsgForMaxLength(20));
        pom.el.saveButton.should("have.class", "spark-button-disabled");
      });
      it("should validate name on every input character entered", () => {
        pom.el.name.type("-hello");
        pom.nameTextField.contains(displayNameErrMsgForInvalidCharacter);
        pom.el.saveButton.should("have.class", "spark-button-disabled");

        pom.el.name.clear().type("hello");
        pom.nameTextFieldInvalidIndicator.should("not.exist");
        pom.el.saveButton.should("not.have.class", "spark-button-disabled");

        pom.el.name.type("-");
        pom.nameTextField.contains(displayNameErrMsgForInvalidCharacter);
        pom.el.saveButton.should("have.class", "spark-button-disabled");

        pom.el.name.clear().type("1");
        pom.nameTextFieldInvalidIndicator.should("not.exist");
        pom.el.saveButton.should("not.have.class", "spark-button-disabled");
      });
      it("should show required when input name entered is deleted", () => {
        pom.el.name.type("hello-1");
        pom.nameTextFieldInvalidIndicator.should("not.exist");

        pom.el.name.clear();
        pom.nameTextFieldInvalidIndicator.should("exist");
        pom.nameTextField.contains(nameErrorMsgForRequired);
      });
      it("next button disable on empty name", () => {
        pom.el.saveButton.click();
        pom.el.saveButton.should("have.class", "spark-button-disabled");
      });
    });

    describe("maintenance type validation", () => {
      beforeEach(() => {
        pom.fillBasicMaintenanceForm({
          ...defaultFill,
          scheduleStatus: undefined,
        });
      });
      it("should see default text in selection", () => {
        pom.el.status
          .find(".spark-dropdown-button-label-is-selected")
          .contains("Please select a Maintenance");
        pom.el.saveButton.click();
        pom.el.saveButton.should("have.class", "spark-button-disabled");
      });
      it("should select maintenance type", () => {
        pom.selectFromDropdown(
          "status",
          "SCHEDULE_STATUS_MAINTENANCE",
          "Maintenance",
        );
        pom.el.status
          .find(".spark-dropdown-button-label-is-selected")
          .contains("Maintenance");
      });
    });

    describe("selecting a timezone", () => {
      const filterTimezone = (search: string) =>
        supportedTimezones.filter((timezone) => {
          return timezone.label.match(search);
        });

      beforeEach(() => {
        pom.fillBasicMaintenanceForm({
          ...defaultFill,
          timezone: undefined,
        });
      });
      // TODO: not this doesnot work on windows, unless user is in India time
      it("should see default timezone", () => {
        // NOTE: timezone test doesnot work on windows due to a cypress bug in `cyVersion > 9.1.1`
        // Refer to Issue: https://github.com/cypress-io/cypress/issues/1043
        if (window.navigator.platform.toLowerCase().startsWith("win")) {
          // TODO: Timezone/time tests are skipped on Windows environment! Check alternative way to set timezone for cypress in windows.
          return;
        }

        pom.timezoneInputBox.should("have.value", "Asia/Calcutta (GMT+05:30)");
      });
      it("should select timezone", () => {
        pom.selectTimezone("Greenwich", "Greenwich (GMT-00:00)");
        pom.timezoneInputBox.should("have.value", "Greenwich (GMT-00:00)");
      });
      it("search and selects timezone", () => {
        pom.timezoneInputBox.clear().type("America/C");
        pom.timezoneList.should(
          "have.length",
          filterTimezone("America/C").length,
        );
      });
      it("search an non-existing timezone", () => {
        pom.timezoneInputBox.clear().type("America/Australia");
        pom.timezoneList.should("have.length", 0);
      });
    });
  });

  describe("when maintenance is performed on a host", () => {
    beforeEach(() => {
      cy.mount(<TestingComponent mockEntity={hostOne} mockEntityType="host" />);
    });
    describe("should add maintenance", () => {
      describe("for maintenance that Does not repeat", () => {
        beforeEach(() => {
          pom.fillBasicMaintenanceForm(defaultFill);
          pom.singleSchedulePom.fillSingleScheduleStartDate(
            startDate,
            startTime,
          );
          pom.el.isOpenEndedSwitch.should("not.be.checked");
          pom.el.type
            .find(".spark-dropdown-button-label-is-selected")
            .contains("Does not repeat");
        });
        it("when open-ended is disabled, i.e., endseconds is provided", () => {
          // Click `Add` and check for error on end time for a disabled `open-ended`
          pom.el.saveButton.click();
          pom.singleSchedulePom.el.endDate.should(
            "have.class",
            "spark-input-is-invalid",
          );
          pom.singleSchedulePom.el.endTime.should(
            "have.class",
            "spark-input-is-invalid",
          );

          pom.singleSchedulePom.fillSingleScheduleEndDate(startDate, endTime);

          pom.interceptApis([pom.api.postSingleMaintenance]);
          pom.el.saveButton.click();
          pom.waitForApis();

          cy.get(`@${pom.api.postSingleMaintenance}`)
            .its("request.body")
            .should("deep.include", {
              name: expectedMaintenance.name,
              scheduleStatus: expectedMaintenance.scheduleStatus,
              targetHostId: hostOne.resourceId,
              startSeconds: expectedMaintenance.single?.startSeconds,
              endSeconds: expectedMaintenance.single?.endSeconds,
            });
        });
        it("when open-ended is enabled", () => {
          pom.clickOpenEndedSwitch();
          pom.el.isOpenEndedSwitch.should("be.checked");
          pom.singleSchedulePom.el.endDate.should("not.exist");
          pom.singleSchedulePom.el.endTime.should("not.exist");

          pom.interceptApis([pom.api.postSingleMaintenance]);
          pom.el.saveButton.click();
          pom.waitForApis();

          cy.get(`@${pom.api.postSingleMaintenance}`)
            .its("request.body")
            .should("deep.include", {
              name: expectedMaintenance.name,
              scheduleStatus: expectedMaintenance.scheduleStatus,
              targetHostId: hostOne.resourceId,
              startSeconds: expectedMaintenance.single?.startSeconds,
            });
        });
      });

      it("should create maintenance that is Repeated by day of month", () => {
        pom.fillBasicMaintenanceForm({
          ...defaultFill,
          type: "repeat-monthly",
        });

        pom.repeatedSchedulePom.el.startTime.type(
          `${expectedMaintenance.repeated!.cronHours}:${expectedMaintenance.repeated!.cronMinutes}`,
        );
        pom.repeatedSchedulePom.el.duration.clear().type("50");
        pom.repeatedSchedulePom.dayNumbersMultiDropdown.selectFromMultiDropdown(
          ["1", "3", "31"],
        );
        pom.repeatedSchedulePom.dayNumbersMultiDropdown.root.click();
        pom.repeatedSchedulePom.monthsMultiDropdown.selectFromMultiDropdown([
          "February",
          "June",
          "August",
          "December",
        ]);
        pom.repeatedSchedulePom.monthsMultiDropdown.root.click();

        pom.interceptApis([pom.api.postRepeatedMaintenance]);
        pom.el.saveButton.click();
        pom.waitForApis();
        cy.get(`@${pom.api.postRepeatedMaintenance}`)
          .its("request.body")
          .should("deep.include", {
            ...expectedMaintenance.repeated,
            cronDayWeek: "*",
            name: expectedMaintenance.name,
            scheduleStatus: expectedMaintenance.scheduleStatus,
            targetHostId: hostOne.resourceId,
          });
      });

      it("should create maintenance that is Repeated by day of week", () => {
        pom.fillBasicMaintenanceForm({
          ...defaultFill,
          type: "repeat-weekly",
        });

        pom.repeatedSchedulePom.el.startTime.type(
          `17:${expectedMaintenance.repeated?.cronMinutes}`,
        );
        pom.repeatedSchedulePom.el.duration.clear().type("50");
        pom.repeatedSchedulePom.weekdaysMultiDropdown.selectFromMultiDropdown([
          "Monday",
          "Wednesday",
        ]);
        pom.repeatedSchedulePom.weekdaysMultiDropdown.root.click();
        pom.repeatedSchedulePom.monthsMultiDropdown.selectFromMultiDropdown([
          "June",
          "August",
          "December",
        ]);
        pom.repeatedSchedulePom.monthsMultiDropdown.root.click();

        pom.interceptApis([pom.api.postRepeatedMaintenance]);
        pom.el.saveButton.click();
        pom.waitForApis();

        cy.get(`@${pom.api.postRepeatedMaintenance}`)
          .its("request.body")
          .should("deep.include", {
            ...expectedMaintenance.repeated,
            cronDayMonth: "*",
            cronMonth: "6,8,12",
            name: expectedMaintenance.name,
            scheduleStatus: expectedMaintenance.scheduleStatus,
            targetHostId: hostOne.resourceId,
          });
      });

      describe("should set proper values on timezone", () => {
        beforeEach(() => {
          pom.fillBasicMaintenanceForm({
            ...defaultFill,
            type: "repeat-monthly",
          });
        });
        it("when PST(GMT-8) 6:00PM previous day converts to UTC/GMT 1:00AM next day", () => {
          pom.selectTimezone("America/Los_Angeles", "America/Los_Angeles (GMT");
          pom.repeatedSchedulePom.el.startTime.type("18:00");
          pom.repeatedSchedulePom.el.duration.clear().type("50");
          pom.repeatedSchedulePom.dayNumbersMultiDropdown.selectFromMultiDropdown(
            ["3", "13", "31"],
          );
          pom.repeatedSchedulePom.dayNumbersMultiDropdown.root.click();
          pom.repeatedSchedulePom.monthsMultiDropdown.selectFromMultiDropdown([
            "February",
            "June",
            "August",
            "December",
          ]);
          pom.repeatedSchedulePom.monthsMultiDropdown.root.click();

          pom.interceptApis([pom.api.postRepeatedMaintenance]);
          pom.el.saveButton.click();

          const apiCalls: any[] = [];
          cy.wait(`@${pom.api.postRepeatedMaintenance}`).then((interception) =>
            apiCalls.push(interception.request.body),
          );
          cy.wait(`@${pom.api.postRepeatedMaintenance}`).then((interception) =>
            apiCalls.push(interception.request.body),
          );

          cy.then(() => {
            expect(apiCalls).to.have.length(2);
            expect(
              apiCalls.filter((body) => body.cronDayMonth === "1")[0],
            ).to.deep.includes({
              // PST 18:00 is UTC 01:00
              cronHours: isOnMarchDaylightSaving ? "1" : "2",
              cronMinutes: "0",
              cronDayMonth: "1", // match if the values given out is for next day
              cronMonth: "3,7,9,1", // next month test
              cronDayWeek: "*",
            });
            expect(
              apiCalls.filter((body) => body.cronDayMonth !== "1")[0],
            ).to.deep.includes({
              // PST 18:00 is UTC 01:00
              cronHours: isOnMarchDaylightSaving ? "1" : "2",
              cronMinutes: "0",
              cronDayMonth: "4,14", // match if the values given out is for next day
              cronMonth: "2,6,8,12", // same month test
              cronDayWeek: "*",
            });
          });
        });

        it("when PST(GMT-8) 6:00PM previous day converts to UTC/GMT 1:00AM next day next month, but only next month gets counted", () => {
          pom.selectTimezone("America/Los_Angeles", "America/Los_Angeles (GMT");
          pom.repeatedSchedulePom.el.startTime.type("18:00");
          pom.repeatedSchedulePom.el.duration.clear().type("50");
          pom.repeatedSchedulePom.dayNumbersMultiDropdown.selectFromMultiDropdown(
            ["31"],
          );
          pom.repeatedSchedulePom.dayNumbersMultiDropdown.root.click();
          pom.repeatedSchedulePom.monthsMultiDropdown.selectFromMultiDropdown([
            "February",
            "June",
            "August",
            "December",
          ]);
          pom.repeatedSchedulePom.monthsMultiDropdown.root.click();

          pom.interceptApis([pom.api.postRepeatedMaintenance]);
          pom.el.saveButton.click();
          pom.waitForApis();

          cy.get(`@${pom.api.postRepeatedMaintenance}`)
            .its("request.body")
            .should("deep.include", {
              // PST 18:00 is UTC 01:00
              cronHours: isOnMarchDaylightSaving ? "1" : "2",
              cronMinutes: "0",
              cronDayMonth: "1", // match if the values given out is for next day
              cronMonth: "3,7,9,1", // next month test
              cronDayWeek: "*",
            });
        });

        it("when JST(GMT+9) 6:00AM next day converts to UTC/GMT 9:00PM previous day", () => {
          pom.selectTimezone("Asia/Tokyo", "Asia/Tokyo (GMT+09:00)");
          pom.repeatedSchedulePom.el.startTime.type("06:00");
          pom.repeatedSchedulePom.el.duration.clear().type("50");
          pom.repeatedSchedulePom.dayNumbersMultiDropdown.selectFromMultiDropdown(
            ["1", "14", "29"],
          );
          pom.repeatedSchedulePom.dayNumbersMultiDropdown.root.click();
          pom.repeatedSchedulePom.monthsMultiDropdown.selectFromMultiDropdown([
            "February",
            "June",
            "August",
            "December",
          ]);
          pom.repeatedSchedulePom.monthsMultiDropdown.root.click();

          pom.interceptApis([pom.api.postRepeatedMaintenance]);
          pom.el.saveButton.click();

          const apiCalls: any[] = [];
          cy.wait(`@${pom.api.postRepeatedMaintenance}`).then((interception) =>
            apiCalls.push(interception.request.body),
          );
          cy.wait(`@${pom.api.postRepeatedMaintenance}`).then((interception) =>
            apiCalls.push(interception.request.body),
          );

          cy.then(() => {
            expect(apiCalls).to.have.length(2);
            expect(
              apiCalls.filter((body) => body.cronDayMonth === "31")[0],
            ).to.deep.includes({
              // JST 06:00 is UTC 21:00 prev day
              cronHours: "21",
              cronMinutes: "0",
              cronDayMonth: "31", // match if the values given out is for prev day
              cronMonth: "1,5,7,11", // previous month
              cronDayWeek: "*",
            });
            expect(
              apiCalls.filter((body) => body.cronDayMonth !== "31")[0],
            ).to.deep.includes({
              // JST 06:00 is UTC 21:00 prev day
              cronHours: "21",
              cronMinutes: "0",
              cronDayMonth: "13,28", // match if the values given out is for prev day
              cronMonth: "2,6,8,12", // same month
              cronDayWeek: "*",
            });
          });
        });

        it("when JST(GMT+9) 6:00AM next day converts to UTC/GMT 9:00PM previous day, but only previous month gets counted", () => {
          pom.selectTimezone("Asia/Tokyo", "Asia/Tokyo (GMT+09:00)");
          pom.repeatedSchedulePom.el.startTime.type("06:00");
          pom.repeatedSchedulePom.el.duration.clear().type("50");
          pom.repeatedSchedulePom.dayNumbersMultiDropdown.selectFromMultiDropdown(
            ["1"],
          );
          pom.repeatedSchedulePom.dayNumbersMultiDropdown.root.click();
          pom.repeatedSchedulePom.monthsMultiDropdown.selectFromMultiDropdown([
            "February",
            "June",
            "August",
            "December",
          ]);
          pom.repeatedSchedulePom.monthsMultiDropdown.root.click();

          pom.interceptApis([pom.api.postRepeatedMaintenance]);
          pom.el.saveButton.click();

          cy.get(`@${pom.api.postRepeatedMaintenance}`)
            .its("request.body")
            .should("deep.include", {
              // JST 06:00 is UTC 21:00 prev day
              cronHours: "21",
              cronMinutes: "0",
              cronDayMonth: "31", // match if the values given out is for prev day
              cronMonth: "1,5,7,11", // previous month
              cronDayWeek: "*",
            });
        });

        it("when EST(GMT-5) 10:00AM same day converts to UTC/GMT 2:00PM same day", () => {
          pom.selectTimezone("America/New_York", "America/New_York (GMT");
          pom.repeatedSchedulePom.el.startTime.type("10:00");
          pom.repeatedSchedulePom.el.duration.clear().type("50");
          pom.repeatedSchedulePom.dayNumbersMultiDropdown.selectFromMultiDropdown(
            ["2", "3", "31"],
          );
          pom.repeatedSchedulePom.dayNumbersMultiDropdown.root.click();
          pom.repeatedSchedulePom.monthsMultiDropdown.selectFromMultiDropdown([
            "February",
            "June",
            "August",
            "December",
          ]);
          pom.repeatedSchedulePom.monthsMultiDropdown.root.click();

          pom.interceptApis([pom.api.postRepeatedMaintenance]);
          pom.el.saveButton.click();
          pom.waitForApis();

          cy.get(`@${pom.api.postRepeatedMaintenance}`)
            .its("request.body")
            .should("deep.include", {
              ...expectedMaintenance.repeated,
              // EST 10:00 is UTC 14:00
              cronHours: isOnMarchDaylightSaving ? "14" : "15",
              cronMinutes: "0",
              cronDayMonth: "2,3,31", // match if the values given out is for next day
              cronDayWeek: "*",
              name: expectedMaintenance.name,
              scheduleStatus: expectedMaintenance.scheduleStatus,
              targetHostId: hostOne.resourceId,
            });
        });
        afterEach(() => {
          cyGet("onSave").should("have.text", "Drawer is saved sucessfully");
        });
      });
    });
    afterEach(() => {
      cyGet("onSave").should("have.text", "Drawer is saved sucessfully");
    });
  });
  describe("when maintenance is performed on a site", () => {
    beforeEach(() => {
      cy.mount(
        <TestingComponent mockEntity={siteBoston} mockEntityType="site" />,
        {
          reduxStore: store,
        },
      );
      pom.fillBasicMaintenanceForm({
        ...defaultFill,
      });
      pom.singleSchedulePom.fillSingleScheduleStartDate(startDate, startTime);
      pom.el.isOpenEndedSwitch.should("not.be.checked");
      pom.el.type
        .find(".spark-dropdown-button-label-is-selected")
        .contains("Does not repeat");
    });
    it("should add single schedule maintenance", () => {
      pom.clickOpenEndedSwitch();
      pom.el.isOpenEndedSwitch.should("be.checked");
      pom.singleSchedulePom.el.endDate.should("not.exist");
      pom.singleSchedulePom.el.endTime.should("not.exist");

      pom.interceptApis([pom.api.postSingleMaintenance]);
      pom.el.saveButton.click();
      pom.waitForApis();

      cy.get(`@${pom.api.postSingleMaintenance}`)
        .its("request.body")
        .should("deep.include", {
          name: expectedMaintenance.name,
          scheduleStatus: expectedMaintenance.scheduleStatus,
          targetSiteId: siteBoston.siteID,
          startSeconds: expectedMaintenance.single?.startSeconds,
        });
    });
    afterEach(() => {
      cyGet("onSave").should("have.text", "Drawer is saved sucessfully");
    });
  });
  describe("when maintenance is performed on a region", () => {
    beforeEach(() => {
      cy.mount(
        <TestingComponent mockEntity={regionAshland} mockEntityType="region" />,
        {
          reduxStore: store,
        },
      );
      pom.fillBasicMaintenanceForm({
        ...defaultFill,
      });
      pom.singleSchedulePom.fillSingleScheduleStartDate(startDate, startTime);
    });
    it("should add maintenance", () => {
      pom.clickOpenEndedSwitch();
      pom.el.isOpenEndedSwitch.should("be.checked");
      pom.singleSchedulePom.el.endDate.should("not.exist");
      pom.singleSchedulePom.el.endTime.should("not.exist");

      pom.interceptApis([pom.api.postSingleMaintenance]);
      pom.el.saveButton.click();
      pom.waitForApis();

      cy.get(`@${pom.api.postSingleMaintenance}`)
        .its("request.body")
        .should("deep.include", {
          name: expectedMaintenance.name,
          scheduleStatus: expectedMaintenance.scheduleStatus,
          targetRegionId: regionAshland.regionID,
          startSeconds: expectedMaintenance.single?.startSeconds,
        });
    });
    afterEach(() => {
      cyGet("onSave").should("have.text", "Drawer is saved sucessfully");
    });
  });
});
