/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, infra } from "@orch-ui/apis";
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
          nodes: [{ id: "host-2" }],
        },
        {
          name: "cluster-2",
          nodes: [{ id: "host-1" }, { id: "host-3" }],
        },
      ];

      const nodeIds = ["host-1", "host-3", "host-2"];

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
        expect(res.length).to.equal(nodeIds.length);
        res.forEach((n) => {
          expect(nodeIds).to.contain(n);
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
    const nodes: infra.HostResourceRead[] = [
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
      const mockRes: infra.HostServiceListHostsApiResponse = {
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
          }/compute/hosts?filter=resourceId%3D%27${n.resourceId}%27`,
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
        nodes.map((n) => n.resourceId!),
      );

      cy.get("@getNodes.all").should("have.length", nodes.length);

      expect(res.total).to.equal(nodes.length);
      expect(res.notRunning).to.equal(2);
      expect(res.running).to.equal(1);
    });
  });
});
