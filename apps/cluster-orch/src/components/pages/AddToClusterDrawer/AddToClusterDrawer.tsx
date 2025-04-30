/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, infra } from "@orch-ui/apis";
import { ApiError } from "@orch-ui/components";
import { InternalError, SharedStorage } from "@orch-ui/utils";
import { Button, ButtonGroup, Drawer } from "@spark-design/react";
import { ButtonVariant, DrawerSize } from "@spark-design/tokens";
import { useState } from "react";
import "./AddToClusterDrawer.scss";

const dataCy = "addToClusterDrawer";
interface AddToClusterDrawerProps {
  host: infra.HostRead;
  isDrawerShown?: boolean;
  setHideDrawer: () => void;
}

const AddToClusterDrawer = ({
  host,
  isDrawerShown = false,
  setHideDrawer,
}: AddToClusterDrawerProps) => {
  // TODO: Replace with a global error notification LPUUH-951
  const [error, setError] = useState<InternalError | undefined>();

  const cy = { "data-cy": dataCy };
  const [selectedClusterName] = useState<string>();

  const [addNodeToCluster] =
    cm.usePutV2ProjectsByProjectNameClustersAndNameNodesMutation();

  const { data: selectedCluster, isSuccess: isSelectedClusterDataSuccess } =
    cm.useGetV2ProjectsByProjectNameClustersAndNameQuery(
      {
        name: selectedClusterName!,
        projectName: SharedStorage.project?.name ?? "",
      },
      { skip: !selectedClusterName || !SharedStorage.project?.name },
    );

  const addHostToCluster = () => {
    if (
      selectedClusterName &&
      isSelectedClusterDataSuccess &&
      selectedCluster.nodes &&
      host.uuid
    ) {
      const nodeList: cm.NodeSpec[] = [];

      // Make NodeSpec list with cluster's old nodeList
      selectedCluster.nodes.forEach((node) => {
        nodeList.push({
          id: node.id,
          role: "worker",
        } as cm.NodeSpec);
      });

      // Add new node/host to the cluster's nodeList
      nodeList.push({
        id: host.uuid,
        role: "worker",
      });

      // Notify nodes to cluster
      addNodeToCluster({
        projectName: SharedStorage.project?.name ?? "",
        name: selectedClusterName,
        body: nodeList,
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
        bodyContent={<>Unable to fetch Cluster List!</>}
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
