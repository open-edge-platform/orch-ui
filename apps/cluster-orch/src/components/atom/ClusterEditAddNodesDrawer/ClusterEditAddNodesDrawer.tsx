/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm, eim } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { Button, Drawer } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import React, { useEffect, useMemo, useState } from "react";
import ClusterNodesTableBySite, {
  NodeRoles,
} from "../../organism/cluster/clusterCreation/ClusterNodesTableBySite/ClusterNodesTableBySite";

export const dataCy = "clusterEditAddNodesDrawer";

type ClusterCompleteInfo = ecm.ClusterDetailInfo & ecm.ClusterInfo;
const convertEimHostToEcmNode = (host: eim.HostRead, role?: NodeRoles) => ({
  id: host.resourceId,
  serial: host.serialNumber,
  os: host.instance?.os?.name,
  name: host.name,
  guid: host.uuid,
  role: role ?? "all",
});

interface ClusterEditAddNodesDrawerProps {
  /** Cluster with latest node list */
  cluster: ClusterCompleteInfo;
  isOpen: boolean;
  onCancel: () => void;
  onAddNodeSave: (additionalSelectedNodes: ecm.NodeInfo[]) => void;

  // This is needed for testing purpose
  HostsTableRemote?: React.LazyExoticComponent<React.ComponentType<any>> | null;
}

type HostRole = eim.HostRead & { role?: NodeRoles };

const ClusterEditAddNodesDrawer = ({
  cluster,
  isOpen,
  onCancel,
  onAddNodeSave,
  HostsTableRemote,
}: ClusterEditAddNodesDrawerProps) => {
  const cy = { "data-cy": dataCy };
  const [selectedHosts, setSelectedHosts] = useState<HostRole[]>([]);
  // This will be used to check duplicate selections
  const clusterNodeGuids = useMemo(
    () => (cluster.nodes?.nodeInfoList ?? []).map((node) => node.guid),
    [cluster.nodes?.nodeInfoList],
  );

  // Getting locations details
  const [site, setSite] = useState<eim.SiteRead>();
  useEffect(() => {
    if (cluster.locationList) {
      const site: eim.SiteRead = {};
      cluster.locationList.forEach((location) => {
        switch (location.locationType) {
          case "LOCATION_TYPE_SITE_ID":
            site.siteID = location.locationInfo;
            site.resourceId = location.locationInfo;
            break;
          case "LOCATION_TYPE_SITE_NAME":
            site.name = location.locationInfo;
            break;
          case "LOCATION_TYPE_REGION_ID":
            site.region = site.region ?? {};
            site.region.regionID = location.locationInfo;
            site.region.resourceId = location.locationInfo;
            break;
          case "LOCATION_TYPE_REGION_NAME":
            site.region = site.region ?? {};
            site.region.name = location.locationInfo;
            break;
        }
      });
      setSite(site);
    }
  }, [cluster.locationList]);

  return (
    <div {...cy} className="cluster-edit-add-nodes-drawer">
      <Drawer
        data-cy="drawer"
        show={isOpen}
        onHide={onCancel}
        headerProps={{
          title: "Add Hosts to Cluster",
        }}
        bodyContent={
          <>
            <Flex cols={[3, 9]}>
              <p className="labelName">Region</p>
              <span data-cy="region">{site?.region?.name ?? "-"}</span>
              <p className="labelName">Site</p>
              <span data-cy="site">{site?.name ?? "-"}</span>
            </Flex>

            {/* Show Unconfigured Nodes/Hosts By Site */}
            {site && (
              <ClusterNodesTableBySite
                site={site}
                onNodeSelection={(host, isSelected) => {
                  // add/remove host from currently selected hosts
                  setSelectedHosts((prev) => {
                    if (isSelected) {
                      return prev.concat(host);
                    }
                    return prev.filter(
                      (prevHost) => host.resourceId !== prevHost.resourceId,
                    );
                  });
                }}
                onNodeUpdate={(updatedHost, role) => {
                  setSelectedHosts(
                    selectedHosts.map((host) => {
                      if (host.resourceId === updatedHost.resourceId) {
                        return {
                          ...updatedHost,
                          role,
                        };
                      }
                      return host;
                    }),
                  );
                }}
                HostsTableRemote={HostsTableRemote}
              />
            )}
          </>
        }
        footerContent={
          <>
            <Button
              data-cy="cancelBtn"
              className="cancel"
              variant={ButtonVariant.Secondary}
              onPress={onCancel}
            >
              Cancel
            </Button>
            <Button
              data-cy="okBtn"
              className="save"
              isDisabled={selectedHosts.length === 0}
              variant={ButtonVariant.Secondary}
              onPress={() => {
                // Convert selected eim host to ecm nodes
                const selectedNodes = selectedHosts
                  .filter((host) => !clusterNodeGuids.includes(host.uuid))
                  .map((host) => convertEimHostToEcmNode(host, host.role));
                // Notify selected node data upon select completion
                onAddNodeSave(selectedNodes);
              }}
            >
              OK
            </Button>
          </>
        }
      />
    </div>
  );
};

export default ClusterEditAddNodesDrawer;
