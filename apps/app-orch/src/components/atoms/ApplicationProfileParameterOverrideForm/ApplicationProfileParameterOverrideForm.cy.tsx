/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { applicationOne, profileTwo } from "@orch-ui/utils";
import ApplicationProfileParameterOverrideForm, {
  removeEmptyObjects,
  removeEmptyValues,
} from "./ApplicationProfileParameterOverrideForm";
import ApplicationProfileParameterOverrideFormPom from "./ApplicationProfileParameterOverrideForm.pom";

const pom = new ApplicationProfileParameterOverrideFormPom();

describe("<ApplicationProfileParameterOverrideForm />", () => {
  it("should render parameter on name, when there is no display name", () => {
    cy.mount(
      <ApplicationProfileParameterOverrideForm
        application={applicationOne}
        applicationProfile={{
          ...profileTwo,
          parameterTemplates: [{ name: "profile 1", type: "" }],
        }}
        parameterOverrides={{ appName: "Application 1" }}
      />,
    );
    pom.tableUtil.getCellBySearchText("profile 1").should("exist");
  });

  it("render parameter overrides using paramterTemplate of the application profile", () => {
    cy.mount(
      <ApplicationProfileParameterOverrideForm
        application={applicationOne}
        applicationProfile={{
          ...profileTwo,
          parameterTemplates: [
            { name: "profile 1", type: "" },
            { name: "profile 2", type: "", displayName: "Profile 2" },
          ],
        }}
        parameterOverrides={{ appName: "Application 1" }}
      />,
    );
    pom.root.should("exist");
    pom.table
      .getRows()
      .should("have.length", profileTwo.parameterTemplates?.length);
    pom.tableUtil.getCellBySearchText("profile 1").should("exist");
    pom.tableUtil.getCellBySearchText("Profile 2").should("exist");
  });

  it("handles empty", () => {
    cy.mount(
      <ApplicationProfileParameterOverrideForm
        application={applicationOne}
        applicationProfile={{
          name: "profile1",
          parameterTemplates: [],
        }}
        parameterOverrides={{ appName: "Application 1" }}
      />,
    );
    pom.empty.root.should("exist");
  });

  it("will test onParameterUpdate method", () => {
    const expectedValue = {
      appName: "Application 1",
      values: {
        image: {
          containerDisk: {
            pullSecret: "value1",
          },
        },
      },
    };

    cy.mount(
      <>
        <ApplicationProfileParameterOverrideForm
          application={applicationOne}
          applicationProfile={{
            name: "profile1",
            parameterTemplates: profileTwo.parameterTemplates!,
          }}
          parameterOverrides={{ appName: "Application 1" }}
          onParameterUpdate={cy.stub().as("onParameterUpdate")}
        />
        <button data-cy="testHelper">test helper</button>
      </>,
    );
    pom.selectParam(0, "value1");
    cyGet("testHelper").click();
    cy.get("@onParameterUpdate").should("have.been.calledOnce");
    cy.get("@onParameterUpdate").should("be.calledWith", expectedValue);

    pom.selectParam(1, "12");
    cyGet("testHelper").click();
    cy.get("@onParameterUpdate").should("have.been.calledTwice");

    const expectedValueUpdate = {
      ...expectedValue,
      values: {
        ...expectedValue.values,
        version: "value4",
      },
    };
    pom.typeParam(1, "value4");
    cyGet("testHelper").click();
    cy.get("@onParameterUpdate").should("have.been.calledThrice");
    cy.get("@onParameterUpdate").should("be.calledWith", expectedValueUpdate);
  });

  it("display preselected values", () => {
    cy.mount(
      <ApplicationProfileParameterOverrideForm
        application={applicationOne}
        applicationProfile={{
          name: "profile1",
          parameterTemplates: profileTwo.parameterTemplates!,
        }}
        parameterOverrides={{
          appName: "Application 1",
          values: {
            // image.containerDisk.pullSecret="value 1"
            image: { containerDisk: { pullSecret: "value1" } },
            version: "12",
          },
        }}
        onParameterUpdate={cy.stub().as("onParameterUpdate")}
      />,
    );
    pom.isSelected(0, "value1");
    pom.isSelected(1, "12");
  });
});

describe("ApplicationProfileParameterOverrideForm functions", () => {
  it("removeEmptyValues should remove keys with empty values", () => {
    const obj = {
      empty: "",
      nested: {
        filled: "value",
        empty: "",
      },
    };
    removeEmptyValues(obj);
    expect(obj).to.deep.equal({
      nested: {
        filled: "value",
      },
    });
  });

  it("removeEmptyObjects should remove all empty keys if objects", () => {
    const obj = {
      nested: {
        filled: "value",
      },
      empty: {},
      emptyNested: {
        filled: "value",
        empty: {},
      },
    };
    expect(removeEmptyObjects(obj)).to.deep.equal({
      nested: {
        filled: "value",
      },
      emptyNested: {
        filled: "value",
      },
    });
  });
});
