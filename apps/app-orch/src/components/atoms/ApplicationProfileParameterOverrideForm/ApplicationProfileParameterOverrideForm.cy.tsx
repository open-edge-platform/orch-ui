/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { applicationOne, profileTwo } from "@orch-ui/utils";
import { setupStore } from "../../../store";
import { initialState } from "../../../store/reducers/setupDeployment";
import {
  removeEmptyObjects,
  removeEmptyValues,
} from "../ApplicationProfileOverrideValueComboBoxCell/ApplicationProfileOverrideValueComboBoxCell";
import ApplicationProfileParameterOverrideForm from "./ApplicationProfileParameterOverrideForm";
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
      />,
    );
    pom.empty.root.should("exist");
  });

  it("should set entered values in redux store", () => {
    const store = setupStore({
      setupDeployment: {
        ...initialState,
      },
    });
    // @ts-ignore
    window.store = store;
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
        />
        <button data-cy="testHelper">test helper</button>
      </>,
      {
        reduxStore: store,
      },
    );

    pom.selectParam(0, "value1");
    cyGet("testHelper").click();
    cy.window()
      .its("store")
      .invoke("getState")
      .then(() => {
        expect(
          store.getState().setupDeployment.profileParameterOverrides[
            applicationOne.name
          ].values,
        ).to.deep.equal({ ...expectedValue.values });
      });

    pom.selectParam(1, "12");
    cyGet("testHelper").click();

    const expectedValueUpdate = {
      ...expectedValue,
      values: {
        ...expectedValue.values,
        version: "value4",
      },
    };
    pom.typeParam(1, "value4");
    cyGet("testHelper").click();
    cy.window()
      .its("store")
      .invoke("getState")
      .then(() => {
        expect(
          store.getState().setupDeployment.profileParameterOverrides[
            applicationOne.name
          ].values,
        ).to.deep.equal({ ...expectedValueUpdate.values });
      });
  });

  it("display preselected values", () => {
    const store = setupStore({
      setupDeployment: {
        ...initialState,
        profileParameterOverrides: {
          [applicationOne.name]: {
            appName: applicationOne.name,
            values: {
              image: { containerDisk: { pullSecret: "value1" } },
              version: "12",
            },
          },
        },
      },
    });
    // @ts-ignore
    window.store = store;
    cy.mount(
      <ApplicationProfileParameterOverrideForm
        application={applicationOne}
        applicationProfile={{
          name: "profile1",
          parameterTemplates: profileTwo.parameterTemplates!,
        }}
      />,
      { reduxStore: store },
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
