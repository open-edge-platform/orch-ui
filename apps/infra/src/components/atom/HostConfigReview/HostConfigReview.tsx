/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { eim } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { Icon } from "@spark-design/react";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { HostData, selectHosts } from "../../../store/configureHost";
import { useAppSelector } from "../../../store/hooks";
import { getTrustedComputeCompatibility } from "@orch-ui/utils";
import "./HostConfigReview.scss";

const dataCy = "hostConfigReview";

interface IosItem {
  count?: number;
  name?: string;
}
interface IoS {
  [id: string]: IosItem;
}

interface ISecurityFeature {
  [key: string]: number;
}

interface IProcessStat {
  osTypes: IoS;
  securityFeature: ISecurityFeature;
}
export interface HostConfigReviewProps {
  hostResults: Map<string, string | true>;
  localAccounts: eim.LocalAccountRead[] | undefined;
}
export const HostConfigReview = ({
  hostResults,
  localAccounts,
}: HostConfigReviewProps) => {
  const cy = { "data-cy": dataCy };
  const tableRef = useRef(null);
  const [expanded, setExpanded] = useState<boolean>(true);

  const hosts = useAppSelector(selectHosts);

  const hostsValues: HostData[] = Object.values(hosts);

  const hasFailedToProvision = (host: HostData) => {
    return typeof hostResults.get(host.name) === "string" ? 1 : 0;
  };
  const details = () => {
    const sortedHostResults = hostsValues.sort((a, b) => {
      const aHasFailed: number = hasFailedToProvision(a);
      const bHasFailed: number = hasFailedToProvision(b);
      return bHasFailed - aHasFailed;
    });

    return (
      <CSSTransition
        appear={true}
        in={expanded}
        nodeRef={tableRef}
        classNames="slide-down"
        addEndListener={(done: () => void) => done}
      >
        <div ref={tableRef} className="slide-down">
          <div className="scrollable-table-container">
            <table
              className="host-provision-review-table"
              data-cy="hostConfigReviewTable"
            >
              <thead>
                <tr>
                  <th data-cy="tableHeaderCell">Name</th>
                  <th data-cy="tableHeaderCell">Serial Number and UUID</th>
                  <th data-cy="tableHeaderCell">OS Profile</th>
                  <th data-cy="tableHeaderCell">
                    Secure Boot and Full Disk Encryption
                  </th>
                  <th data-cy="tableHeaderCell">Trusted Compute</th>
                  <th data-cy="tableHeaderCell">Public SSH Key</th>
                </tr>
              </thead>
              <tbody>
                {sortedHostResults.map((host) => {
                  const selectedAccount = localAccounts?.find(
                    (acc) => acc.resourceId === host.instance?.localAccountID,
                  );
                  const sbFdeEnabled =
                    host.instance?.securityFeature ===
                    "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION";
                  const rowContent = (
                    <tr data-cy="tableRow">
                      <td data-cy="tableRowCell">{host.name}</td>
                      <td data-cy="tableRowCell">
                        <div className="serial-number">{host.serialNumber}</div>
                        <div className="uuid">{host.uuid}</div>
                      </td>
                      <td data-cy="tableRowCell">
                        {host.instance?.os ? host.instance.os.name : "-"}
                      </td>
                      <td data-cy="tableRowCell">
                        {sbFdeEnabled ? "Enabled" : "Disabled"}
                      </td>
                      <td data-cy="tableRowCell">
                        {getTrustedComputeCompatibility(host).text}
                      </td>
                      <td data-cy="tableRowCell">
                        {selectedAccount ? selectedAccount.username : "-"}
                      </td>
                    </tr>
                  );
                  const hostResult = hostResults.get(host.name);
                  let resultContent: React.ReactElement = <></>;
                  if (typeof hostResult === "string") {
                    resultContent = (
                      <tr className="failed-message">
                        <td colSpan={4}>API Error: {hostResult}</td>
                      </tr>
                    );
                  }
                  if (hostResult === true) {
                    resultContent = (
                      <tr className="success-message">
                        <td colSpan={4}>Host successfully registered.</td>
                      </tr>
                    );
                  }

                  return (
                    <>
                      {rowContent}
                      {resultContent}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </CSSTransition>
    );
  };

  const processStats = (items: HostData[]): IProcessStat => {
    const osTypes: IoS = {};
    const securityFeature: ISecurityFeature = {};
    items.forEach((item) => {
      if (item.instance) {
        // fail safe check
        if (item.instance.osID) {
          /* Calculating number of os and counts */
          const osId = item.instance.osID;
          const osName = item.instance.os?.name;

          if (!osTypes[osId]) {
            osTypes[osId] = {
              name: osName,
              count: 0,
            };
          }
          // @ts-ignore: Object is possibly 'null'. "instance" check is already done
          osTypes[osId].count += 1;
        }

        /* Calculating enabled/disabled security features count */
        if (
          item.instance.securityFeature &&
          !securityFeature[item.instance.securityFeature]
        ) {
          // If security feature string is not in object already, initialize it to zero
          securityFeature[item.instance.securityFeature] = 0;
        }
        // @ts-ignore: Object is possibly 'null'."instance" check is already done
        securityFeature[item.instance.securityFeature] += 1;
      }
    });
    return { osTypes, securityFeature };
  };

  const totalHostsCount = hostsValues.length;
  const firstHost = hostsValues[0]; // Since region and site will be same for all hosts, picking any 1
  const siteName = firstHost?.site?.name;
  const { osTypes, securityFeature }: IProcessStat = processStats(hostsValues);

  return (
    <div
      {...cy}
      className="host-config-review"
      style={{ overflowY: expanded ? "auto" : "hidden" }}
    >
      <div className="deployment-application-details-row">
        <Flex cols={[8, 4]}>
          <div className="hosts-overview-container">
            <div className="icon-container">
              <Icon
                className="hosts-overview-icon"
                artworkStyle="regular"
                icon="rack-mount"
                onClick={() => setExpanded((e) => !e)}
              />
            </div>
            <div className="hosts-overview">
              <div>
                <span data-cy="totalHosts" className="hosts-overview-label">
                  Total hosts: {totalHostsCount}
                </span>
                <span className="dot-separator" />
                <span data-cy="siteName" className="hosts-overview-label">
                  Site: {siteName}
                </span>
              </div>
              <div
                data-cy="operatingSystem"
                className="hosts-overview-sub-label"
              >
                Operating System:
                {Object.values(osTypes)
                  .map<React.ReactNode>((item: IosItem) => (
                    <span className="p-2" key={item.name}>
                      {item.name} {`(${item.count})`}
                    </span>
                  ))
                  .reduce((prev, curr) => [prev, ", ", curr], [])}
              </div>
              <div data-cy="security" className="hosts-overview-sub-label">
                Security:
                <span className="p-2">{`Enabled (${securityFeature["SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"] ?? 0}),`}</span>
                <span className="p-2">{`Disabled (${securityFeature["SECURITY_FEATURE_NONE"] ?? 0})`}</span>
              </div>
            </div>
          </div>
          <div className="expand-action-icon-container">
            <Icon
              data-cy="expandToggle"
              className="expand-toggle"
              artworkStyle="regular"
              icon={expanded ? "chevron-down" : "chevron-right"}
              onClick={() => setExpanded((e) => !e)}
            />
          </div>
        </Flex>
      </div>
      {details()}
    </div>
  );
};
