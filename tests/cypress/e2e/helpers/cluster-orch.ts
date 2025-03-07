/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export const deleteClusterViaApi = (project: string, clusterName: string) => {
  return cy
    .authenticatedRequest({
      method: "DELETE",
      url: `/v1/projects/${project}/clusters/${clusterName}`,
    })
    .then((response) => {
      const success = response.status === 200 || response.status === 404;
      expect(success).to.be.true;
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
