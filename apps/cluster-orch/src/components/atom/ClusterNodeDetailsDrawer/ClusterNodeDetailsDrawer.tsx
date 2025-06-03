/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Flex, MetadataDisplay, TypedMetadata } from "@orch-ui/components";
import { Button, Drawer } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";

const dataCy = "clusterNodeDetailsDrawer";

interface ClusterNodeDetailsDrawerProps {
  isOpen: boolean;
  host: infra.HostResourceRead;
  inheritedMeta?: TypedMetadata[];
  onHide: () => void;
}

const ClusterNodeDetailsDrawer = ({
  isOpen,
  host,
  inheritedMeta = [],
  onHide,
}: ClusterNodeDetailsDrawerProps) => {
  const cy = { "data-cy": dataCy };

  /* Host Drawer related logic */
  const itemAvailability = (item?: string) => (!item ? "Not Available" : item);

  return (
    <div {...cy} className="cluster-node-details-drawer">
      <Drawer
        footerContent={
          <Button
            className="close-drawer"
            variant={ButtonVariant.Secondary}
            onPress={onHide}
          >
            Close
          </Button>
        }
        show={isOpen}
        backdropClosable
        onHide={onHide}
        headerProps={{
          title: host.name || host.resourceId,
        }}
        bodyContent={
          <>
            <Flex cols={[3, 9]}>
              <p>Serial Number</p>
              <span data-cy="serialNumber">
                {itemAvailability(host.serialNumber)}
              </span>
              <p>GUID</p>
              <span data-cy="hostGuid">{itemAvailability(host.uuid)}</span>
              <p>OS Profile</p>
              <span data-cy="osProfiles">
                {itemAvailability(host.instance?.os?.name)}
              </span>
              <p>Site</p>
              <span data-cy="siteName">
                {itemAvailability(host.site?.name)}
              </span>
              <p>Processor</p>
              <span className="processorArchitecture">
                {itemAvailability(host.instance?.os?.architecture)}
              </span>
            </Flex>

            <p className="mt-2">Region and Site</p>
            <div data-cy="locationMetadata">
              <MetadataDisplay metadata={inheritedMeta} />
            </div>

            <p className="mt-2">Host Labels</p>
            <div data-cy="hostLabels">
              <MetadataDisplay metadata={host.metadata ?? []} />
            </div>
          </>
        }
      />
    </div>
  );
};

export default ClusterNodeDetailsDrawer;
