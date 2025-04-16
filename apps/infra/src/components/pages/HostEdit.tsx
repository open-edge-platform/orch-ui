/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim, mbApi } from "@orch-ui/apis";
import {
  ApiError,
  Flex,
  MetadataForm,
  MetadataPair,
  setActiveNavItem,
  SquareSpinner,
} from "@orch-ui/components";
import {
  checkAuthAndRole,
  parseError,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Combobox,
  Heading,
  Item,
  TextField,
} from "@spark-design/react";
import {
  ComboboxSize,
  ComboboxVariant,
  InputSize,
  MessageBannerAlertState,
  ToastState,
} from "@spark-design/tokens";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { hostsNavItem } from "../../routes/const";
import { useAppDispatch } from "../../store/hooks";
import {
  disableMessageBanner,
  showMessageNotification,
  showToast,
} from "../../store/notifications";
import "./HostEdit.scss";

export type HostInputs = {
  hostName: string;

  region: string;
  site: string;
  metadata: MetadataPair[];
};

type urlParams = {
  id: string;
};

const HostEdit = () => {
  const cssComponentSelector = "infra-host-edit";
  const datacyComponentSelector = "hostEdit";

  const { id } = useParams<urlParams>() as urlParams;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control: controlBasicInfo } = useForm<HostInputs>({
    mode: "all",
  });

  /* Host Edit states */
  const [host, setHost] = useState<eim.HostRead>();
  const [selectedSite, setSelectedSite] = useState<eim.SiteRead>();
  const [selectedRegion, setSelectedRegion] = useState<eim.RegionRead>();
  const [metadataPairs, setMetadataPairs] = useState<MetadataPair[]>([]);
  const [hasMetadataError, setHasMetadataError] = useState<boolean>(false);

  /* Host Edit API calls */
  // At First, call the host API
  const {
    data: hostData,
    isSuccess,
    isLoading,
    isError,
  } = eim.useGetV1ProjectsByProjectNameComputeHostsAndHostIdQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      hostId: id,
    },
    {
      selectFromResult: ({ data, isSuccess, isLoading, isError }) => ({
        data,
        isSuccess,
        isLoading,
        isError,
        isFetching: true,
      }),
    },
  );
  // If the host data is successfully loaded, save host data
  useEffect(() => {
    if (isSuccess && hostData) {
      setHost(hostData);
      if (hostData.metadata) {
        setMetadataPairs(hostData.metadata);
      }
    }
  }, [hostData]);

  // Then, Get site data mentioned by host(.template.site) to get the region & site selected by default
  const isRegionNotSelected = !selectedRegion; // This is required to convert to boolean as Region is object not boolean
  const { data: hostSiteData } =
    eim.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdQuery(
      {
        // IMPORTANT: we used the "rid" fallback to pass anything else than empty string
        // for 24.11 api requires any non-empty value to return the site data
        // currently the host object does not contain the data about region
        regionId: host?.site?.region?.resourceId ?? "rid",
        projectName: SharedStorage.project?.name ?? "",
        siteId: host?.site?.siteID ?? "",
      },
      {
        // Skip this API if selection is made or host or host site value not exist
        skip: !isRegionNotSelected || !host || (host && !host.site),
      },
    );

  // Seeing if a hostID is unassigned by seeing its instance workloadMemberID is a null
  const {
    data: instanceList,
    isSuccess: isInstanceSuccess,
    isLoading: isInstanceLoading,
    isError: isInstanceError,
  } = eim.useGetV1ProjectsByProjectNameComputeInstancesQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      hostId: host?.resourceId,
      workloadMemberId: "null",
    },
    { skip: !host?.resourceId },
  );

  const { data: regionData, isLoading: isRegionLoading } =
    eim.useGetV1ProjectsByProjectNameRegionsQuery(
      { projectName: SharedStorage.project?.name ?? "" },
      { skip: !host || !isRegionNotSelected },
    );
  useEffect(() => {
    if (
      host &&
      hostSiteData &&
      hostSiteData &&
      regionData &&
      regionData.regions
    ) {
      const filteredRegion = regionData.regions.filter(
        (region) => region.resourceId === hostSiteData.region?.resourceId,
      );

      if (filteredRegion.length > 0) {
        setSelectedRegion(filteredRegion[0]);
      }
    }
  }, [regionData, hostSiteData]);

  // If Host & Region API data are both loaded
  const { data: siteData, isLoading: isSiteLoading } =
    eim.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        filter: `region.resourceId='${selectedRegion?.resourceId ?? ""}'`,
        regionId: selectedRegion?.resourceId ?? "",
      },
      { skip: !host || !selectedRegion?.resourceId },
    );
  useEffect(() => {
    if (!selectedSite && hostData && siteData && siteData.sites) {
      const filteredSite = siteData.sites.filter(
        (site) => site.resourceId == hostData.site?.resourceId,
      );
      if (filteredSite.length > 0) {
        setSelectedSite(filteredSite[0]);
      }
    }
  }, [siteData]);

  // Region & Site Dropdown enable/disable change
  const isRegionSiteLoading =
    isInstanceLoading || isRegionLoading || isSiteLoading;
  const isRegionSiteDisabled =
    (isInstanceSuccess && (instanceList.instances?.length ?? 0) === 0) ||
    isInstanceError;

  const [updateHost] =
    eim.usePutV1ProjectsByProjectNameComputeHostsAndHostIdMutation();
  const [updateMetadata] =
    mbApi.useMetadataServiceCreateOrUpdateMetadataMutation();

  const metadataContent = useMemo(
    () => (
      <MetadataForm
        leftLabelText="Key"
        rightLabelText="Value"
        pairs={metadataPairs}
        isDisabled={!checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
        onUpdate={(metadataPairs) => {
          // Add new host-specific metadata
          setMetadataPairs(metadataPairs);
        }}
        buttonText="+"
        hasError={(error) => setHasMetadataError(error)}
      />
    ),
    [metadataPairs],
  );

  useEffect(() => {
    dispatch(setActiveNavItem(hostsNavItem));
  }, []);

  const updateHostEdits = () => {
    // UPDATE HOST
    if (host && host.resourceId) {
      Promise.all([
        updateHost({
          projectName: SharedStorage.project?.name ?? "",
          hostId: host.resourceId,
          body: {
            name: host.name ?? "",
            site: undefined,
            siteId: selectedSite?.siteID,
            currentPowerState: host.currentPowerState,
            desiredPowerState: host.desiredPowerState,
            inheritedMetadata: host.inheritedMetadata,
            metadata: metadataPairs,
          },
        }).unwrap(),
        updateMetadata({
          projectName: SharedStorage.project?.name ?? "",
          metadataList: { metadata: metadataPairs },
        }).unwrap(),
      ])
        .then(() => {
          dispatch(
            showMessageNotification({
              messageTitle: "Update successful",
              messageBody: `${host.name || "Host"} is update successfully.`,
              variant: MessageBannerAlertState.Success,
            }),
          );
          setTimeout(() => {
            dispatch(disableMessageBanner());
            navigate("../../hosts");
          }, 3000);
        })
        .catch((e) => {
          // Upon 500 errors
          dispatch(
            showToast({
              message: `Error: Unable to update successfully. ${
                parseError(e).data
              }`,
              state: ToastState.Danger,
            }),
          );
        });
    }
  };

  if (isError) {
    return (
      <ApiError
        error={{
          data: "Error: Host is not loaded",
          status: "CUSTOM_ERROR",
        }}
      />
    );
  } else if (!host || isLoading) {
    return <SquareSpinner />;
  }

  return (
    <div className={cssComponentSelector} data-cy={datacyComponentSelector}>
      <div className={`${cssComponentSelector}__header`}>
        <Heading
          semanticLevel={1}
          size="l"
          data-cy={`${datacyComponentSelector}Header`}
        >
          Edit Host
        </Heading>
      </div>

      <form
        className={`${cssComponentSelector}-form`}
        onSubmit={(e) => {
          e.preventDefault();
          updateHostEdits();
        }}
      >
        <div className="row">
          <Controller
            name="hostName"
            control={controlBasicInfo}
            rules={{
              required: true,
              maxLength: 63,
              pattern: new RegExp("^$|^[a-zA-Z-_0-9./: ]+$"),
            }}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Name"
                value={host?.name}
                maxLength={20}
                pattern="^$|^[a-zA-Z-_0-9./: ]+$"
                onInput={(e) =>
                  setHost({ ...host, name: e.currentTarget.value })
                }
                errorMessage={
                  formState.errors.hostName?.type === "required"
                    ? "Host name is required"
                    : formState.errors.hostName?.type === "maxLength"
                      ? "Name can't be more than 20 characters"
                      : "Host name must contain alphanumeric and symbols (. / :) only"
                }
                validationState={
                  formState.errors.hostName &&
                  Object.keys(formState.errors.hostName).length > 0
                    ? "invalid"
                    : "valid"
                }
                isDisabled={!checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
                isRequired={true}
                size={InputSize.Large}
                data-cy="nameInput"
              />
            )}
          />
        </div>

        <div className="row">
          <Heading semanticLevel={6}>Location Information</Heading>
          {!isRegionSiteLoading && (
            <Flex cols={[12, 12]} colsLg={[6, 6]}>
              <div className="pa-1">
                <Combobox
                  label="Region"
                  placeholder="Select a Region..."
                  size={ComboboxSize.Large}
                  variant={ComboboxVariant.Primary}
                  isDisabled={
                    !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]) ||
                    isRegionSiteDisabled
                  }
                  inputValue={selectedRegion?.name}
                  onSelectionChange={(selection: string) => {
                    if (regionData && regionData.regions) {
                      const filteredRegion = regionData?.regions?.filter(
                        (region) => region.resourceId === selection,
                      );
                      if (filteredRegion.length > 0) {
                        setSelectedRegion(filteredRegion[0]);
                        setSelectedSite(undefined);
                      }
                    }
                  }}
                  isRequired={true}
                  data-cy="regionCombobox"
                >
                  {regionData && regionData.regions
                    ? regionData.regions.map((region) => (
                        <Item textValue={region.name} key={region.resourceId}>
                          {region.name}
                        </Item>
                      ))
                    : []}
                </Combobox>
              </div>
              <div className="pa-1">
                <Combobox
                  label="Site"
                  placeholder="Select a Site... (None)"
                  size={ComboboxSize.Large}
                  variant={ComboboxVariant.Primary}
                  isDisabled={
                    !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]) ||
                    isRegionSiteDisabled
                  }
                  inputValue={selectedSite?.name}
                  onSelectionChange={(selection: string) => {
                    if (siteData && siteData.sites) {
                      const filteredSite = siteData?.sites?.filter(
                        (site) => site.resourceId === selection,
                      );
                      if (filteredSite.length > 0) {
                        setSelectedSite(filteredSite[0]);
                      }
                    }
                  }}
                  data-cy="siteCombobox"
                >
                  {siteData && siteData.sites
                    ? siteData.sites.map((site) => (
                        <Item textValue={site.name} key={site.resourceId}>
                          {site.name}
                        </Item>
                      ))
                    : []}
                </Combobox>
              </div>
            </Flex>
          )}
          {isRegionSiteLoading && <SquareSpinner />}
        </div>

        <div className="row" data-cy={`${datacyComponentSelector}HostLabels`}>
          <Heading className="host-labels" semanticLevel={6}>
            Host Labels
          </Heading>
          <div className="pa-1">
            <Flex cols={[12, 12]} colsLg={[6, 6]}>
              {metadataContent}
            </Flex>
          </div>

          <div className="edit-buttons row">
            <hr />
            <ButtonGroup align="end">
              <Button
                type="button"
                className="cancel-button"
                variant="primary"
                data-cy="cancelHostButton"
                onPress={() => {
                  navigate("../../hosts");
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="update-button"
                variant="action"
                data-cy="updateHostButton"
                isDisabled={hasMetadataError}
              >
                Save
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HostEdit;
