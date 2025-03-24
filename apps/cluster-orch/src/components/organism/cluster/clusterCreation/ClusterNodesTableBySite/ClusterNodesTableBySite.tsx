/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, eim } from "@orch-ui/apis";
import { SquareSpinner, TableColumn, TypedMetadata } from "@orch-ui/components";
import { hostProviderStatusToString, RuntimeConfig } from "@orch-ui/utils";
import { Tooltip } from "@spark-design/react";
import React, { Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { getNodes, setNodes } from "../../../../../store/reducers/nodes";
import {
  getNodesSpec,
  setNodesSpec,
} from "../../../../../store/reducers/nodeSpec";
import ClusterNodeDetailsDrawer from "../../../../atom/ClusterNodeDetailsDrawer/ClusterNodeDetailsDrawer";
import NodeRoleDropdown from "../../../../atom/NodeRoleDropdown/NodeRoleDropdown";
import "./ClusterNodesTableBySite.scss";

const dataCy = "clusterNodeTableBySite";

export type NodeRoles = "all" | "worker" | "controlplane";
interface SelectedRole {
  hostId: string;
  selectedRole: NodeRoles;
}

const HostsTableInfraRemote = RuntimeConfig.isEnabled("INFRA")
  ? React.lazy(async () => await import("EimUI/HostsTableRemote"))
  : null;

const AggregateHostStatusInfraRemote = RuntimeConfig.isEnabled("CLUSTER_ORCH")
  ? React.lazy(async () => await import("EimUI/AggregateHostStatus"))
  : null;

interface ClusterNodesTableBySitesProps {
  site: eim.SiteRead;
  inheritedMeta?: TypedMetadata[];
  onNodeSelection: (host: eim.HostRead, isSelected: boolean) => void;
  onNodeUpdate?: (host: eim.HostRead, role: NodeRoles) => void;
  poll?: boolean;

  // This is needed for testing purpose
  HostsTableRemote?: React.LazyExoticComponent<React.ComponentType<any>> | null;
  AggregateHostStatus?: React.LazyExoticComponent<
    React.ComponentType<any>
  > | null;
}

const ClusterNodesTableBySite = ({
  site,
  inheritedMeta = [],
  onNodeSelection,
  onNodeUpdate,
  poll,
  HostsTableRemote = HostsTableInfraRemote, // By default use Remote component
  AggregateHostStatus = AggregateHostStatusInfraRemote, // By default use Remote component
}: ClusterNodesTableBySitesProps) => {
  const cy = { "data-cy": dataCy };
  const siteId = site.resourceId;

  const dispatch = useAppDispatch();
  const query = new URLSearchParams(useLocation().search);
  const hostIdUrlParam = query.get("hostId");

  // Global Stepper state
  const currentNodes = useAppSelector(getNodes);
  const currentNodesSpec = useAppSelector(getNodesSpec);

  // Hosts/Nodes Table selection and dropdown states
  const [selectedHosts, setSelectedHosts] = useState<eim.HostRead[]>([]);
  const [selectedRoles, setSelectedRole] = useState<SelectedRole[]>([]); // List of role in dropdown selection for each host/uuid row.

  // Drawer related states
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [hostDetail, setHostDetail] = useState<eim.HostRead>();

  // Pre-selection of Hosts logic block, when component is mounted (at beginning)
  useEffect(() => {
    // To make local step state persist after stepper change unmounting current component.
    // The data for selectedHosts and selectedRoles is constructed and states are updated.

    const prevSelectedHostIds = selectedHosts; // By default take in current selection

    if (currentNodes.length > 0) {
      // In case we come back to this step from next step,
      // we need to re-build the component internal state from Redux
      const prevSelectedRoles: SelectedRole[] = [];
      currentNodes.forEach((node) => {
        // This needs to be independent of row selection toggle until this step is completed.
        if (node.id && node.role) {
          prevSelectedHostIds.push({
            resourceId: node.id,
            name: node.name ?? node.id,
          });
          prevSelectedRoles.push({
            hostId: node.id,
            selectedRole: node.role as NodeRoles,
          });
        }
      });
      // Render hosts roles
      setSelectedRole(prevSelectedRoles);
      // Render host row pre-selections
      setSelectedHosts(prevSelectedHostIds);
    }
  }, [currentNodes]);

  const handleRoleSelectInRow = (host: eim.HostRead) => {
    const currentNode = currentNodes.find(
      (node) => node.id === host.resourceId,
    );
    const currentRole = selectedRoles.find(
      (node) => node.hostId === host.resourceId,
    );
    // If previously present in global or local or default: "all"
    const currentNodeRole =
      currentNode?.role ?? currentRole?.selectedRole ?? "all";
    return (
      <NodeRoleDropdown
        role={currentNodeRole}
        disable={!currentNode}
        onSelect={(value: NodeRoles) => {
          // Update dropdown state within component
          setSelectedRole(
            selectedRoles.map((role) => {
              if (role.hostId === host.resourceId) {
                return {
                  ...role,
                  selectedRole: value,
                };
              }
              return role;
            }),
          );

          // Update store for use in next step or future visit (before finishing up cluster creation)
          dispatch(
            setNodes(
              currentNodes.map((selectedNode) => {
                if (selectedNode.id === host.resourceId!) {
                  return {
                    ...selectedNode,
                    role: value,
                  };
                }
                return selectedNode;
              }),
            ),
          );
          dispatch(
            setNodesSpec(
              currentNodesSpec.map((selectedNodeSpec) => {
                if (selectedNodeSpec.id === host.uuid!) {
                  return {
                    ...selectedNodeSpec,
                    nodeRole: value,
                  };
                }
                return selectedNodeSpec;
              }),
            ),
          );
          if (onNodeUpdate) onNodeUpdate(host, value);
        }}
      />
    );
  };

  const eimNodeToCMNode = (host: eim.HostRead): cm.NodeInfo => {
    return {
      id: host.resourceId,
      role: "all",
    };
  };

  const handleNodeSelection = (host: eim.HostRead, isSelected: boolean) => {
    // Make Cluster-Orch Node from the updated host row
    const selectedNode = eimNodeToCMNode(host);
    const selectedNodeSpec: cm.NodeSpec = {
      id: host.resourceId ?? "",
      role: "all",
    };

    // Update Node selection store
    if (isSelected) {
      // This will store for next step
      dispatch(setNodes(currentNodes.concat(selectedNode)));
      dispatch(setNodesSpec(currentNodesSpec.concat(selectedNodeSpec)));
    } else {
      // remove node if deselected
      dispatch(
        setNodes(currentNodes.filter((node) => node.id !== selectedNode.id)),
      );
      dispatch(
        setNodesSpec(
          currentNodesSpec.filter(
            (nodeSpec) => nodeSpec.id !== selectedNodeSpec.id,
          ),
        ),
      );
      setSelectedHosts(
        selectedHosts.filter((h) => h.resourceId !== host.resourceId),
      );
      setSelectedRole(
        selectedRoles.filter((role) => role.hostId !== host.resourceId),
      );
    }

    // FIXME we are using redux, why do we need a callback?
    // Update parent on host list selection
    onNodeSelection(host, isSelected);
  };

  // this method is called when the list of Host is loaded
  // in the Host table. We use this to populate data in the Redux store
  const onHostLoad = (hosts: eim.HostRead[]) => {
    if (hostIdUrlParam && selectedHosts.length === 0) {
      // we only execute this code if the url param contains a hostId
      // and the user have not selected any host yet
      const host = hosts.find((h) => h.resourceId === hostIdUrlParam);
      if (host) {
        dispatch(setNodes([eimNodeToCMNode(host)]));
        dispatch(
          setNodesSpec([
            {
              id: host.resourceId!,
              role: "all",
            },
          ]),
        );
        // Render host row pre-selections
        setSelectedHosts([
          {
            resourceId: hostIdUrlParam,
            name: hostIdUrlParam,
          },
        ]);
        // Propagate the status to the parent component
        // FIXME this should not be necessary as we're using redux
        onNodeSelection(host, true);
      }
    }
  };

  const columns: TableColumn<eim.HostRead>[] = [
    {
      Header: "Host Name",
      apiName: "name",
      accessor: (item) => item.name || item.resourceId,
      Cell: (table: { row: { original: eim.HostRead } }) => {
        const host = table.row.original;
        return (
          <Tooltip placement="bottom" content="View the Host Details">
            <Link
              to="#"
              onClick={() => {
                setHostDetail(host);
                setShowDrawer(true);
              }}
            >
              {host.name || host.resourceId}
            </Link>
          </Tooltip>
        );
      },
    },
    {
      Header: "Readiness",
      accessor: (item) => hostProviderStatusToString(item),
      Cell: (table: { row: { original: eim.HostRead } }) => (
        <Suspense fallback={<SquareSpinner />}>
          {AggregateHostStatus !== null ? (
            <AggregateHostStatus
              host={table.row.original}
              instance={table.row.original.instance}
            />
          ) : (
            "NA"
          )}
        </Suspense>
      ),
    },
    {
      Header: "Serial Number",
      apiName: "serialNumber",
      accessor: (host) => host.serialNumber ?? "-",
    },
    {
      Header: "Operating System",
      accessor: (host) => host.instance?.os?.name ?? "-",
    },
    {
      Header: "Role*",
      textAlign: "left",
      padding: "0",
      accessor: handleRoleSelectInRow,
    },
  ];

  return (
    <div {...cy} className="cluster-nodes-table-by-site">
      {HostsTableRemote !== null && (
        <div data-cy="hostTableContainer" className="host-table-container">
          <HostsTableRemote
            columns={columns}
            siteId={siteId}
            category="provisioned"
            selectable
            selectedHosts={selectedHosts}
            poll={poll}
            onHostSelect={handleNodeSelection}
            onDataLoad={onHostLoad}
          />
        </div>
      )}

      {hostDetail && (
        <ClusterNodeDetailsDrawer
          isOpen={showDrawer}
          host={hostDetail}
          inheritedMeta={inheritedMeta}
          onHide={() => setShowDrawer(false)}
        />
      )}
    </div>
  );
};

export default ClusterNodesTableBySite;
