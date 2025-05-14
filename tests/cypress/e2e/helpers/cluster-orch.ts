/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { cm } from "@orch-ui/apis";
import Chainable = Cypress.Chainable;

export const deleteClusterViaApi = (project: string, clusterName: string) => {
  return cy
    .authenticatedRequest({
      method: "DELETE",
      url: `/v2/projects/${project}/clusters/${clusterName}`,
    })
    .then((response) => {
      const success = response.status === 204 || response.status === 404;
      expect(
        success,
        `Unexpected HTTP status: ${response.status}. Valid values are (204, 404)`,
      ).to.be.true;
    });
};

export function isClusterCreateTestDataPresent(testData) {
  return (
    "region" in testData &&
    "site" in testData &&
    "hostName" in testData &&
    "clusterName" in testData
  );
}

export const createClusterViaApi = (
  project: string,
  clusterPayload: cm.ClusterSpec,
) => {
  return cy
    .authenticatedRequest({
      method: "POST",
      url: `/v2/projects/${project}/clusters`,
      body: clusterPayload,
    })
    .then((response) => {
      expect(response.status).to.equal(201);
    });
};

export const getClusterTemplatesViaApi = (project): Chainable => {
  return cy
    .authenticatedRequest({
      method: "GET",
      url: `/v2/projects/${project}/templates`,
    })
    .then((response) => {
      expect(response.status).to.equal(200);
      return response.body;
    });
};
