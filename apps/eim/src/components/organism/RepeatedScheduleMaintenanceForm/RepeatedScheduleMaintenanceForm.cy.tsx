/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { enhancedEimSlice } from "@orch-ui/apis";
import { cyGet } from "@orch-ui/tests";
import { hostOne } from "@orch-ui/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Timezone } from "../../../utils/worldTimezones";
import { RepeatedScheduleMaintenanceForm } from "./RepeatedScheduleMaintenanceForm";
import { RepeatedScheduleMaintenanceFormPom } from "./RepeatedScheduleMaintenanceForm.pom";

const TestingComponent = ({
  baseMaintenance,
  initialTimezone = {
    label: "Greenwich Meridian Time / Universal Coordinated Time",
    tzCode: "UTC",
    utc: "+00:00",
  },
}: {
  baseMaintenance: enhancedEimSlice.ScheduleMaintenanceRead;
  initialTimezone?: Timezone;
}) => {
  const {
    control: formControl,
    formState: { errors: formErrors },
  } = useForm<enhancedEimSlice.ScheduleMaintenance>({
    mode: "all",
    defaultValues: baseMaintenance,
    values: baseMaintenance,
    reValidateMode: "onSubmit",
  });

  const [timezone] = useState(initialTimezone);
  const [maintenance, setMaintenance] =
    useState<enhancedEimSlice.ScheduleMaintenanceRead>(baseMaintenance);

  return (
    <>
      <RepeatedScheduleMaintenanceForm
        maintenance={maintenance}
        onUpdate={setMaintenance}
        timezone={timezone}
        formControl={formControl}
        formErrors={formErrors}
      />
      {/* Only for test purpose */}
      <div>
        <div data-cy="testCronTime">
          {maintenance.repeated?.cronHours}:{maintenance.repeated?.cronMinutes}
        </div>
        <div data-cy="testCronDayOfMonth">
          {maintenance.repeated?.cronDayMonth}
        </div>
        <div data-cy="testCronDayOfWeek">
          {maintenance.repeated?.cronDayWeek}
        </div>
        <div data-cy="testCronMonth">{maintenance.repeated?.cronMonth}</div>
      </div>
    </>
  );
};

const pom = new RepeatedScheduleMaintenanceFormPom();
describe("<RepeatedScheduleMaintenanceForm/>", () => {
  const baseMaintenanceFormData: enhancedEimSlice.ScheduleMaintenance = {
    type: "repeat-weekly",
    name: "",
    scheduleStatus: "SCHEDULE_STATUS_UNSPECIFIED",
    targetHost: hostOne,
  };
  describe("should test durations", () => {
    it("when minutes and seconds are provided", () => {
      cy.mount(
        <TestingComponent
          baseMaintenance={{
            ...baseMaintenanceFormData,
            repeated: {
              ...baseMaintenanceFormData.repeated,
              durationSeconds: 1000,
            },
          }}
        />,
      );
      pom.el.duration.should("have.value", "0:16:40");
    });
    it("when all hours, minutes and seconds are provided", () => {
      cy.mount(
        <TestingComponent
          baseMaintenance={{
            ...baseMaintenanceFormData,
            repeated: {
              ...baseMaintenanceFormData.repeated,
              durationSeconds: 16000,
            },
          }}
        />,
      );
      pom.el.duration.should("have.value", "4:26:40");
    });
    it("when the value goes out of format", () => {
      cy.mount(
        <TestingComponent
          baseMaintenance={{
            ...baseMaintenanceFormData,
            repeated: {
              ...baseMaintenanceFormData.repeated,
              durationSeconds: 40,
            },
          }}
        />,
      );
      pom.el.duration.should("have.value", "0:0:40");
      pom.el.duration.type("1");
      pom.el.duration.should(
        "have.css",
        "border-color",
        "rgb(200, 19, 38)", // this is var(--spark-color-coral-shade1);
      );
    });
  });

  describe("`Repeat - day of week` maintenance form", () => {
    const expectedMaintenance: enhancedEimSlice.ScheduleMaintenance = {
      ...baseMaintenanceFormData,
      type: "repeat-weekly",
      repeated: {
        cronHours: "17",
        cronMinutes: "32",
        cronDayWeek: "1,3",
        cronMonth: "6,8,12",
        cronDayMonth: "*",
      },
    };
    beforeEach(() => {
      cy.mount(
        <TestingComponent
          baseMaintenance={{
            ...baseMaintenanceFormData,
            type: "repeat-weekly",
          }}
        />,
      );
    });
    it("test duration", () => {
      pom.el.duration.clear().type("50");
      pom.el.duration.should("have.value", "0:0:50");
    });
    it("fills day of week inputs", () => {
      pom.el.startTime.type(`17:${expectedMaintenance.repeated?.cronMinutes}`);
      pom.el.duration.clear().type("50");
      pom.weekdaysMultiDropdown.selectFromMultiDropdown([
        "Monday",
        "Wednesday",
      ]);
      pom.weekdaysMultiDropdown.root.click();
      pom.monthsMultiDropdown.selectFromMultiDropdown([
        "June",
        "August",
        "December",
      ]);
      pom.monthsMultiDropdown.root.click();

      cyGet("testCronTime").should(
        "have.text",
        `${expectedMaintenance.repeated?.cronHours}:${expectedMaintenance.repeated?.cronMinutes}`,
      );
      cyGet("testCronDayOfWeek").should(
        "have.text",
        expectedMaintenance.repeated?.cronDayWeek,
      );
      cyGet("testCronMonth").should(
        "have.text",
        expectedMaintenance.repeated?.cronMonth,
      );
    });

    describe("when initialValue is provided", () => {
      beforeEach(() => {
        cy.mount(
          <TestingComponent
            baseMaintenance={{
              ...expectedMaintenance,
              repeated: {
                ...expectedMaintenance.repeated,
                durationSeconds: 8000,
              },
            }}
          />,
        );
      });

      it("should substitute expected values", () => {
        pom.el.startTime.should(
          "have.value",
          `17:${expectedMaintenance.repeated?.cronMinutes}`,
        );
        pom.el.duration.should("have.value", "2:13:20");
        pom.monthsMultiDropdown.verifyMultiDropdownSelections([
          "June",
          "August",
          "December",
        ]);
        pom.weekdaysMultiDropdown.verifyMultiDropdownSelections([
          "Monday",
          "Wednesday",
        ]);
      });
    });
  });

  describe("should fill `Repeat - day of month` maintenance form", () => {
    const expectedMaintenance: enhancedEimSlice.ScheduleMaintenance = {
      ...baseMaintenanceFormData,
      type: "repeat-monthly",
      repeated: {
        cronHours: "17",
        cronMinutes: "32",
        cronDayWeek: "*",
        cronMonth: "2,6,8,12",
        cronDayMonth: "1,3,31",
      },
    };
    beforeEach(() => {
      cy.mount(
        <TestingComponent
          baseMaintenance={{
            ...baseMaintenanceFormData,
            type: "repeat-monthly",
          }}
        />,
      );
    });
    it("fills day of month inputs", () => {
      pom.el.startTime.type(`17:${expectedMaintenance.repeated?.cronMinutes}`);
      pom.el.duration.clear().type("50");
      pom.dayNumbersMultiDropdown.selectFromMultiDropdown(["1", "3", "31"]);
      pom.dayNumbersMultiDropdown.root.click();
      pom.monthsMultiDropdown.selectFromMultiDropdown([
        "February",
        "June",
        "August",
        "December",
      ]);
      pom.monthsMultiDropdown.root.click();

      cyGet("testCronTime").should(
        "have.text",
        `${expectedMaintenance.repeated?.cronHours}:${expectedMaintenance.repeated?.cronMinutes}`,
      );
      cyGet("testCronMonth").should(
        "have.text",
        expectedMaintenance.repeated?.cronMonth,
      );
      cyGet("testCronDayOfMonth").should(
        "have.text",
        expectedMaintenance.repeated?.cronDayMonth,
      );
    });

    describe("when initialValue is provided", () => {
      beforeEach(() => {
        cy.mount(
          <TestingComponent
            baseMaintenance={{
              ...expectedMaintenance,
              repeated: {
                ...expectedMaintenance.repeated,
                durationSeconds: 8000,
              },
            }}
          />,
        );
      });

      it("should substitute expected values", () => {
        pom.el.startTime.should(
          "have.value",
          `17:${expectedMaintenance.repeated?.cronMinutes}`,
        );
        pom.el.duration.should("have.value", "2:13:20");
        pom.monthsMultiDropdown.verifyMultiDropdownSelections([
          "February",
          "June",
          "August",
          "December",
        ]);
        pom.dayNumbersMultiDropdown.verifyMultiDropdownSelections([
          "1",
          "3",
          "31",
        ]);
      });

      it("should see selection on day `31` when countNextMonthOnTzGMT is true", () => {
        // When user selects in EST time 2,6,31
        // which in background gets converted to GMT 3,7 of selected month(s) and 1 of {selected month(s) + 1}
        cy.mount(
          <TestingComponent
            initialTimezone={{
              label: "America/New_York (GMT-04:00)",
              tzCode: "America/New_York",
              utc: "(GMT-04:00)",
            }}
            baseMaintenance={{
              ...expectedMaintenance,
              type: "repeat-monthly",
              repeated: {
                ...expectedMaintenance.repeated,
                // 3:45AM GMT is EST 11:45PM previous day
                cronHours: "3",
                cronMinutes: "45",
                cronDayMonth: "3,7",
                durationSeconds: 8000,
                countNextMonthOnTzGMT: true,
              },
            }}
          />,
        );
        // `3,7 of selected month and 1 of {selectedMonth+1}` in GMT is 2,6,31 of selected month in EST
        pom.dayNumbersMultiDropdown.verifyMultiDropdownSelections([
          "2",
          "6",
          "31",
        ]);
      });

      it("should see selection on day `1` when countPrevMonthOnTzGMT is true", () => {
        // When user is in IST (India) time and selects 1,4,7 of selected months
        // this get converted in background to 31 of previous months and 3,6 of selected months
        cy.mount(
          <TestingComponent
            initialTimezone={{
              label: "Asia/Calcutta (GMT+05:30)",
              tzCode: "Asia/Calcutta",
              utc: "(GMT+05:30)",
            }}
            baseMaintenance={{
              ...expectedMaintenance,
              type: "repeat-monthly",
              repeated: {
                ...expectedMaintenance.repeated,
                // 11PM GMT is 4:30AM IST next day
                cronHours: "23",
                cronMinutes: "0",
                cronDayMonth: "3,6",
                durationSeconds: 8000,
                countPrevMonthOnTzGMT: true,
              },
            }}
          />,
        );

        // `31 of {selectedMonth-1} and 3,6 of selected month` in GMT is 1,4,7 of selected month in IST
        pom.dayNumbersMultiDropdown.verifyMultiDropdownSelections([
          "1",
          "4",
          "7",
        ]);
      });
    });
  });
});
