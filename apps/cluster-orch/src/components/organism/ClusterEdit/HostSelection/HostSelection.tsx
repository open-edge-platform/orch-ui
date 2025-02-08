/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import { ConfirmationDialog } from "@orch-ui/components";
import { ButtonVariant } from "@spark-design/tokens";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ClusterEditAddNodesDrawer from "../../../atom/ClusterEditAddNodesDrawer/ClusterEditAddNodesDrawer";
import ClusterEditNodeReview from "../../../atom/ClusterEditNodeReview/ClusterEditNodeReview";
import "./HostSelection.scss";

export const dataCy = "hostSelection";

interface HostSelectionProps {
  cluster: ecm.ClusterDetailInfo & ecm.ClusterInfo;
  configuredClusterNodes?: ecm.NodeInfo[];
  onNodesSave: (nodeInfoList: ecm.NodeInfo[]) => void;
  onRemoveLastNode: (removed: boolean) => void;

  // This is needed for testing purpose
  HostsTableRemote?: React.LazyExoticComponent<React.ComponentType<any>> | null;
}

/** Rename this to ClusterEditNodeSelectionBySite */
const HostSelection = ({
  cluster,
  configuredClusterNodes,
  onNodesSave,
  onRemoveLastNode,
  HostsTableRemote,
}: HostSelectionProps) => {
  const cy = { "data-cy": dataCy };
  const [, setSearchParam] = useSearchParams();

  // Final cluster node info seen on the Nodes/Hosts review table (`configured nodes` + `newly selected but unconfigured nodes`)
  const [clusterNodeList, setClusterNodeList] = useState<ecm.NodeInfo[]>([]);
  useEffect(() => {
    setClusterNodeList(cluster.nodes?.nodeInfoList ?? []);
  }, [cluster.nodes?.nodeInfoList]);

  // Host selection in the drawer
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  // Remove host modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deletedHostName, setDeletedHostName] = useState<string>();
  const [removedRowSelect, setRemovedRowSelect] = useState<ecm.NodeInfo>();

  return (
    <>
      <div {...cy} className="host-selection">
        <ClusterEditNodeReview
          clusterNodeList={clusterNodeList}
          configuredClusterNode={configuredClusterNodes}
          onNodeUpdate={(node, value) => {
            // Update role of the specific node which is controlled by nodeRoleDropdown
            const updatedNodeRoleList: ecm.NodeInfo[] = clusterNodeList.map(
              (clusterNodes) =>
                clusterNodes.id === node.id
                  ? {
                      ...clusterNodes,
                      role: value,
                    }
                  : clusterNodes,
            );
            // Update Node role within the list
            setClusterNodeList(updatedNodeRoleList);
          }}
          onAddNode={() => {
            setShowDrawer(true);
            setSearchParam("");
          }}
          onRemoveNode={(node) => {
            if (clusterNodeList?.length === 1) {
              onRemoveLastNode(true);
            } else {
              setOpenModal(true);
              setDeletedHostName(node.name);
              setRemovedRowSelect(node);
            }
          }}
        />

        <ClusterEditAddNodesDrawer
          // Cluster with updated node list
          cluster={{ ...cluster, nodes: { nodeInfoList: clusterNodeList } }}
          isOpen={showDrawer}
          onAddNodeSave={(additionalNodes) => {
            // Append new node to old nodeList
            const updatedNodes = clusterNodeList.concat(additionalNodes);
            // Notify node change
            setClusterNodeList(updatedNodes);
            onNodesSave(updatedNodes);
            // Hide drawer
            setShowDrawer(false);
          }}
          onCancel={() => setShowDrawer(false)}
          HostsTableRemote={HostsTableRemote}
        />

        {/** Move this to atoms */}
        {openModal && (
          <ConfirmationDialog
            isOpen={true}
            confirmBtnText="Remove"
            confirmBtnVariant={ButtonVariant.Alert}
            cancelBtnText="Cancel"
            title="Remove Host from Cluster"
            content={`Are you sure you want to remove ${deletedHostName} from ${
              cluster.name ?? "name"
            }?`}
            buttonPlacement="left-reverse"
            confirmCb={() => {
              let updatedNodes: ecm.NodeInfo[] = [];
              const updatedInitialNodes: ecm.NodeInfo[] = [];

              if (clusterNodeList?.length == 0) {
                updatedNodes = [];
              }

              clusterNodeList?.forEach((node: ecm.NodeInfo) => {
                if (node.id != removedRowSelect?.id) {
                  updatedNodes.push(node);
                }
              });

              (clusterNodeList ?? []).forEach((initialNode) => {
                if (initialNode.id != removedRowSelect?.id) {
                  updatedInitialNodes.push(initialNode);
                }
              });
              setClusterNodeList(updatedNodes);
              onNodesSave(updatedNodes);
              setOpenModal(false);
            }}
            cancelCb={() => {
              setOpenModal(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default HostSelection;
