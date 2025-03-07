/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AggregatedStatuses,
  CardBox,
  CardContainer,
  Empty,
  Flex,
  MetadataDisplay,
  setActiveNavItem,
  setBreadcrumb,
  TypedMetadata,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  checkAuthAndRole,
  CONSTANTS,
  HostGenericStatuses,
  hostToStatuses,
  isHostAssigned,
  isOSUpdateAvailable,
  parseError,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import {
  Button,
  Drawer,
  Heading,
  Icon,
  MessageBanner,
  Shimmer,
  Text,
} from "@spark-design/react";
import {
  ButtonVariant,
  MessageBannerAlertState,
  TextSize,
} from "@spark-design/tokens";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./HostDetails.scss";

import { eim } from "@orch-ui/apis";
import {
  configuredBreadcrumb,
  homeBreadcrumb,
  hostsActiveNavItem,
  hostsBreadcrumb,
  hostsConfiguredNavItem,
  hostsOnboardedNavItem,
  unconfiguredBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import {
  setErrorInfo,
  showMessageNotification,
} from "../../../store/notifications";
import HostDetailsActions from "../../organism/hosts/HostDetailsActions/HostDetailsActions";
import HostDetailsTab from "../../organism/hosts/HostDetailsTab/HostDetailsTab";
import ResourceDetails, {
  ResourceType,
  ResourceTypeTitle,
} from "../../organism/hosts/ResourceDetails";

const uiPowerStates = ["On", "Off"] as const;
export type uiPowerState = (typeof uiPowerStates)[number];

type urlParams = {
  id: string;
  uuid: string;
};

/** This will render a host's details */
const HostDetails: React.FC = () => {
  const cssSelectorIhd = "iaas-host-details";
  const dataCyIhd = "iaasHostDetails";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /* URL parsing when user visits host-details page */
  const { id, uuid } = useParams<urlParams>() as urlParams;

  /* Managing Host/Host-Resource details with api-hooks & states */
  const [host, setHost] = useState<eim.HostRead>();
  const [showResourceDetails, setShowResourceDetails] =
    useState<boolean>(false);
  const [resourceTitle, setResourceTitle] = useState<ResourceTypeTitle>();
  const [resourceData, setResourceData] = useState<ResourceType | null>(null);
  // Calling Host-related APIs
  const hostsQuery = eim.useGetV1ProjectsByProjectNameComputeHostsQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      uuid: uuid,
      detail: true,
    },
    {
      skip: !uuid || !SharedStorage.project?.name,
      pollingInterval: API_INTERVAL,
    },
  );

  const hostQuery = eim.useGetV1ProjectsByProjectNameComputeHostsAndHostIdQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      hostId: id,
    },
    {
      skip: !id || !SharedStorage.project?.name, // Skip call if url does not include host-id
      refetchOnMountOrArgChange: true,
      pollingInterval: API_INTERVAL,
    },
  );

  // Get instance if exists
  const { data: instance, isSuccess: isInstanceSuccess } =
    eim.useGetV1ProjectsByProjectNameComputeInstancesQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        hostId: id,
      },
      {
        skip: !id || !SharedStorage.project?.name, // Skip call if url does not include host-id
      },
    );

  const sitesQuery =
    eim.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        regionId: "*", // sitesFiltered logic can be updated with host regionId mapping
        pageSize: 100,
      },
      {
        skip: !SharedStorage.project?.name,
      },
    ); // Host's Site details

  // Below useEffects will set the host/site data to display
  useEffect(() => {
    if (!hostQuery.isLoading && !hostQuery.isError && hostQuery.data && id) {
      setHost(hostQuery.data);
    }
    if (hostQuery.isError) {
      const e = parseError(hostQuery.error);
      dispatch(setErrorInfo(e));
    }
  }, [hostQuery]);

  useEffect(() => {
    if (
      !hostsQuery.isLoading &&
      !hostsQuery.isError &&
      hostsQuery.data &&
      hostsQuery.data.hosts &&
      uuid
    ) {
      setHost(hostsQuery.data.hosts[0]);
    }
    if (hostsQuery.isError && hostsQuery.error) {
      const e = parseError(hostsQuery.error);
      dispatch(setErrorInfo(e));
    }
  }, [hostsQuery]);

  useEffect(() => {
    // check Site Existence
    if (sitesQuery.isError) {
      const e = parseError(sitesQuery.error);
      dispatch(setErrorInfo(e));
    }
  }, [sitesQuery]);
  useEffect(() => {
    // set Host-Resource
    //  Can only show drawer when we have both title & data
    if (!resourceTitle || !resourceData) return;
    setShowResourceDetails(true);
  }, [resourceTitle, resourceData]);

  /* Maintenance for Host */
  const [deleteMaintenanceSchedule] =
    // For Deactivating Maintenance option within Maintenance message banner or Host-Actions popup.
    // This option is only available within configured host details
    eim.useDeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdMutation();
  const { data: schedules } =
    eim.useGetV1ProjectsByProjectNameComputeSchedulesQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        hostId: id,
        unixEpoch: Math.trunc(+new Date() / 1000).toString(),
      },
      {
        skip: !host?.site || !SharedStorage.project?.name,
        pollingInterval: API_INTERVAL,
        // This will skip the isFetching event of rerender happening on every API polling cycle
        selectFromResult: ({ data, isError, isSuccess, isLoading }) => ({
          data,
          isError,
          isSuccess,
          isLoading,
          isFetching: true,
        }),
      },
    );
  /** contains all maintenance schedules that are not set from UI (by os, routine or external) */
  const filteredMaintenance =
    (schedules?.SingleSchedules?.filter(
      (schedule) =>
        // Gather all schedules that decide a host is in maintenance
        (schedule.scheduleStatus === "SCHEDULE_STATUS_MAINTENANCE" &&
          schedule.endSeconds &&
          schedule.endSeconds !== 0) ||
        schedule.scheduleStatus !== "SCHEDULE_STATUS_MAINTENANCE",
    ) ||
      schedules?.RepeatedSchedules) ??
    [];
  /** contains all maintenance schedules that are set by UI and can be deleted from UI */
  const filteredMaintenanceToDelete =
    schedules?.SingleSchedules?.filter(
      (schedule) =>
        // This condition determines whether a host is set by using UI
        schedule.scheduleStatus === "SCHEDULE_STATUS_MAINTENANCE" &&
        ((schedule.endSeconds && schedule.endSeconds === 0) ||
          !schedule.endSeconds),
    ) ?? [];

  /** decides if Details page needs to show the Maintenance (grey) banner */
  const isInMaintenance =
    schedules &&
    // Filtered host has atleast one single active maintenance schedule
    ((schedules.SingleSchedules && schedules.SingleSchedules?.length > 0) ||
      // OR Filtered host has atleast one periodically repeated active maintenance schedule
      (schedules.RepeatedSchedules && schedules.RepeatedSchedules.length > 0));
  /** This will trigger an API call to Deactivate Maintenance: if host & the maintenance for that host exist */
  const deactivateMaintenance = (host: eim.HostRead) => {
    if (filteredMaintenance.length !== 0) {
      dispatch(
        showMessageNotification({
          messageTitle: "Maintenance Mode Failure",
          messageBody:
            "Maintenance status is not of type SCHEDULE_STATUS_MAINTENANCE.",
          variant: MessageBannerAlertState.Error,
          showMessage: true,
        }),
      );
      return;
    }

    /** message shown on failed maintenance action */
    const failMessage = {
      messageTitle: "Maintenance Mode Failure",
      messageBody: `Failed to deactivate maintenance mode for ${
        host.name || "Host"
      }`,
      variant: MessageBannerAlertState.Success,
      showMessage: true,
    };

    if (
      filteredMaintenanceToDelete.length > 0 &&
      filteredMaintenanceToDelete[0].resourceId
    ) {
      // deactivate maintenance button should only delete first item in maintenance list
      deleteMaintenanceSchedule({
        projectName: SharedStorage.project?.name ?? "",
        singleScheduleId: filteredMaintenanceToDelete[0].resourceId,
      })
        .unwrap()
        .then(() => {
          dispatch(
            showMessageNotification({
              messageTitle: "Deactivated Maintenance Mode",
              messageBody: `${
                host.name || "Host"
              } is now out of maintenance mode`,
              variant: MessageBannerAlertState.Success,
              showMessage: true,
            }),
          );
        })
        .catch(() => {
          dispatch(showMessageNotification(failMessage));
        });
    } else {
      dispatch(showMessageNotification(failMessage));
    }
  };

  const isAssigned =
    instance && instance.instances && isHostAssigned(instance.instances);

  // These steps will set's the breadcrumb in Host Details page
  let hostBreadcrumb = { text: "Getting host...", link: "#" };
  if (host) {
    hostBreadcrumb = host.site
      ? isAssigned
        ? hostsBreadcrumb
        : configuredBreadcrumb
      : unconfiguredBreadcrumb;
  } else if (hostQuery.isError || hostsQuery.isError) {
    hostBreadcrumb = hostsBreadcrumb;
  }
  const breadcrumb = [
    homeBreadcrumb,
    hostBreadcrumb,
    {
      text: `${id}`,
      link: `${host && host.site ? "host" : "unconfigured-host"}/${
        host?.resourceId
      }`,
    },
    {
      text: "View Details",
      link: "#",
    },
  ];
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));

    const isAssigned =
      instance && instance.instances && isHostAssigned(instance.instances);

    if (host && isAssigned !== undefined) {
      const nextActiveItem = host.site
        ? isAssigned
          ? hostsActiveNavItem
          : hostsConfiguredNavItem
        : hostsOnboardedNavItem;
      dispatch(setActiveNavItem(nextActiveItem));
    }
  }, [breadcrumb]);

  /* Render Host Details by API states */
  if (!host && (hostQuery.isError || hostsQuery.isError)) {
    return <></>;
  } else if (
    hostsQuery.isLoading ||
    hostQuery.isLoading ||
    sitesQuery.isLoading ||
    !host
  ) {
    return <Shimmer />;
  }

  /* isSuccess */
  /** site details filtered by the site which the host allocated */
  const sitesFiltered =
    sitesQuery && sitesQuery.data && sitesQuery.data.sites
      ? sitesQuery.data.sites.filter(
          (siteQuery) => siteQuery.resourceId === host.site?.resourceId,
        )
      : null;
  /** site details with verified existence */
  const site =
    sitesFiltered && sitesFiltered.length > 0 ? sitesFiltered[0] : undefined;

  // Do Metadata-related work
  /** contains both inherited */
  const inheritedMetadata: TypedMetadata[] = [
    ...(site?.metadata?.map((metadata) => {
      return { ...metadata, type: "site" };
    }) ?? []),
    ...(site?.inheritedMetadata?.location?.map((metadata) => {
      return { ...metadata, type: "region" };
    }) ?? []),
  ];

  return (
    <div className={cssSelectorIhd} data-cy={dataCyIhd}>
      {/* HostDetails Heading */}
      <div className={`${cssSelectorIhd}__header`}>
        <Heading semanticLevel={1} size="l" data-cy={`${dataCyIhd}Header`}>
          {host.name != "" ? host.name : host.resourceId}
        </Heading>
        <HostDetailsActions
          host={{
            ...host,
            instance:
              isInstanceSuccess && instance.instances.length > 0
                ? instance.instances[0]
                : undefined,
          }}
          jsx={
            <button
              className="spark-button spark-button-action spark-button-size-l spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
              type="button"
            >
              <span className="spark-button-content">
                Host Actions
                <Icon className="pa-1 mb-1" icon="chevron-down" />
              </span>
            </button>
          }
        />
      </div>

      {/* Host-Details: HostStatus */}
      <Flex cols={[12]}>
        <Text size={TextSize.Large}>
          Status: &nbsp;
          <AggregatedStatuses<HostGenericStatuses>
            defaultStatusName="hostStatus"
            statuses={hostToStatuses(
              host,
              isInstanceSuccess && instance.instances.length > 0
                ? instance.instances[0]
                : undefined,
            )}
            defaultMessages={{ idle: CONSTANTS.HOST_STATUS.NOT_CONNECTED }}
          />
          {isOSUpdateAvailable(host?.instance) && (
            <label className={"update-available"}>
              <Icon icon={"alert-triangle"} className={"warning-icon"} /> OS
              update available
            </label>
          )}
        </Text>
      </Flex>

      {/* Host-Details: Maintenance Banner (shown only for CONFIGURED host through Host Actions popup)
          A Grey box shown only when a host is going Under Maintenance.
          Contains a Method for deactivating Maintenance for a host */}
      {isInMaintenance && (
        <div data-cy={`${dataCyIhd}MaintenanceBanner`}>
          <MessageBanner
            showActionButtons
            showIcon
            variant="info"
            exposeColor="grey"
            messageTitle="This host is in maintenance mode"
            messageBody="A user has put this host into maintenance mode while it is being serviced or transported."
            primaryText=""
            secondaryText={
              // Not rendering secondary button for repeated schedules
              schedules?.RepeatedSchedules?.length === 0
                ? "Deactivate Maintenance Mode"
                : ""
            }
            disableSecondary={
              filteredMaintenance.length !== 0 ||
              !checkAuthAndRole([Role.INFRA_MANAGER_WRITE])
            }
            onClickSecondary={() => deactivateMaintenance(host)}
          />
        </div>
      )}

      {/* Host-Details: Description table (shown only when host is CONFIGURED) */}
      <Flex
        className={`${cssSelectorIhd}__host-description`}
        cols={[6, 6]}
        colsSm={[12, 12]}
      >
        <div>
          <table
            className={`${cssSelectorIhd}__host-description__table`}
            data-cy={`${dataCyIhd}HostDescriptionTable`}
          >
            <tr>
              <td>Serial Number</td>
              <td data-cy="serial">{host.serialNumber || "-"}</td>
            </tr>
            <tr>
              <td>UUID</td>
              <td data-cy="guid">{host.uuid || "-"}</td>
            </tr>
            {host.site && (
              <>
                <tr>
                  <td>OS</td>
                  <td data-cy="osProfiles">
                    {(isInstanceSuccess &&
                      instance.instances.length > 0 &&
                      instance.instances[0].os?.name) ||
                      "-"}
                  </td>
                </tr>
                <tr>
                  <td>Updates</td>
                  <td data-cy="desiredOsProfiles">
                    {(isInstanceSuccess &&
                      instance.instances.length > 0 &&
                      instance.instances[0].desiredOs?.name) ||
                      "-"}
                  </td>
                </tr>
              </>
            )}
            {host.site && (
              <tr>
                <td>Site</td>
                <td data-cy="site">{site?.name || "-"}</td>
              </tr>
            )}
            {(host.provider?.providerVendor === "PROVIDER_VENDOR_LENOVO_LOCA" ||
              host.provider?.providerVendor ===
                "PROVIDER_VENDOR_LENOVO_LXCA") && (
              <tr>
                <td>Provider</td>
                <td data-cy="provider">{host.provider.name}</td>
              </tr>
            )}
          </table>
        </div>
        {host.site && (
          <CardContainer
            dataCy={`${dataCyIhd}DeploymentMetadata`}
            className="deployment-heading"
            cardTitle="Location Information"
            titleSemanticLevel={6}
          >
            {inheritedMetadata.length === 0 && (
              <CardBox>
                <Empty icon="database" subTitle="Metadata are not defined" />
              </CardBox>
            )}
            {inheritedMetadata.length > 0 && (
              <MetadataDisplay metadata={inheritedMetadata} />
            )}
          </CardContainer>
        )}
      </Flex>

      {/* Host-Details: Additional Tabs */}
      <HostDetailsTab
        onShowCategoryDetails={(
          title: ResourceTypeTitle,
          data: ResourceType,
        ) => {
          setResourceTitle(title);
          setResourceData(data);
        }}
        host={host}
      />

      <div className={`${cssSelectorIhd}__footer`}>
        <Button onPress={() => navigate(-1)} variant={ButtonVariant.Primary}>
          Back
        </Button>
      </div>

      {/* Host-Details: Drawer component on click of any HostResource */}
      {resourceTitle && resourceData && (
        <Drawer
          show={showResourceDetails}
          backdropClosable={true}
          onHide={() => {
            setShowResourceDetails(false);
            setResourceData(null);
          }}
          headerProps={{ title: resourceTitle }}
          bodyContent={
            <>
              {resourceTitle && resourceData && (
                <ResourceDetails data={resourceData} title={resourceTitle} />
              )}
            </>
          }
        />
      )}
    </div>
  );
};

export default HostDetails;
