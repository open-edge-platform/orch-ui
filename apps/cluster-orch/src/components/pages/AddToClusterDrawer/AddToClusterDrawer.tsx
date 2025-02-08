/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm, eim } from "@orch-ui/apis";
import { ApiError } from "@orch-ui/components";
import { LpInternalError, SharedStorage } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Drawer,
  Dropdown,
  Icon,
  Item,
  MessageBanner,
} from "@spark-design/react";
import { ButtonVariant, DrawerSize } from "@spark-design/tokens";
import { useState } from "react";
import ClusterDetail from "../ClusterDetail/ClusterDetail";
import "./AddToClusterDrawer.scss";

export const dataCy = "addToClusterDrawer";
interface AddToClusterDrawerProps {
  host: eim.HostRead;
  isDrawerShown?: boolean;
  setHideDrawer: () => void;
}

const AddToClusterDrawer = ({
  host,
  isDrawerShown = false,
  setHideDrawer,
}: AddToClusterDrawerProps) => {
  // TODO: Replace with a global error notification LPUUH-951
  const [error, setError] = useState<LpInternalError | undefined>();

  const cy = { "data-cy": dataCy };
  const [selectedClusterName, setSelectedClusterName] = useState<string>();

  const [addNodeToCluster] =
    ecm.usePutV1ProjectsByProjectNameClustersAndClusterNameNodesMutation();

  // For the Dropdown
  const { data: clusterList, isSuccess: isClusterSuccess } =
    ecm.useGetV1ProjectsByProjectNameClustersQuery(
      { projectName: SharedStorage.project?.name ?? "" },
      { skip: !SharedStorage.project?.name },
    );

  const filteredClusterList = clusterList?.clusterInfoList?.filter(
    (cluster) => {
      const siteLocation = cluster.locationList?.filter(
        (location) => location.locationType === "LOCATION_TYPE_SITE_ID",
      );

      const clusterSiteId =
        siteLocation && siteLocation.length > 0
          ? siteLocation[0].locationInfo
          : undefined;

      return clusterSiteId && clusterSiteId === host.site?.siteID;
    },
  );

  const { data: selectedCluster, isSuccess: isSelectedClusterDataSuccess } =
    ecm.useGetV1ProjectsByProjectNameClustersAndClusterNameQuery(
      {
        clusterName: selectedClusterName!,
        projectName: SharedStorage.project?.name ?? "",
      },
      { skip: !selectedClusterName || !SharedStorage.project?.name },
    );

  const addHostToCluster = () => {
    if (
      selectedClusterName &&
      isSelectedClusterDataSuccess &&
      selectedCluster.nodes?.nodeInfoList &&
      host.uuid
    ) {
      const nodeList: ecm.NodeSpec[] = [];

      // Make NodeSpec list with cluster's old nodeList
      selectedCluster.nodes.nodeInfoList.forEach((node) => {
        nodeList.push({
          nodeGuid: node.guid,
          nodeRole: "worker",
        } as ecm.NodeSpec);
      });

      // Add new node/host to the cluster's nodeList
      nodeList.push({
        nodeGuid: host.uuid,
        nodeRole: "worker",
      });

      // Notify nodes to cluster
      addNodeToCluster({
        projectName: SharedStorage.project?.name ?? "",
        clusterName: selectedClusterName,
        clusterNodes: {
          nodeList: nodeList,
        },
      })
        .unwrap()
        .then(() => {
          // TODO: Apply a global error notification LPUUH-951
          setError(undefined);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  const drawerContent = (
    <>
      <div className="selected-cluster-info" data-cy="clusterDropdown">
        <MessageBanner
          icon={<Icon icon="information-circle" />}
          messageBody="Clusters are determined based on matching Region and Site between host and cluster."
          showIcon
          variant="info"
        />
        {filteredClusterList && (
          <Dropdown
            className="selected-cluster"
            label="Select a Cluster"
            placeholder="Select a Cluster"
            name="selectedCluster"
            selectedKey={selectedClusterName}
            onSelectionChange={(key: string) => setSelectedClusterName(key)}
            items={filteredClusterList}
          >
            {(item: ecm.ClusterInfo) => (
              <Item key={item.name} textValue={item.name}>
                {item.name}
              </Item>
            )}
          </Dropdown>
        )}
      </div>

      {selectedClusterName && (
        <div className="cluster-details-content">
          <ClusterDetail hasHeader={false} name={selectedClusterName} />
        </div>
      )}
    </>
  );

  return (
    <div {...cy} className="add-to-cluster-drawer">
      <Drawer
        show={isDrawerShown}
        backdropClosable={true}
        size={DrawerSize.Large}
        onHide={setHideDrawer}
        headerProps={{
          title: `Add Host ${host.name || host.resourceId} to the Cluster`,
          onHide: setHideDrawer,
          closable: true,
        }}
        bodyContent={
          isClusterSuccess ? drawerContent : <>Unable to fetch Cluster List!</>
        }
        footerContent={
          <>
            <ButtonGroup className="footer-btn-group">
              <Button variant={ButtonVariant.Primary} onPress={setHideDrawer}>
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.Action}
                onPress={() => {
                  addHostToCluster();
                  setHideDrawer();
                }}
              >
                Add
              </Button>
            </ButtonGroup>
          </>
        }
      ></Drawer>

      {/* TODO: Replace with a global notification LPUUH-951 */}
      {error && <ApiError error={error} />}
    </div>
  );
};

export default AddToClusterDrawer;
