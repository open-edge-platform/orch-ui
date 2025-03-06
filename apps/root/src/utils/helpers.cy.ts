/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cm, eim } from "@orch-ui/apis";
import { defaultActiveProject } from "@orch-ui/tests";
import { SharedStorage } from "@orch-ui/utils";
import { setupStore } from "../store/store";
import { getHostsList, getHostStatus } from "./helpers";

describe("DeploymentsContainer helpers functions", () => {
  describe("getHostsList", () => {
    describe("when the API respond correctly", () => {
      const clusters: cm.ClusterDetailInfo[] = [
        {
          name: "cluster-1",
          nodes: [{ id: "node1-guid" }],
        },
        {
          name: "cluster-2",
          nodes: [{ id: "node2-guid" }, { id: "node3-guid" }],
        },
      ];

      const nodeGuids = ["node1-guid", "node2-guid", "node3-guid"];

      beforeEach(() => {
        SharedStorage.project = defaultActiveProject;
        clusters.forEach((c) => {
          cy.intercept("GET", `**v2/**/clusters/${c.name}`, c).as("getCluster");
        });
      });

      // eslint-disable-next-line cypress/no-async-tests
      it("should fetch a list of Host Ids", async () => {
        const dispatch = setupStore().dispatch;
        const res = await getHostsList(
          dispatch,
          clusters.map((c) => c.name!),
        );

        // check we make one call per cluster
        cy.get("@getCluster.all").should("have.length", clusters.length);

        // check to see that all nodes are reported
        expect(res.length).to.equal(nodeGuids.length);
        res.forEach((n) => {
          expect(nodeGuids).to.contain(n);
        });
      });
    });
    describe("when CM returns a 500 error", () => {
      it("should return an error", (done) => {
        cy.intercept("GET", "**/v1/**/clusters/*", {
          statusCode: 500,
          body: { Offset: 1 },
        }).as("getCluster");
        const dispatch = setupStore().dispatch;
        getHostsList(dispatch, ["cluster-1"])
          .then(() => {
            done(new Error("getHostsList should have thrown an error"));
          })
          .catch((err) => {
            expect(err.toString()).to.contain(
              "Error: getV1ClustersByClusterName returned error",
            );
            done();
          });
      });
    });
  });

  describe("getHostsStatus", () => {
    const nodes: eim.HostRead[] = [
      {
        resourceId: "host-1",
        name: "host-1",
        uuid: "node1-guid",
        hostStatusIndicator: "STATUS_INDICATION_IDLE",
        hostStatus: "Running",
        hostStatusTimestamp: 123,
      },
      {
        resourceId: "host-2",
        name: "host-2",
        uuid: "node2-guid",
        hostStatusIndicator: "STATUS_INDICATION_UNSPECIFIED",
        hostStatus: "Unknown",
        hostStatusTimestamp: 123,
      },
      {
        resourceId: "host-3",
        name: "host-3",
        uuid: "node3-guid",
        hostStatusIndicator: "STATUS_INDICATION_UNSPECIFIED",
        hostStatus: "Unknown",
        hostStatusTimestamp: 123,
      },
    ];

    beforeEach(() => {
      const mockRes: eim.GetV1ProjectsByProjectNameComputeHostsApiResponse = {
        hosts: [],
        hasNext: false,
        totalElements: 0,
      };
      SharedStorage.project = defaultActiveProject;
      nodes.forEach((n) => {
        cy.intercept(
          "GET",
          `**/v1/projects/${
            SharedStorage.project?.name
          }/compute/hosts?uuid=${n.uuid!}`,
          {
            ...mockRes,
            hosts: [n],
          },
        ).as("getNodes");
      });
    });

    // eslint-disable-next-line cypress/no-async-tests
    it("should return a summary of Hosts statuses", async () => {
      const dispatch = setupStore().dispatch;
      const res = await getHostStatus(
        dispatch,
        nodes.map((n) => n.uuid!),
      );

      cy.get("@getNodes.all").should("have.length", nodes.length);

      expect(res.total).to.equal(nodes.length);
      expect(res.notRunning).to.equal(2);
      expect(res.running).to.equal(1);
    });
  });
});
