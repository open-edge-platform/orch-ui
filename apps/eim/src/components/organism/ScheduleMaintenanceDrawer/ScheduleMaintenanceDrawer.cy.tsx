/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { enhancedEimSlice } from "@orch-ui/apis";
import { hostFour, hostOne, hostTwo } from "@orch-ui/utils";
import { ScheduleMaintenanceDrawer } from "./ScheduleMaintenanceDrawer";
import { ScheduleMaintenanceDrawerPom } from "./ScheduleMaintenanceDrawer.pom";

// For Constructing Unit Testable test component with toast controls.
import { ToastVisibility } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { hideToast } from "../../../store/notifications";
import { store } from "../../../store/store";
import { ScheduleMaintenanceBasicFill } from "../ScheduleMaintenanceForm/ScheduleMaintenanceForm.pom";

const startDate = "2024-02-13"; // Note: startDate and endDate are both same
const startTime = "17:32";

const TestingComponent = ({
  mockEntity,
  mockEntityType,
}: {
  mockEntity: enhancedEimSlice.ScheduleMaintenanceTargetEntity;
  mockEntityType?: enhancedEimSlice.ScheduleMaintenanceTargetEntityType;
}) => {
  const [shown, setShown] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  // EIM Notification system
  const { toastState: toast } = useAppSelector(
    (state) => state.notificationStatusList,
  );

  // By default disable showing toast message within redux state
  useEffect(() => {
    dispatch(hideToast());
  }, []);

  return (
    <>
      {toast.visibility === ToastVisibility.Show && (
        <div data-cy="toastMessage">Please fill all required fields.</div>
      )}
      <ScheduleMaintenanceDrawer
        targetEntity={mockEntity}
        targetEntityType={mockEntityType}
        isDrawerShown={shown}
        setHideDrawer={() => setShown(false)}
      />
    </>
  );
};

const pom = new ScheduleMaintenanceDrawerPom();
describe("<ScheduleMaintenanceDrawer/>", () => {
  beforeEach(() => {
    cy.mount(<TestingComponent mockEntity={hostOne} />, {
      reduxStore: store,
    });
    pom.root.should("exist");
  });
  it("should see drawer header", () => {
    pom.drawerHeaderPom.root.should("exist");
  });
  it("visit new maintenance form", () => {
    pom.selectTab("New Event");
    // TODO: move to form component
    pom.maintenanceFormPom.root.should("exist");
    pom.maintenanceFormPom.el.footerButtons.should("contain.text", "Add");
    pom.maintenanceFormPom.el.footerButtons.should("contain.text", "Close");
    pom.maintenanceFormPom.el.footerButtons.contains("Close").click();
  });
  it("visit maintenance list", () => {
    pom.selectTab("Schedule Event");
    pom.maintenanceListPom.root.should("exist");
    // TODO: move to list component
    pom.maintenanceListPom.el.footerButtons.should("not.contain.text", "Add");
    pom.maintenanceListPom.el.footerButtons.should("contain.text", "Close");
    pom.maintenanceListPom.el.footerButtons.contains("Close").click();
  });

  it("should add maintenance to redirect to schedule events tab", () => {
    const expectedMaintenance: ScheduleMaintenanceBasicFill = {
      name: "Demo Maintenance",
      scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
      timezone: {
        label: "Greenwich (GMT-00:00)",
        tzCode: "Greenwich",
        utc: "-00:00",
      },
      type: "no-repeat",
    };
    pom.maintenanceFormPom.fillBasicMaintenanceForm(expectedMaintenance);
    pom.maintenanceFormPom.clickOpenEndedSwitch();
    pom.maintenanceFormPom.el.isOpenEndedSwitch.should("be.checked");
    pom.maintenanceFormPom.singleSchedulePom.fillSingleScheduleStartDate(
      startDate,
      startTime,
    );
    pom.maintenanceFormPom.singleSchedulePom.el.endDate.should("not.exist");
    pom.maintenanceFormPom.singleSchedulePom.el.endTime.should("not.exist");

    pom.maintenanceFormPom.interceptApis([
      pom.maintenanceFormPom.api.postSingleMaintenance,
    ]);
    pom.maintenanceFormPom.el.footerButtons.contains("Add").click();
    pom.maintenanceFormPom.waitForApis();

    cy.get(`@${pom.maintenanceFormPom.api.postSingleMaintenance}`)
      .its("request.body")
      .should("deep.include", {
        name: expectedMaintenance.name,
        scheduleStatus: expectedMaintenance.scheduleStatus,
        targetHostId: hostOne.resourceId,
        startSeconds: 1707845520,
      });
  });

  describe("edit maintenance for a host", () => {
    const inputMaintenance: enhancedEimSlice.ScheduleMaintenance = {
      name: "New Name",
      scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
      type: "repeat-monthly",
      single: {
        startSeconds: 1707845520,
        endSeconds: 1707849060,
      },
      repeated: {
        durationSeconds: 50,
        cronHours: "18",
        cronMinutes: "32",
        cronDayMonth: "1,3,4",
        cronMonth: "6,8,11,12",
        cronDayWeek: "*",
      },
    };

    const fillBasicEditMaintenanceForm = (maintenanceName: string) => {
      pom.maintenanceListPom.interceptApis([
        pom.maintenanceListPom.api.getMaintenance,
      ]);
      pom.selectTab("Schedule Events");
      pom.waitForApis();

      pom.maintenanceListPom.tablePom
        .getRowBySearchText(maintenanceName)
        .find("[data-cy='popup']")
        .click()
        .contains("Edit")
        .as("editBtn");
      cy.get("@editBtn").click();

      // Overwrite only name and timezone for testing and Everything else is already prefilled.
      pom.maintenanceFormPom.fillBasicMaintenanceForm({
        name: inputMaintenance.name!,
        timezone: {
          label: "Greenwich (GMT-00:00)",
          tzCode: "Greenwich",
          utc: "-00:00",
        },
      });
    };

    it("edit single schedule maintenance from closed-ended to open-ended", () => {
      cy.mount(<TestingComponent mockEntity={hostTwo} />);

      fillBasicEditMaintenanceForm("schedule3");
      pom.maintenanceFormPom.selectFromDropdown(
        "type",
        "no-repeat",
        "Does not repeat",
      );

      pom.maintenanceFormPom.singleSchedulePom.el.startDate.should(
        "have.value",
        "2023-06-30",
      );
      pom.maintenanceFormPom.singleSchedulePom.el.startTime.should(
        "have.value",
        "18:15",
      );
      pom.maintenanceFormPom.singleSchedulePom.el.startDate.type(startDate);
      pom.maintenanceFormPom.singleSchedulePom.el.startTime.type(startTime);

      pom.maintenanceFormPom.singleSchedulePom.el.endDate.should(
        "have.value",
        "2067-11-10",
      );
      pom.maintenanceFormPom.singleSchedulePom.el.endTime.should(
        "have.value",
        "12:19",
      );

      pom.maintenanceFormPom.el.isOpenEndedSwitch.should("not.be.checked");
      pom.maintenanceFormPom.clickOpenEndedSwitch();
      pom.maintenanceFormPom.el.isOpenEndedSwitch.should("be.checked");

      pom.maintenanceFormPom.singleSchedulePom.el.endDate.should("not.exist");
      pom.maintenanceFormPom.singleSchedulePom.el.endTime.should("not.exist");

      pom.maintenanceFormPom.interceptApis([
        pom.maintenanceFormPom.api.putSingleMaintenance,
      ]);
      pom.maintenanceFormPom.el.footerButtons.contains("Update").click();
      pom.waitForApis();

      cy.get(`@${pom.maintenanceFormPom.api.putSingleMaintenance}`)
        .its("request.body")
        .should("deep.include", {
          startSeconds: inputMaintenance.single?.startSeconds,
          name: inputMaintenance.name,
          scheduleStatus: "SCHEDULE_STATUS_OS_UPDATE",
          targetHostId: hostTwo.resourceId,
        });
    });

    it("edit repeated schedule maintenance without timezone and time change", () => {
      cy.mount(<TestingComponent mockEntity={hostFour} />);

      fillBasicEditMaintenanceForm("r-schedule1");
      pom.maintenanceFormPom.selectFromDropdown(
        "type",
        "repeat-monthly",
        "Repeat by day of month",
      );

      pom.maintenanceFormPom.repeatedSchedulePom.el.duration.clear().type("30");

      pom.maintenanceFormPom.repeatedSchedulePom.dayNumbersMultiDropdown.selectFromMultiDropdown(
        ["1", "3", "4"],
      );
      pom.maintenanceFormPom.repeatedSchedulePom.dayNumbersMultiDropdown.root.click();
      pom.maintenanceFormPom.repeatedSchedulePom.monthsMultiDropdown.selectFromMultiDropdown(
        ["February", "June", "August", "November", "December"],
      );
      pom.maintenanceFormPom.repeatedSchedulePom.monthsMultiDropdown.root.click();

      pom.maintenanceFormPom.interceptApis([
        pom.maintenanceFormPom.api.putRepeatedMaintenance,
      ]);
      pom.maintenanceFormPom.el.footerButtons.contains("Update").click();
      pom.waitForApis();

      cy.get(`@${pom.maintenanceFormPom.api.putRepeatedMaintenance}`)
        .its("request.body")
        .should("deep.include", {
          ...inputMaintenance.repeated,
          durationSeconds: 30,
          cronDayMonth:
            "2,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30",
          cronMonth: "1,3,4,5,7,9,10,12",
          cronDayWeek: "*",
          cronHours: "14",
          cronMinutes: "24",
          targetHostId: hostFour.resourceId,
        });
    });
  });
});
