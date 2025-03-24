/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedEimSlice } from "@orch-ui/apis";
import { cyGet } from "@orch-ui/tests";
import { assignedWorkloadHostOne as hostOne } from "@orch-ui/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SingleScheduleMaintenanceForm } from "./SingleScheduleMaintenanceForm";
import { SingleScheduleMaintenanceFormPom } from "./SingleScheduleMaintenanceForm.pom";

const TestingComponent = ({
  baseMaintenance,
}: {
  baseMaintenance: enhancedEimSlice.ScheduleMaintenance;
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
  const [timezone] = useState({
    label: "Greenwich Meridian Time / Universal Coordinated Time",
    tzCode: "UTC",
    utc: "+00:00",
  });
  const [maintenance, setMaintenance] =
    useState<enhancedEimSlice.ScheduleMaintenance>(baseMaintenance);
  return (
    <>
      <SingleScheduleMaintenanceForm
        maintenance={maintenance}
        onUpdate={setMaintenance}
        timezone={timezone}
        formControl={formControl}
        formErrors={formErrors}
      />
      {/* Only for test purpose */}
      <div>
        <div data-cy="testStartSeconds">{maintenance.single?.startSeconds}</div>
        <div data-cy="testEndSeconds">{maintenance.single?.endSeconds}</div>
      </div>
    </>
  );
};

const pom = new SingleScheduleMaintenanceFormPom();
describe("<SingleScheduleMaintenanceForm/>", () => {
  const baseMaintenanceFormData: enhancedEimSlice.ScheduleMaintenance = {
    type: "no-repeat",
    name: "",
    scheduleStatus: "SCHEDULE_STATUS_UNSPECIFIED",
    targetHost: hostOne,
  };
  const expectedMaintenance: enhancedEimSlice.ScheduleMaintenance = {
    name: "Single Maintenance",
    scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
    type: "no-repeat",
    targetHost: hostOne,
    single: {
      startSeconds: 1707859920,
      endSeconds: 1707863460,
    },
  };
  const startDate = "2024-02-13";
  const startTime = "21:32";
  const endTime = "22:31";

  beforeEach(() => {
    cy.mount(<TestingComponent baseMaintenance={baseMaintenanceFormData} />);
    pom.root.should("exist");
  });

  describe("when isOpenEnded is set false.", () => {
    it("should show endSeconds", () => {
      pom.fillSingleScheduleStartDate(startDate, startTime);
      pom.fillSingleScheduleEndDate(startDate, endTime);

      cyGet("testStartSeconds").should(
        "have.text",
        expectedMaintenance.single?.startSeconds,
      );

      cyGet("testEndSeconds").should(
        "have.text",
        expectedMaintenance.single?.endSeconds,
      );
    });
  });

  describe("when isOpenEnded is set false", () => {
    beforeEach(() => {
      cy.mount(
        <TestingComponent
          baseMaintenance={{
            ...baseMaintenanceFormData,
            single: {
              ...baseMaintenanceFormData.single,
              isOpenEnded: true,
            },
          }}
        />,
      );
    });

    it("should not endSeconds", () => {
      pom.fillSingleScheduleStartDate(startDate, startTime);

      cyGet("testStartSeconds").should(
        "have.text",
        expectedMaintenance.single?.startSeconds,
      );

      pom.el.endDate.should("not.exist");
      pom.el.endTime.should("not.exist");
    });
  });

  describe("when initialValue is provided", () => {
    beforeEach(() => {
      cy.mount(<TestingComponent baseMaintenance={expectedMaintenance} />);
    });

    it("should substitute expected values", () => {
      pom.el.startDate.should("have.value", startDate);
      pom.el.startTime.should("have.value", startTime);
      pom.el.endDate.should("have.value", startDate);
      pom.el.endTime.should("have.value", endTime);
    });
  });
});
