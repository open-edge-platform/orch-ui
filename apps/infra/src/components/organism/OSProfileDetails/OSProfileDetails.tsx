/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";
import { Item, MessageBanner, Tabs, Text } from "@spark-design/react";
import { useState } from "react";
import OsProfileDetailField from "./OsProfileDetailField";

import "./OSProfileDetails.scss";

const dataCy = "osProfileDetails";

// NonNullable is used since if securityFeature is not selected it will correspond to NONE
export const OSProfileSecurityFeatures: {
  [key in NonNullable<
    infra.OperatingSystemResource["securityFeature"]
  >]: string;
} = {
  SECURITY_FEATURE_UNSPECIFIED: "Unspecified",
  SECURITY_FEATURE_NONE: "None",
  SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION: "Secure Boot / FDE",
};

interface OSProfileDetailsProps {
  os: infra.OperatingSystemResourceRead;
}
/**
 * Represents a OS package with its name, version, and distribution.
 */
export interface Package {
  Name: string;
  Version: string;
  Distribution: string;
}
interface InstalledPackages {
  Repo: Package[];
}

export interface Cve {
  /** Unique identifier for the CVE in the format CVE-YYYY-NNNNN */
  cve_id: string;
  /** Severity level of the vulnerability (e.g., "critical", "high", "medium", "low") */
  priority: "critical" | "high" | "medium" | "low" | string;
  /** Array of package names affected by this vulnerability */
  affected_packages: string[];
}

/**
 * Type guard function to check if the given argument is of type InstalledPackages.
 *
 * @param arg - The argument to check.
 * @returns True if the argument is of type InstalledPackages, otherwise false.
 */
const isInstalledPackages = (arg: any): arg is InstalledPackages => {
  if (!arg) return true;
  return (
    arg &&
    arg.Repo &&
    Array.isArray(arg.Repo) &&
    arg.Repo.every(
      (pkg: any) =>
        typeof pkg.Name === "string" &&
        typeof pkg.Version === "string" &&
        typeof pkg.Distribution === "string",
    )
  );
};

/**
 * Renders the details of a package.
 *
 * @param {Package} pkg - The package object containing details to be rendered.
 * @returns {JSX.Element} The JSX element containing the package details.
 */
const renderPackage = (pkg: Package) => {
  return (
    <>
      <span className="line"></span>
      <div>
        <Text>{pkg.Name}</Text>
      </div>
      <div>
        <Text>{pkg.Version}</Text>
      </div>
      <div>
        <Text>{pkg.Distribution}</Text>
      </div>
    </>
  );
};

const CveColumns: TableColumn<Cve>[] = [
  {
    Header: "Cve Id",
    apiName: "cve_id",
    accessor: (item) => {
      if (item.cve_id) {
        return item.cve_id;
      }
    },
  },
  {
    Header: "Priority",
    apiName: "priority",
    accessor: (item) => {
      if (item.priority) {
        return item.priority;
      }
    },
  },
  {
    Header: "Affected Packages",
    apiName: "affected_packages",
    accessor: (item) => {
      if (item.affected_packages) {
        return item.affected_packages.join();
      }
    },
  },
];

const OSProfileDetails = ({ os }: OSProfileDetailsProps) => {
  const cy = { "data-cy": dataCy };
  const [tabIndex, setTabIndex] = useState<number>(0);

  const osProfileSecurity =
    os.securityFeature && OSProfileSecurityFeatures[os.securityFeature];
  const parsedPackages = os?.installedPackages
    ? JSON.parse(os?.installedPackages)
    : null;
  const isValidPackage = isInstalledPackages(parsedPackages);
  const installedPackages: Package[] =
    isValidPackage && parsedPackages ? parsedPackages.Repo : [];
  const existingCves: Cve[] = os?.existingCves
    ? JSON.parse(os.existingCves)
    : null;

  return (
    <div className="os-profile-detail-content" {...cy}>
      <div className="os-details-header">Details</div>
      <OsProfileDetailField label={"Name"} value={os.name} />
      <OsProfileDetailField label="Profile Name" value={os.profileName} />
      <OsProfileDetailField
        label="Security Features"
        value={osProfileSecurity}
      />
      <OsProfileDetailField label="Architecture" value={os.architecture} />
      <div className="os-details-advanced-settings">Advanced Settings</div>
      <OsProfileDetailField
        label="Update Sources"
        value={os.updateSources?.join()}
      />
      <OsProfileDetailField label="Repository URL" value={os.imageUrl} />
      <OsProfileDetailField label="sha256" value={os.sha256} />
      <OsProfileDetailField label="Kernel Command" value={os.kernelCommand} />

      <div className="os-details-installed-packages">System Overview</div>

      <div className="tabs-container">
        <Tabs
          onSelectionChange={(key) => {
            const index = key.toString().split(".")[1];
            setTabIndex(parseInt(index));
          }}
          selectedKey={`$.${tabIndex.toString()}`}
        >
          <Item className="osprofile-tab-item" title="Installed Packages">
            <div
              className="installed-packages-content"
              data-cy="installedPackagesTab"
            >
              {installedPackages.length ? (
                <>
                  <div
                    data-cy="installedPackagesRoot"
                    className={"installed-packages__grid-wrapper"}
                  >
                    <div>
                      <Text style={{ fontWeight: "500" }}>Name</Text>
                    </div>
                    <div>
                      <Text style={{ fontWeight: "500" }}>Version</Text>
                    </div>
                    <div>
                      <Text style={{ fontWeight: "500" }}>Distribution</Text>
                    </div>
                    {installedPackages.map((pkg: Package) =>
                      renderPackage(pkg),
                    )}
                  </div>
                </>
              ) : !isValidPackage ? (
                <MessageBanner
                  messageTitle=""
                  variant="error"
                  size="m"
                  messageBody={
                    "Invalid JSON format recieved for Installed packages."
                  }
                  showIcon
                  outlined
                />
              ) : null}
            </div>
          </Item>

          <Item className="osprofile-tab-item" title="Cves">
            <div className="cve-content" data-cy="cveTabRoot">
              <Table
                columns={CveColumns}
                data={existingCves}
                sortColumns={[1]}
                initialSort={{
                  column: "Priority",
                  direction: "asc",
                }}
              />
            </div>
          </Item>
        </Tabs>
      </div>
    </div>
  );
};

export default OSProfileDetails;
