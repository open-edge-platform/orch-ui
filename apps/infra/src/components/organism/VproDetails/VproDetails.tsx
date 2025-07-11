/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra, mps } from "@orch-ui/apis";
import { ApiError, Status, StatusIcon } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import VproDetailItem from "./VproDetailItem";
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
    <div {...cy} className="vpro-details-container">
      {/* MPS device information */}
      <div className="section-header">Device Details</div>
      {deviceData && (
        <>
          <VproDetailItem
            label="Connection Status"
            value={
              <div className="connection-status">
                <StatusIcon
                  status={
                    deviceData.connectionStatus ? Status.Ready : Status.NotReady
                  }
                  text={
                    deviceData.connectionStatus ? "Connected" : "Not Connected"
                  }
                />
              </div>
            }
          />

          <VproDetailItem
            label="Display Name"
            value={deviceData.friendlyName}
          />
          <VproDetailItem label="DNS Suffix" value={deviceData.dnsSuffix} />
        </>
      )}
      {deviceData?.deviceInfo && (
        <>
          <VproDetailItem
            label="IP Address"
            value={deviceData.deviceInfo.ipAddress}
          />
          <VproDetailItem
            label="Current Mode"
            value={deviceData.deviceInfo.currentMode}
          />
          <VproDetailItem
            label="Firmware Version"
            value={deviceData.deviceInfo.fwVersion}
          />
          <VproDetailItem
            label="Firmware SKU"
            value={deviceData.deviceInfo.fwSku}
          />
          <VproDetailItem
            label="Firmware build"
            value={deviceData.deviceInfo.fwBuild}
          />
        </>
      )}
      {/* AMT general settings information */}
      <div className="section-header">AMT General Settings</div>
      {amtSettingsData?.Body && (
        <>
          <VproDetailItem
            label="AMT Host Name"
            value={amtSettingsData.Body.HostName}
          />
          <VproDetailItem
            label="Domain Name"
            value={amtSettingsData.Body.DomainName}
          />
          <VproDetailItem
            label="Digest Realm"
            value={amtSettingsData.Body.DigestRealm}
          />
        </>
      )}
      {(isDeviceLoading || isAmtSettingsLoading) && (
        <Text>Loading additional details...</Text>
      )}
    </div>
  );
};

export default VproDetails;
