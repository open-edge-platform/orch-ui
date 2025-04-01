/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { TableColumn } from "@orch-ui/components";
import { Button, Heading, Table } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { NodeTableColumns } from "../../../utils/NodeTableColumns";
import NodeRoleDropdown from "../NodeRoleDropdown/NodeRoleDropdown";

const dataCy = "clusterEditNodeReview";
export type NodeRoles = "all" | "controlplane" | "worker";

interface ClusterEditNodeReviewProps {
  /** final list of cluster nodes that will be seen in the table */
  clusterNodeList: cm.NodeInfo[];
  /** list of immutable cluster nodes, that were already present in cluster, i.e., before edit */
  configuredClusterNode?: cm.NodeInfo[];
  /** Notify any changes to node via the node dropdown */
  onNodeUpdate: (node: cm.NodeInfo, value: NodeRoles) => void;
  /** Notify click on Add Host button */
  onAddNode: () => void;
  /** Notify click on Remove Host button */
  onRemoveNode: (node: cm.NodeInfo) => void;
}

const ClusterEditNodeReview = ({
  clusterNodeList = [],
  configuredClusterNode = [],
  onNodeUpdate,
  onAddNode,
  onRemoveNode,
}: ClusterEditNodeReviewProps) => {
  const cy = { "data-cy": dataCy };

  // these columns define the nodes in the cluster.
  // They are used to render information about the node
  const columns: TableColumn<cm.NodeInfo>[] = [
    NodeTableColumns.nameWithoutLink,
    NodeTableColumns.os,
    NodeTableColumns.roleSelect((node: cm.NodeInfo) => {
      // If node is present as part of cluster then disable role edit on it
      const isDisabled =
        configuredClusterNode.find(
          (clusterNode) => node.id === clusterNode.id,
        ) !== undefined;
      return (
        <NodeRoleDropdown
          role={node.role ?? "all"}
          disable={isDisabled}
          onSelect={(value: NodeRoles) => {
            onNodeUpdate(node, value);
          }}
        />
      );
    }),
    NodeTableColumns.actions((node) => (
      <Button
        data-cy="removeHostBtn"
        className="remove-host-button"
        size={ButtonSize.Medium}
        variant={ButtonVariant.Ghost}
        onPress={() => onRemoveNode(node)}
      >
        Remove from Cluster
      </Button>
    )),
  ];

  return (
    <div {...cy} className="cluster-edit-node-review">
      <Heading semanticLevel={6} className="host-title">
        Hosts
      </Heading>

      {clusterNodeList.length > 0 ? (
        // TODO: replace this with ClusterNodesTable with a @orch-ui/components
        // NOTE: ClusterNodesTable doesn't work with affect by addition of row
        //       within same page.
        <div data-cy="reviewTable">
          <Table
            variant="minimal"
            columns={columns}
            data={clusterNodeList}
            sort={[0, 1, 2, 3]}
            initialSort={{
              column: "Host Name",
              direction: "asc",
            }}
            key="hosts-table"
          />
        </div>
      ) : (
        "No hosts available."
      )}

      <Button
        data-cy="addHostBtn"
        className="add-host-button"
        size={ButtonSize.Large}
        variant={ButtonVariant.Secondary}
        onPress={onAddNode}
      >
        Add Host
      </Button>
    </div>
  );
};

export default ClusterEditNodeReview;
