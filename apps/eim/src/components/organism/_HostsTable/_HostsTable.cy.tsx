/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  ApiErrorPom,
  EmptyPom,
  RibbonPom,
  TableColumn,
} from "@orch-ui/components";
import {
  SharedStorage,
  unassignedHostTwoId,
  unconfiguredHostTwoId,
} from "@orch-ui/utils";
import { HostTableColumn } from "../../../utils/HostTableColumns";
import _HostsTable, { HostCategory } from "./_HostsTable";
import _HostsTablePom, {
  configuredColumns,
  unconfiguredColumn,
} from "./_HostsTable.pom";

const pom = new _HostsTablePom();
const ribbonPom = new RibbonPom("table");
const emptyPom = new EmptyPom();
const apiErrorPom = new ApiErrorPom();
describe("<_HostsTable/>", () => {
  describe("when the API return a list of hosts", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total10]);
      cy.mount(<_HostsTable columns={configuredColumns} sort={[1]} />);
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
      const renderedActionCol = "Test Value";
      const columns: TableColumn<eim.HostRead>[] = [
        HostTableColumn.name("../"),
        HostTableColumn.site,
        HostTableColumn.guid,
        HostTableColumn.serial,
        HostTableColumn.status,
        HostTableColumn.actions(() => <>{renderedActionCol}</>),
      ];

      cy.mount(<HostsTable columns={columns} />);

      pom.table.getColumnHeader(5).contains("Action").should("have.length", 1);
      pom.table
        .getRows()
        .find(`td:contains(${renderedActionCol})`)
        .should("have.length", 10); // This `10` comes from current mocked intercept api
    });
  });
  // Need to check
  // it("should apply filter for site", () => {
  //   pom.interceptApis([pom.api.getHostsListSuccessWithSiteFilter]);
  //   cy.mount(
  //     <HostsTable
  //       filters={{ projectName : SharedStorage.project?.name ?? "",siteId: "test-site" }}
  //       columns={configuredColumns}
  //     />,
  //   );
  //   pom.waitForApis();
  // });

  it("handle empty", () => {
    pom.interceptApis([pom.api.getHostsListEmpty]);
    cy.mount(<HostsTable columns={configuredColumns} />);
    pom.waitForApis();
    emptyPom.root.should("be.visible");
  });

  it("handle 500 error", () => {
    pom.interceptApis([pom.api.getHostsListError500]);
    cy.mount(<HostsTable columns={configuredColumns} />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });

  describe("search filter test", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total18]);
      cy.mount(<HostsTable columns={configuredColumns} />);
      pom.waitForApis();
    });
    it("pass search value to GET request", () => {
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
      cy.mount(<HostsTable columns={configuredColumns} selectable />);
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

  describe("sorting tests", () => {
    beforeEach(() => {
      pom.interceptApis([
        pom.api.getHostsListSuccessWithOrderAsc,
        pom.api.getHostsListSuccessWithOrderDesc,
      ]);
      cy.mount(<HostsTable columns={configuredColumns} sort={[0]} />);
    });
    it("should initialize with sort asc", () => {
      cy.get(`@${pom.api.getHostsListSuccessWithOrderAsc}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(/orderBy=name%20asc/);
          expect(match && match.length > 0).to.be.eq(true);
        });
    });
    it("should sort desc", () => {
      pom.table.getColumnHeaderSortArrows(0).click();
      cy.get(`@${pom.api.getHostsListSuccessWithOrderDesc}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(/orderBy=name%20desc/);
          expect(match && match.length > 0).to.be.eq(true);
        });
    });
  });

  describe("as part of an MFE", () => {
    const route = (path: string) => `/infrastructure/${path}/`;
    const unconfiguredRoute = `${route(
      "unconfigured-host",
    )}${unconfiguredHostTwoId}`;
    const configuredRoute = `${route("host")}${unassignedHostTwoId}`;
    const activeRoute = `${route("host")}host-3uc8eh0w`;

    const routeConfig = (jsx: JSX.Element, base: string) => ({
      routerProps: { initialEntries: [base] },
      routerRule: [
        {
          path: base,
          element: jsx,
        },
        {
          path: unconfiguredRoute,
          element: <h1 id="unconfigured">Unconfigured</h1>,
        },
        {
          path: configuredRoute,
          element: <h1 id="configured">Configured</h1>,
        },
        {
          path: activeRoute,
          element: <h1 id="active">Active</h1>,
        },
      ],
    });
    it("will route to details of onboarded host", () => {
      pom.interceptApis([pom.api.getOnboardedHosts]);
      cy.mount(
        null,
        routeConfig(
          <HostsTable
            filters={{
              projectName: SharedStorage.project?.name ?? "",
              siteId: "null",
            }}
            columns={unconfiguredColumn}
            category={HostCategory.Onboarded}
          />,
          route("unconfigured-hosts"),
        ),
      );
      pom.waitForApis();

      pom.table.getCellBySearchText("host-38fh47c0").find("a").click();
      cy.get("#pathname").contains(unconfiguredRoute);
    });
    it("will route to details of configured host", () => {
      pom.interceptApis([pom.api.getConfiguredHosts]);
      cy.mount(
        null,
        routeConfig(
          <HostsTable
            filters={{
              projectName: SharedStorage.project?.name ?? "",
              workloadMemberId: "null",
              siteId: "notnull",
            }}
            columns={configuredColumns}
            category={HostCategory.Configured}
          />,
          route("unassigned-hosts"),
        ),
      );
      pom.waitForApis();

      pom.table.getCellBySearchText(unassignedHostTwoId).find("a").click();
      cy.get("#pathname").contains(configuredRoute);
    });

    it("will route to details of active host", () => {
      pom.interceptApis([pom.api.getActiveHosts]);
      cy.mount(
        null,
        routeConfig(
          <HostsTable
            filters={{
              projectName: SharedStorage.project?.name ?? "",
              workloadMemberId: "notnull",
              siteId: "notnull",
            }}
            columns={configuredColumns}
            category={HostCategory.Active}
          />,
          route("hosts"),
        ),
      );
      pom.waitForApis();

      pom.table.getCellBySearchText("host-3uc8eh0w").find("a").click();
      cy.get("#pathname").contains(activeRoute);
    });
  });

  describe("when the onDataLoad prop is provided", () => {
    let onDataLoad;
    beforeEach(() => {
      onDataLoad = cy.stub().as("onDataLoad");
      pom.interceptApis([pom.api.getHostsListSuccessPage1Total10]);
      cy.mount(
        <HostsTable
          columns={configuredColumns}
          sort={[1]}
          onDataLoad={onDataLoad}
        />,
      );
      pom.waitForApis();
    });
    it("should invoke the callback", () => {
      cy.get("@onDataLoad").should("have.been.calledOnce");
    });
  });
});
