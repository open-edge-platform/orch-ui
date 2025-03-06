/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cm } from "@orch-ui/apis";
import { TableColumn } from "@orch-ui/components";
import { Heading } from "@spark-design/react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { getNodes, setNodes } from "../../../../../store/reducers/nodes";
import {
  getNodesSpec,
  setNodesSpec,
} from "../../../../../store/reducers/nodeSpec";
import { NodeTableColumns } from "../../../../../utils/NodeTableColumns";
import NodeRoleDropdown from "../../../../atom/NodeRoleDropdown/NodeRoleDropdown";
import ClusterNodesTable from "../../../ClusterNodesTable/ClusterNodesTable";

export const dataCy = "AddRoles";

const AddRoles = () => {
  const dispatch = useAppDispatch();
  const currentNodes = useAppSelector(getNodes);
  const currentNodesSpec = useAppSelector(getNodesSpec);

  const cy = { "data-cy": dataCy };

  // these columns define the nodes in the cluster.
  // They are used to render information about the node
  const columns: TableColumn<cm.NodeInfo>[] = [
    NodeTableColumns.nameWithoutLink,
    NodeTableColumns.roleSelect((node: cm.NodeInfo) => {
      return (
        <NodeRoleDropdown
          role={node.role ? node.role : ""}
          disable={false}
          onSelect={(value: string) => {
            const newNodes: cm.NodeInfo[] = [];
            const newNodesSpec: cm.NodeSpec[] = [];
            currentNodes.forEach((nodeId: cm.NodeInfo) => {
              let newNode: cm.NodeInfo = { ...nodeId };
              if (nodeId.id == node.id) {
                newNode = {
                  ...nodeId,
                  id: nodeId.id,
                  role: value,
                };
              }

              newNodes.push(newNode);
            });
            currentNodesSpec.forEach((nodeSpec: cm.NodeSpec) => {
              let newNodeSpec: cm.NodeSpec = { ...nodeSpec };

              if (nodeSpec.id == node.id) {
                newNodeSpec = {
                  id: node.id,
                  role: value as "all" | "worker" | "controlplane",
                };
              }

              newNodesSpec.push(newNodeSpec);
            });

            //update UI state
            dispatch(setNodes(newNodes));

            //upate put request
            dispatch(setNodesSpec(newNodesSpec));
          }}
        />
      );
    }),

    NodeTableColumns.os,
  ];

  return (
    <div {...cy} className="add-role">
      <Heading semanticLevel={6} className="review-category">
        Add Roles
      </Heading>

      <ClusterNodesTable nodes={currentNodes} columns={columns} />
    </div>
  );
};

export default AddRoles;
