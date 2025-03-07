/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import {
  Flex,
  MetadataDisplay,
  MetadataPair,
  TableColumn,
} from "@orch-ui/components";
import { Heading } from "@spark-design/react";
import { useAppSelector } from "../../../../../store/hooks";
import { getCluster } from "../../../../../store/reducers/cluster";
import { getNodes } from "../../../../../store/reducers/nodes";
import { NodeTableColumns } from "../../../../../utils/NodeTableColumns";
import ClusterNodesTable from "../../../ClusterNodesTable/ClusterNodesTable";
import "./Review.scss";

export const dataCy = "review";

interface ReviewProps {
  accumulatedMeta: MetadataPair[];
}
const Review = ({ accumulatedMeta }: ReviewProps) => {
  const currentCluster = useAppSelector(getCluster);
  const currentNodes = useAppSelector(getNodes);

  const cy = { "data-cy": dataCy };
  const columns: TableColumn<cm.NodeInfo>[] = [
    NodeTableColumns.nameWithoutLink,
    NodeTableColumns.role,
    NodeTableColumns.os,
  ];

  return (
    <div {...cy} className="review">
      <Heading semanticLevel={6} className="review-category">
        Review
      </Heading>

      <Heading semanticLevel={6} className="name-category labelName">
        Cluster Details
      </Heading>

      <table className="cluster-detail-info">
        <tr>
          <td className="labelName">
            <p className="labelName">Cluster Name</p>
          </td>
          <td>
            <span data-cy="clusterName">{currentCluster.name}</span>
          </td>
        </tr>
        <tr>
          <td className="labelName">
            <p className="labelName">Cluster Template</p>
          </td>
          <td>
            <span data-cy="clusterTemplateName">{currentCluster.template}</span>
          </td>
        </tr>
      </table>

      <Heading semanticLevel={6} className="metadata-category  labelName">
        Deployment Configuration
      </Heading>

      <br />
      <Flex cols={[12]}>
        <MetadataDisplay metadata={accumulatedMeta} />
      </Flex>
      <Heading semanticLevel={6} className="host-ategory">
        Host Status
      </Heading>

      <ClusterNodesTable nodes={currentNodes} columns={columns} />
    </div>
  );
};

export default Review;
