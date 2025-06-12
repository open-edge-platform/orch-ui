/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, infra } from "@orch-ui/apis";
import { TableColumn } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Heading, Table } from "@spark-design/react";
import { useMemo } from "react";
import {
  CombinedNodeHostItem,
  NodeTableColumns,
} from "../../../utils/NodeTableColumns";
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
  onAddNode?: () => void;
  /** Notify click on Remove Host button */
  onRemoveNode?: (node: cm.NodeInfo) => void;
}

const ClusterEditNodeReview = ({
  clusterNodeList = [],
  configuredClusterNode = [],
  onNodeUpdate,
}: ClusterEditNodeReviewProps) => {
  const cy = { "data-cy": dataCy };

  const hostsFilter = clusterNodeList
    ?.map(({ id }) => `resourceId="${id}"`)
    .join(" OR ");

  const { data: hostsResponse } = infra.useHostServiceListHostsQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      filter: hostsFilter,
    },
    {
      skip: clusterNodeList?.length === 0,
    },
  );

  const combinedNodeHostsList: CombinedNodeHostItem[] = useMemo(() => {
    if (clusterNodeList?.length === 0) {
      return [];
    }

    return clusterNodeList.map((node) => {
      const host = hostsResponse?.hosts?.find(
        (host) => host.resourceId === node.id,
      );
      return host ? { ...host, ...node } : node;
    });
  }, [clusterNodeList, hostsResponse?.hosts]);

  // these columns define the nodes in the cluster.
  // They are used to render information about the node
  const columns: TableColumn<CombinedNodeHostItem>[] = [
    NodeTableColumns.nameWithoutLink,
    NodeTableColumns.status,
    NodeTableColumns.os,
    NodeTableColumns.roleSelect((node: CombinedNodeHostItem) => {
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
    /** This is not supported by Cluster Manager (cm) Api */
    // NodeTableColumns.actions((node) => (
    //   <Button
    //     data-cy="removeHostBtn"
    //     className="remove-host-button"
    //     size={ButtonSize.Medium}
    //     variant={ButtonVariant.Ghost}
    //     onPress={() => onRemoveNode(node)}
    //   >
    //     Remove from Cluster
    //   </Button>
    // )),
  ];

  return (
    <div {...cy} className="cluster-edit-node-review">
      <Heading semanticLevel={6} className="host-title">
        Hosts
      </Heading>

      {combinedNodeHostsList.length > 0 ? (
        // TODO: replace this with ClusterNodesTable with a @orch-ui/components
        // NOTE: ClusterNodesTable doesn't work with affect by addition of row
        //       within same page.
        <div data-cy="reviewTable">
          <Table
            variant="minimal"
            columns={columns}
            data={combinedNodeHostsList}
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

      {/** This is not supported by Cluster Manager (cm) Api */}
      {/* <Button
        data-cy="addHostBtn"
        className="add-host-button"
        size={ButtonSize.Large}
        variant={ButtonVariant.Secondary}
        onPress={onAddNode}
      >
        Add Host
      </Button> */}
    </div>
  );
};

export default ClusterEditNodeReview;
