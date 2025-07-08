/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra, mps } from "@orch-ui/apis";
import { ApiError, Flex } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import "./VproDetails.scss";

const dataCy = "vproDetails";
interface VproDetailsProps {
  host: infra.HostResourceRead;
}

const VproDetails = ({ host }: VproDetailsProps) => {
  const cy = { "data-cy": dataCy };

  // Get project name from SharedStorage
  const projectName = SharedStorage.project?.name ?? "";

  // Use the host UUID as the device GUID for API calls
  const guid = host.uuid ?? "";

  // Call the MPS API hooks to get device and AMT settings data
  const {
    data: deviceData,
    isLoading: isDeviceLoading,
    isError: isDeviceError,
    error: deviceError,
  } = mps.useGetV1ProjectsByProjectNameDmDevicesAndGuidQuery(
    { projectName, guid },
    { skip: !projectName || !guid },
  );
  console.log("deviceData:", deviceData);
  const {
    data: amtSettingsData,
    isLoading: isAmtSettingsLoading,
    isError: isAmtSettingsError,
    error: amtSettingsError,
  } = mps.useGetV1ProjectsByProjectNameDmAmtGeneralSettingsAndGuidQuery(
    { projectName, guid },
    { skip: !projectName || !guid },
  );

  // Handle error states
  if (isDeviceError) {
    return <ApiError error={deviceError} />;
  }

  if (isAmtSettingsError) {
    return <ApiError error={amtSettingsError} />;
  }
  return (
    <div {...cy} className="vpro-details">
      {/* MPS device information */}
      {deviceData && (
        <>
          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">Connection Status</Text>
            <Text className="vpro-details-value">
              {deviceData.connectionStatus ? "Connected" : "Disconnected"}
            </Text>
          </Flex>

          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">Friendly Name</Text>
            <Text className="vpro-details-value">
              {deviceData.friendlyName ?? "N/A"}
            </Text>
          </Flex>

          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">DNS Suffix</Text>
            <Text className="vpro-details-value">
              {deviceData.dnsSuffix ?? "N/A"}
            </Text>
          </Flex>
        </>
      )}
      {deviceData?.deviceInfo && (
        <>
          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">IP Address</Text>
            <Text className="vpro-details-value">
              {deviceData.deviceInfo.ipAddress ?? "N/A"}
            </Text>
          </Flex>
          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">Current Mode</Text>
            <Text className="vpro-details-value">
              {deviceData.deviceInfo.currentMode ?? "N/A"}
            </Text>
          </Flex>
          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">Firmware Version</Text>
            <Text className="vpro-details-value">
              {deviceData.deviceInfo.fwVersion ?? "N/A"}
            </Text>
          </Flex>

          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">Firmware Sku</Text>
            <Text className="vpro-details-value">
              {deviceData.deviceInfo.fwSku ?? "N/A"}
            </Text>
          </Flex>

          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">Firmware build</Text>
            <Text className="vpro-details-value">
              {deviceData.deviceInfo.fwBuild ?? "N/A"}
            </Text>
          </Flex>
        </>
      )}
      {/* AMT general settings information */}
      {amtSettingsData?.Body && (
        <>
          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">AMT Host Name</Text>
            <Text className="vpro-details-value">
              {amtSettingsData.Body.HostName ?? "N/A"}
            </Text>
          </Flex>
          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">Domain Name</Text>
            <Text className="vpro-details-value">
              {amtSettingsData.Body.DomainName ?? "N/A"}
            </Text>
          </Flex>
          <Flex className="vpro-detail-container" cols={[4, 8]}>
            <Text className="vpro-details-label">Digest Realm</Text>
            <Text className="vpro-details-value">
              {amtSettingsData.Body.DigestRealm ?? "N/A"}
            </Text>
          </Flex>
        </>
      )}
      {(isDeviceLoading || isAmtSettingsLoading) && (
        <Text>Loading additional details...</Text>
      )}
    </div>
  );
};

export default VproDetails;
