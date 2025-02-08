/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
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
  const columns: TableColumn<ecm.NodeInfo>[] = [
    NodeTableColumns.nameWithoutLink,
    NodeTableColumns.serial,
    NodeTableColumns.roleSelect((node: ecm.NodeInfo) => {
      return (
        <NodeRoleDropdown
          role={node.role ? node.role : ""}
          disable={false}
          onSelect={(value: string) => {
            const newNodes: ecm.NodeInfo[] = [];
            const newNodesSpec: ecm.NodeSpec[] = [];
            currentNodes.forEach((nodeId: ecm.NodeInfo) => {
              let newNode: ecm.NodeInfo = { ...nodeId };
              if (nodeId.guid == node.guid) {
                newNode = {
                  ...nodeId,
                  id: nodeId.id,
                  role: value,
                };
              }

              newNodes.push(newNode);
            });
            currentNodesSpec.forEach((nodeSpec: ecm.NodeSpec) => {
              let newNodeSpec: ecm.NodeSpec = { ...nodeSpec };

              if (nodeSpec.nodeGuid == node.guid) {
                newNodeSpec = {
                  nodeGuid: node.guid,
                  nodeRole: value as "all" | "worker" | "controlplane",
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
