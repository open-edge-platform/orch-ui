/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { eim } from "@orch-ui/apis";
import { ApiErrorPom, EmptyPom, RibbonPom } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { LifeCycleState } from "../../../store/hostFilterBuilder";
import { setupStore } from "../../../store/store";
import { HostConfigPom } from "../../pages/HostConfig/HostConfig.pom";
import HostsTable from "./HostsTable";
import HostsTablePom from "./HostsTable.pom";

const pom = new HostsTablePom();
const ribbonPom = new RibbonPom("table");
const emptyPom = new EmptyPom();
const apiErrorPom = new ApiErrorPom();
const hostConfigPom = new HostConfigPom();
interface TestComponentProps {
  selectable: boolean;
}

const TestCompoent = ({ selectable }: TestComponentProps) => {
  const [selectedHosts, setSelectedHosts] = useState<eim.HostRead[]>([]);
  const { messageBanner } = useAppSelector(
    (state) => state.notificationStatusList,
  );

  return (
    <>
      <p data-cy="testMessage">{messageBanner?.text}</p>
      <HostsTable
        selectable={selectable}
        unsetSelectedHosts={() => setSelectedHosts([])}
        onHostSelect={(row: eim.HostRead, isSelected: boolean) => {
          setSelectedHosts((prev) => {
            return isSelected
              ? prev.concat(row)
              : prev.filter((host) => host.resourceId !== row.resourceId);
          });
        }}
        selectedHosts={selectedHosts}
      />
      ,
    </>
  );
};

describe("<HostsTable/>", () => {
  describe("when the API return a list of hosts", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total10]);
      cy.mount(<HostsTable lifecycleState={LifeCycleState.All} />);
      pom.waitForApis();
    });
    it("should render the hosts correctly", () => {
      const expectedLength = 10;
      // The `10` comes from generateHostResponse(10) in the Pom mock
      pom.table.getRows().should("have.length", expectedLength);

      pom.table
        .getTotalItemCount()
        .should("contain.text", `${expectedLength} items found`);
      pom.table
        .getNextPageButton()
        .should("have.class", "spark-button-disabled");
      pom.table
        .getPreviousPageButton()
        .should("have.class", "spark-button-disabled");

      [...Array(10).keys()].forEach((i) => {
        pom.table.root.contains(`Host ${i}`);
      });
    });

    it("should render the provided actions", () => {
      pom.table.getColumnHeader(7).contains("Action").should("have.length", 1);
      //TODO: table behavior is more dynamic on the action options, need to re-visit this
      // pom.table
      //   .getRows()
      //   .find(`td:contains(${renderedActionCol})`)
      //   .should("have.length", 10); // This `10` comes from current mocked intercept api
    });

    it("should expand a row and show details", () => {
      pom.table.getCell(1, 1).click();
      pom.hostRowDetails.root.should("be.visible");
    });
  });

  it("handle empty", () => {
    pom.interceptApis([pom.api.getHostsListEmpty]);
    cy.mount(<HostsTable />);
    pom.waitForApis();
    emptyPom.root.should("be.visible");
  });

  it("handle 500 error", () => {
    pom.interceptApis([pom.api.getHostsListError500]);
    cy.mount(<HostsTable />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });

  describe("search filter test", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total18]);
      cy.mount(<HostsTable />);
      pom.waitForApis();
    });

    //TODO: needs modifications for the way the new table works
    xit("pass search value to GET request", () => {
      pom.table.getTotalItemCount().should("contain.text", "18 items found");

      pom.interceptApis([pom.api.getHostsListSuccessWithSearchFilter]);
      ribbonPom.el.search.type("testingSearch");
      pom.waitForApis();

      pom.table.getTotalItemCount().should("contain.text", "5 items found");
      pom.table.root
        .find("td:contains(testingSearch)")
        .should("have.length", 5);
    });
  });

  describe("pagination tests", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total18]);
      cy.mount(<TestCompoent selectable />);
      pom.waitForApis();
    });

    it("should show all rows on page1 and page2", () => {
      pom.table.getRows().should("have.length", 10);

      pom.interceptApis([pom.api.getHostsListSuccessPage2]);
      pom.table.getPageButton(2).click();
      pom.waitForApis();

      pom.table.getRows().should("have.length", 8);
    });

    it("should select 2nd row of page 1", () => {
      pom.getHostCheckboxByName("Host 1").click();
      pom.getHostCheckboxByName("Host 1").should("be.checked");

      pom.interceptApis([pom.api.getHostsListSuccessPage2]);
      pom.table.getPageButton(2).click();
      pom.waitForApis();

      pom.getHostCheckboxByName("Host 1").should("not.be.checked");
    });

    it("should select 2nd row of page 2", () => {
      pom.interceptApis([
        pom.api.getHostsListSuccessPage1Total18,
        pom.api.getHostsListSuccessPage2,
      ]);
      pom.table.getPageButton(2).click();

      pom.getHostCheckboxByName("Host 11").click();
      pom.getHostCheckboxByName("Host 11").should("be.checked");

      pom.table.getPageButton(1).click();

      pom.getHostCheckboxByName("Host 1").should("not.be.checked");
    });
  });

  describe("when the onDataLoad prop is provided", () => {
    let onDataLoad;
    beforeEach(() => {
      onDataLoad = cy.stub().as("onDataLoad");
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total10]);
      cy.mount(<HostsTable onDataLoad={onDataLoad} />);
      pom.waitForApis();
    });
    it("should invoke the callback", () => {
      cy.get("@onDataLoad").should("have.been.calledOnce");
    });
  });

  describe("when the Onboarded hosts listed", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total10]);
      cy.mount(<TestCompoent selectable />, {
        reduxStore: setupStore({
          hostFilterBuilder: {
            lifeCycleState: LifeCycleState.Onboarded,
          },
        }),
      });
      pom.waitForApis();
    });
    it("should show selection banner", () => {
      pom.getHostCheckboxByName("Host 0").click();
      pom.getHostCheckboxByName("Host 0").should("be.checked");

      pom.el.selectedHostsBanner.should("be.visible");
      pom.el.selectedHostsBanner.contains("1 item selected");
      pom.el.onboardBtn.should("have.class", "spark-button-disabled");
      pom.el.provisionBtn.should("not.have.class", "spark-button-disabled");
      pom.el.cancelBtn.should("be.visible").click();

      pom.el.selectedHostsBanner.should("not.exist");
      pom.getHostCheckboxByName("Host 0").should("not.be.checked");
    });

    it("should allow user to provision the hosts", () => {
      hostConfigPom.interceptApis([
        hostConfigPom.api.patchComputeHostsAndHostId,
      ]);

      pom.getHostCheckboxByName("Host 0").click();
      pom.getHostCheckboxByName("Host 0").should("be.checked");

      pom.el.provisionBtn.click();
      cy.get("#pathname").contains("/unconfigured-host/configure");
    });
  });

  describe("when the Registred hosts are listed", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total10]);
      cy.mount(<TestCompoent selectable />, {
        reduxStore: setupStore({
          hostFilterBuilder: {
            lifeCycleState: LifeCycleState.Registered,
          },
        }),
      });
      pom.waitForApis();
    });
    it("should show selection banner", () => {
      pom.getHostCheckboxByName("Host 0").click();
      pom.getHostCheckboxByName("Host 0").should("be.checked");

      pom.el.selectedHostsBanner.should("be.visible");
      pom.el.selectedHostsBanner.contains("1 item selected");
      pom.el.onboardBtn.should("not.have.class", "spark-button-disabled");
      pom.el.provisionBtn.should("have.class", "spark-button-disabled");
      pom.el.cancelBtn.should("be.visible").click();

      pom.el.selectedHostsBanner.should("not.exist");
      pom.getHostCheckboxByName("Host 0").should("not.be.checked");
    });

    it("should allow user to onboard the hosts", () => {
      pom.interceptApis([pom.api.patchOnboardHost]);

      pom.getHostCheckboxByName("Host 0").click();
      pom.getHostCheckboxByName("Host 1").click();
      pom.getHostCheckboxByName("Host 0").should("be.checked");
      pom.getHostCheckboxByName("Host 1").should("be.checked");

      pom.el.onboardBtn.click();
      pom.waitForApi([pom.api.patchOnboardHost]);
      cyGet("testMessage").should(
        "contain.text",
        "Hosts are now being onboarded.",
      );
    });

    it("should handle onboarding error", () => {
      pom.interceptApis([pom.api.patchOnboardHostError]);

      pom.getHostCheckboxByName("Host 0").click();
      pom.getHostCheckboxByName("Host 1").click();
      pom.getHostCheckboxByName("Host 0").should("be.checked");
      pom.getHostCheckboxByName("Host 1").should("be.checked");

      pom.el.onboardBtn.click();
      pom.waitForApi([pom.api.patchOnboardHostError]);
      cyGet("testMessage").should(
        "contain.text",
        "Failed to onboard hosts Host 0, Host 1 !",
      );
    });
  });

  describe("when the Provisioned hosts, All the hosts are listed", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total10]);
      cy.mount(<TestCompoent selectable={false} />, {
        reduxStore: setupStore({
          hostFilterBuilder: {
            lifeCycleState: LifeCycleState.Provisioned,
          },
        }),
      });
      pom.waitForApis();
    });
    it("should not allow selection", () => {
      pom.table.el.rowSelectCheckbox.should("not.exist");
    });
  });
});
