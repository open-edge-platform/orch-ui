/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  DetailedStatuses,
  Empty,
  FieldLabels,
  Flex,
  MetadataDisplay,
  SquareSpinner,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  HostGenericStatuses,
  hostToStatuses,
  humanFileSize,
  RuntimeConfig,
  SharedStorage,
} from "@orch-ui/utils";
import { Item, MessageBanner, Tabs } from "@spark-design/react";
import React, { Suspense } from "react";
import { ResourceType, ResourceTypeTitle } from "../ResourceDetails";
import { HostResourcesCpuRead } from "../resourcedetails/Cpu";
import ResourceIndicator from "../ResourceIndicator";
import "./HostDetailsTab.scss";

interface HostDetailsTabProps {
  host: eim.HostRead;
  onShowCategoryDetails: (title: ResourceTypeTitle, data: ResourceType) => void;
}

export const dataCy = "iaasHostResources";

const ClusterSummaryRemote = RuntimeConfig.isEnabled("CLUSTER_ORCH")
  ? React.lazy(async () => await import("ClusterOrchUI/ClusterSummary"))
  : null;

const HostDetailsTab: React.FC<HostDetailsTabProps> = (props) => {
  const { host, onShowCategoryDetails } = props;

  // NOTE we can't use Host.instance as it's not always available (the list API does not return it)
  const { data: instanceList, isSuccess: isInstanceSuccess } =
    eim.useGetV1ProjectsByProjectNameComputeInstancesQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        hostId: host.resourceId,
      },
      {
        skip: !host.resourceId || !SharedStorage.project,
        pollingInterval: API_INTERVAL,
      },
    );
  const instance =
    isInstanceSuccess && instanceList.instances.length > 0
      ? instanceList.instances[0]
      : undefined;

  const storageDisplayValue = humanFileSize(
    host.hostStorages?.reduce((total: number, s) => {
      return total + parseInt(s.capacityBytes ?? "0");
    }, 0),
  );

  const memoryDisplayValue = host.memoryBytes
    ? humanFileSize(parseInt(host.memoryBytes))
    : "";

  const tabItems = [
    {
      id: 1,
      title: "Status",
    },
    {
      id: 2,
      title: "Resources",
    },
    {
      id: 3,
      title: "Specifications",
    },
    {
      id: 4,
      title: "I/O Devices",
    },
    {
      id: 5,
      title: "Cluster",
    },
    {
      id: 6,
      title: "Host Labels",
    },
  ];

  const hostStatusFields: FieldLabels<HostGenericStatuses> = {
    hostStatus: {
      label: "Host Status",
    },
    onboardingStatus: {
      label: "Onboarding Status",
    },
    instanceStatus: {
      label: "Instance Status",
    },
    provisioningStatus: {
      label: "Provisioning Status",
    },
    updateStatus: {
      label: "Update Status",
    },
  };

  const itemList = [
    <Item title={tabItems[0].title}>
      <DetailedStatuses<HostGenericStatuses>
        data={hostToStatuses(host, instance)}
        statusFields={hostStatusFields}
      />
    </Item>,
    <Item title={tabItems[1].title}>
      {!host.hostStorages &&
        !host.cpuArchitecture &&
        !host.cpuCapabilities &&
        !host.cpuCores &&
        !host.cpuModel &&
        !host.cpuSockets &&
        !host.memoryBytes &&
        !host.cpuThreads &&
        !host.hostUsbs &&
        !host.hostGpus && (
          <MessageBanner
            messageBody="Host resources not reported"
            messageTitle=""
            variant="info"
          ></MessageBanner>
        )}
      <>
        <ResourceIndicator
          data={
            [
              {
                cores: host.cpuCores,
                sockets: host.cpuSockets,
                model: host.cpuModel,
                threads: host.cpuThreads,
                architecture: host.cpuArchitecture,
              },
            ] as HostResourcesCpuRead[]
          }
          dataCy="cpu"
          icon="cpu"
          onClickCategory={onShowCategoryDetails}
          title="CPUs"
          value={host.cpuCores?.toString() ?? "0"}
          units="cores"
        />

        {memoryDisplayValue && (
          <ResourceIndicator
            data={host.memoryBytes ?? ""}
            dataCy="memory"
            icon="memory-card"
            onClickCategory={onShowCategoryDetails}
            title="Memory"
            value={memoryDisplayValue.value}
            units={memoryDisplayValue.units}
          />
        )}

        {storageDisplayValue && (
          <ResourceIndicator
            data={host.hostStorages}
            dataCy="storage"
            icon="database"
            onClickCategory={onShowCategoryDetails}
            title="Storage"
            value={storageDisplayValue.value}
            units={storageDisplayValue.units}
          />
        )}

        {host.hostGpus && (
          <ResourceIndicator
            data={host.hostGpus}
            dataCy="gpu"
            icon="gpu"
            onClickCategory={onShowCategoryDetails}
            title="GPUs"
            value={host.hostGpus.length.toString()}
          />
        )}
      </>
    </Item>,

    <Item title={tabItems[2].title}>
      <Flex cols={[4, 8]}>
        <b>Serial</b>
        <div>{host.serialNumber ?? "N/A"}</div>
        <b>UUID</b>
        <div>{host.uuid ?? "N/A"}</div>
        <b>OS</b>
        <div>{instance?.os?.name ?? "N/A"}</div>
        <b>Bios Vendor</b>
        <div>{host.biosVendor ?? "N/A"}</div>
        <b>Product Name</b>
        <div>{host.productName ?? "N/A"}</div>
      </Flex>
    </Item>,

    <Item title={tabItems[3].title}>
      {!host.hostStorages &&
        !host.cpuArchitecture &&
        !host.cpuCapabilities &&
        !host.cpuCores &&
        !host.cpuModel &&
        !host.cpuSockets &&
        !host.memoryBytes &&
        !host.cpuThreads &&
        !host.hostUsbs &&
        !host.hostGpus && (
          <MessageBanner
            messageBody="Host resources not reported"
            messageTitle=""
            variant="info"
          ></MessageBanner>
        )}
      {(!host.hostNics || host.hostNics.length === 0) && (
        <Empty subTitle="No I/O devices connected" icon="radiobutton-empty" />
      )}
      {host.hostUsbs && (
        <ResourceIndicator
          data={host.hostUsbs}
          dataCy="usb"
          icon="gear"
          onClickCategory={onShowCategoryDetails}
          title="USB"
          value={host.hostUsbs.length.toString()}
        />
      )}
      {host.hostNics && host.hostNics.length !== 0 && (
        <ResourceIndicator
          data={host.hostNics}
          dataCy="interfaces"
          icon="gear"
          onClickCategory={onShowCategoryDetails}
          title="Interfaces"
          value={host.hostNics.length.toString()}
        />
      )}
    </Item>,
  ];

  if (
    host.site &&
    instance?.workloadMembers?.find(
      (workloadRef) => workloadRef.kind === "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
    ) &&
    ClusterSummaryRemote !== null
  ) {
    itemList.push(
      <Item title={tabItems[4].title}>
        <Suspense fallback={<SquareSpinner />}>
          <ClusterSummaryRemote uuid={host.uuid} site={host.site.name} />
        </Suspense>
      </Item>,
    );
  }

  itemList.push(
    <Item title={tabItems[5].title}>
      <div className="host-label" data-cy="hostLabelMetadata">
        {host.metadata && host.metadata.length > 0 && (
          <MetadataDisplay metadata={host.metadata} />
        )}
        {(!host.metadata || host.metadata.length === 0) && (
          <em>No Host labels are available!</em>
        )}
      </div>
    </Item>,
  );

  return (
    <div className="iaas-host-resources" data-cy={dataCy}>
      <Tabs items={tabItems} isCloseable={false}>
        {itemList}
      </Tabs>
    </div>
  );
};

export default HostDetailsTab;
