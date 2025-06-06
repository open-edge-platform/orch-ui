/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra, mbApi } from "@orch-ui/apis";
import {
  ApiError,
  Flex,
  MetadataForm,
  MetadataPair,
  TableLoader,
} from "@orch-ui/components";
import {
  checkAuthAndRole,
  locationRoute,
  logError,
  parseError,
  Role,
  SharedStorage,
  SparkTableColumn,
  TelemetryLogLevel,
  useInfraNavigate,
} from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Dropdown,
  FieldLabel,
  Heading,
  Item,
  MessageBanner,
  ProgressLoader,
  RadioButton,
  RadioGroup,
  Table,
  TextField,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
  HeaderSize,
  InputSize,
  RadioButtonSize,
  ToastState,
} from "@spark-design/tokens";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import TelemetryLogsForm, {
  SystemLogPair,
} from "../../../components/organism/TelemetryLogsForm/TelemetryLogsForm";
import TelemetryMetricsForm, {
  SystemMetricPair,
} from "../../../components/organism/TelemetryMetricsForm/TelemetryMetricsForm";
import { useAppDispatch } from "../../../store/hooks";
import { setTreeBranchNodeCollapse } from "../../../store/locations";
import { setErrorInfo, showToast } from "../../../store/notifications";
import { handleSiteViewAction } from "../../organism/locations/RegionSiteTree/RegionSiteTree.handlers";
import "./SiteForm.scss";

const dataCy = "siteForm";

type urlParams = {
  regionId: string | undefined;
  siteId: string;
};

const SiteForm = () => {
  const { regionId, siteId } = useParams<urlParams>() as urlParams;
  const {
    data: site,
    isLoading,
    isError,
    isFetching,
    error,
  } = infra.useSiteServiceGetSiteQuery(
    {
      regionResourceId: regionId ?? "", //TODO: not used in EIM endpoint
      projectName: SharedStorage.project?.name ?? "",
      resourceId: siteId,
    },
    {
      skip: siteId === "new" || !regionId || !SharedStorage.project?.name,
    },
  );

  const { data: region } = infra.useRegionServiceGetRegionQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      resourceId: regionId ?? "",
    },
    { skip: !regionId || !SharedStorage.project?.name },
  );

  const {
    data: profileMetrics,
    error: profileMetricError,
    isError: profileMetricIsError,
    isSuccess: profileMetricSuccess,
    isLoading: profileMetricLoading,
  } = infra.useTelemetryMetricsProfileServiceListTelemetryMetricsProfilesQuery(
    {
      resourceId: "group-id", //TODO: check if its right ?
      projectName: SharedStorage.project?.name ?? "",
      siteId: siteId,
    },
    {
      skip: siteId === "new" || !SharedStorage.project?.name,
    },
  );

  const {
    data: profileLogs,
    error: profileLogError,
    isError: profileLogIsError,
    isSuccess: profileLogSuccess,
    isLoading: profileLogLoading,
  } = infra.useTelemetryLogsProfileServiceListTelemetryLogsProfilesQuery(
    {
      resourceId: "group-id", //TODO: check if its right ?
      projectName: SharedStorage.project?.name ?? "",
      siteId: siteId,
    },
    {
      skip: siteId === "new" || !SharedStorage.project?.name,
    },
  );

  const getMetricPairs = () => {
    const metricProfiles = profileMetrics?.telemetryMetricsProfiles ?? [];
    const metricPairs: SystemMetricPair[] = [];
    for (const profile of metricProfiles) {
      if (profile.profileId && profile.metricsGroup)
        metricPairs.push({
          profileId: profile.profileId,
          metricType: profile.metricsGroupId,
          interval: profile.metricsInterval.toString(),
        });
    }
    return metricPairs;
  };

  const getLogPairs = () => {
    const logProfiles = profileLogs?.telemetryLogsProfiles ?? [];
    const logPairs: SystemLogPair[] = [];
    for (const profile of logProfiles) {
      if (profile.profileId && profile.logsGroup)
        logPairs.push({
          profileId: profile.profileId,
          logSource: profile.logsGroupId,
          logLevel: profile.logLevel,
        });
    }
    return logPairs;
  };

  const regionsQuery = infra.useRegionServiceListRegionsQuery({
    projectName: SharedStorage.project?.name ?? "",
    pageSize: 100,
  });

  const location = useLocation();
  const navigate = useInfraNavigate();
  const dispatch = useAppDispatch();

  const [hasSiteMetadata, setHasSiteMetadata] = useState(false);
  const [createSite] = infra.useSiteServiceCreateSiteMutation();
  const [updateSite] = infra.useSiteServiceUpdateSiteMutation();
  const [createLogProfile] =
    infra.useTelemetryLogsProfileServiceCreateTelemetryLogsProfileMutation();
  const [editLogProfile] =
    infra.useTelemetryLogsProfileServiceUpdateTelemetryLogsProfileMutation();
  const { data: logsResponse } =
    infra.useTelemetryLogsGroupServiceListTelemetryLogsGroupsQuery({
      projectName: SharedStorage.project?.name ?? "",
    });
  const logsgroup = logsResponse?.telemetryLogsGroups ?? [];
  const [createMetricProfile] =
    infra.useTelemetryMetricsProfileServiceCreateTelemetryMetricsProfileMutation();
  const [editMetricProfile] =
    infra.useTelemetryMetricsProfileServiceUpdateTelemetryMetricsProfileMutation();
  const { data: metricsResponse } =
    infra.useTelemetryMetricsGroupServiceListTelemetryMetricsGroupsQuery({
      projectName: SharedStorage.project?.name ?? "",
    });
  const metricsgroup = metricsResponse?.telemetryMetricsGroups ?? [];
  const [hasTelemetry, setHasTelemetry] = useState<boolean>(false);
  const [updateMetadata] =
    mbApi.useMetadataServiceCreateOrUpdateMetadataMutation();
  const [currentMetadata, setCurrentMetadata] = useState<MetadataPair[]>([]);
  const [currentSystemMetric, setCurrentSystemMetric] =
    useState<SystemMetricPair[]>(getMetricPairs());
  const [currentSystemLog, setCurrentSystemLog] =
    useState<SystemLogPair[]>(getLogPairs());
  const [deleteMetricProfile] =
    infra.useTelemetryMetricsProfileServiceDeleteTelemetryMetricsProfileMutation();
  const [deleteLogProfile] =
    infra.useTelemetryLogsProfileServiceDeleteTelemetryLogsProfileMutation();
  const [inheritedMetadata, setInheritedMetadata] = useState<MetadataPair[]>(
    [],
  );

  useEffect(() => {
    if (
      profileMetricSuccess &&
      profileMetrics.telemetryMetricsProfiles.length > 0
    ) {
      setHasTelemetry(true);
      setCurrentSystemMetric(getMetricPairs());
    }
  }, [profileMetricSuccess, profileMetrics]);

  useEffect(() => {
    if (profileLogSuccess && profileLogs.telemetryLogsProfiles.length > 0) {
      setHasTelemetry(true);
      setCurrentSystemLog(getLogPairs());
    }
  }, [profileLogSuccess, profileLogs]);

  const memoizedMetadataForm = useMemo(() => {
    const nextMetadataPairs = site && site.metadata ? [...site.metadata] : [];
    setCurrentMetadata(nextMetadataPairs);
    return (
      <MetadataForm
        buttonText="+"
        pairs={nextMetadataPairs}
        onUpdate={(kv) => {
          setCurrentMetadata(kv);
        }}
      />
    );
  }, [site?.metadata]);

  const getMetricsGroup = (id: string): infra.TelemetryMetricsGroupResource => {
    const group = metricsgroup.find((group) => {
      return group.telemetryMetricsGroupId === id;
    });
    if (!group) throw Error();

    return {
      name: group.name,
      collectorKind: group.collectorKind,
      groups: group.groups,
    };
  };

  const getLogsGroup = (id: string): infra.TelemetryLogsGroupResource => {
    const group = logsgroup.find((group) => {
      return group.telemetryLogsGroupId === id;
    });
    if (!group) throw Error();

    return {
      name: group.name,
      collectorKind: group.collectorKind,
      groups: group.groups,
    };
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<infra.SiteServiceUpdateSiteApiArg>({
    mode: "all",
  });

  // reset form registered defaultValue when API response returns to check field sanity
  useEffect(() => {
    const defaultValue: infra.SiteServiceUpdateSiteApiArg = {
      regionResourceId: regionId ?? "", //TODO: not used in real endpoint
      projectName: SharedStorage.project?.name ?? "",
      resourceId: siteId,
      siteResource: {
        siteLat: 0,
        siteLng: 0,
        name: "",
        metadata: [],
        regionId: "",
      },
    };

    //Grab the inherited Metadata
    const location = site?.inheritedMetadata;
    if (location) {
      setInheritedMetadata(location);
    }

    // Create site with unknown regionId
    if (!regionId && siteId === "new" && !site) {
      reset(defaultValue);
      // Create site with known regionId
    } else if (regionId && siteId === "new") {
      reset({
        ...defaultValue,
        siteResource: {
          ...defaultValue.siteResource,
          regionId: regionId,
        },
      });
    } else if (site) {
      // Update site with known regionId and siteId
      reset({
        siteResource: {
          ...site,
          siteLat: site.siteLat ? site.siteLat / Math.pow(10, 7) : undefined,
          siteLng: site.siteLng ? site.siteLng / Math.pow(10, 7) : undefined,
        },
        resourceId: site.resourceId,
      });
      if (site.metadata && site.metadata.length > 0) {
        setHasSiteMetadata(true);
        setCurrentMetadata(site.metadata);
      }
    }
  }, [site]);

  // Update Region for the first time
  useEffect(() => {
    if (regionsQuery.data?.regions) {
      setValue("siteResource.regionId", regionId);
      trigger("siteResource.regionId");
    }
  }, [regionsQuery.data?.regions]);

  if (isLoading) {
    return <TableLoader count={2} />;
  }

  if (isError) {
    return <ApiError error={error} />;
  }

  const save: SubmitHandler<infra.SiteServiceUpdateSiteApiArg> = async (
    formData,
  ) => {
    const site: infra.SiteResourceWrite = {
      name: formData.siteResource.name,
      siteLat: formData.siteResource.siteLat
        ? Math.round(formData.siteResource.siteLat * Math.pow(10, 7))
        : undefined,
      siteLng: formData.siteResource.siteLng
        ? Math.round(formData.siteResource.siteLng * Math.pow(10, 7))
        : undefined,
      metadata: currentMetadata,
      regionId: formData.siteResource.regionId,
    };

    try {
      let siteOperation: Promise<infra.SiteServiceCreateSiteApiResponse>;

      if (siteId === "new") {
        siteOperation = createSite({
          resourceId: site.regionId!,
          projectName: SharedStorage.project?.name ?? "",
          siteResource: site,
        }).unwrap();
      } else {
        siteOperation = updateSite({
          regionResourceId: site.regionId!,
          projectName: SharedStorage.project?.name ?? "",
          resourceId: siteId,
          siteResource: site,
        }).unwrap();
      }

      const response: infra.SiteResourceRead = await siteOperation;
      const allPromises: Promise<any>[] = [];

      for (const metricPair of currentSystemMetric) {
        const metricProfile: infra.TelemetryMetricsProfileResource = {
          targetSite: response.siteID,
          metricsInterval: parseInt(metricPair.interval),
          metricsGroupId: metricPair.metricType,
          metricsGroup: getMetricsGroup(metricPair.metricType),
        };

        if (metricPair.profileId != "") {
          allPromises.push(
            editMetricProfile({
              metricgroupResourceId: "group-id", //TODO: not used in real endpoint,
              projectName: SharedStorage.project?.name ?? "",
              resourceId: metricPair.profileId,
              telemetryMetricsProfileResource: metricProfile,
            }),
          );
        } else {
          allPromises.push(
            createMetricProfile({
              resourceId: "group-id", //TODO: evaluate
              projectName: SharedStorage.project?.name ?? "",
              telemetryMetricsProfileResource: metricProfile,
            }),
          );
        }
      }

      for (const logPair of currentSystemLog) {
        const logProfile: infra.TelemetryLogsProfileResource = {
          targetSite: response.siteID,
          logLevel: logPair.logLevel as TelemetryLogLevel,
          logsGroupId: logPair.logSource,
          logsGroup: getLogsGroup(logPair.logSource),
        };

        if (logPair.profileId != "") {
          allPromises.push(
            editLogProfile({
              loggroupResourceId: "group-id", //TODO: not used in real endpoint
              projectName: SharedStorage.project?.name ?? "",
              resourceId: logPair.profileId,
              telemetryLogsProfileResource: logProfile,
            }),
          );
        } else {
          allPromises.push(
            createLogProfile({
              resourceId: "group-id", //TODO: evaluate
              projectName: SharedStorage.project?.name ?? "",
              telemetryLogsProfileResource: logProfile,
            }),
          );
        }
      }

      if (siteId !== "new") {
        const existingMetricPairs = getMetricPairs();
        const existingLogPairs = getLogPairs();

        for (const responsePair of existingMetricPairs) {
          if (
            !currentSystemMetric.some(
              (pair) => pair.profileId === responsePair.profileId,
            )
          ) {
            allPromises.push(
              deleteMetricProfile({
                metricgroupResourceId: "group-id", //TODO: evaluate
                projectName: SharedStorage.project?.name ?? "",
                resourceId: responsePair.profileId,
              }),
            );
          }
        }

        for (const responsePair of existingLogPairs) {
          if (
            !currentSystemLog.some(
              (pair) => pair.profileId === responsePair.profileId,
            )
          ) {
            deleteLogProfile({
              loggroupResourceId: "group-id", //TODO: evaluate
              projectName: SharedStorage.project?.name ?? "",
              resourceId: responsePair.profileId,
            });
          }
        }
      }

      allPromises.push(checkAndUpdateMetadata());
      await Promise.all(allPromises);

      setErrorInfo();
      if (siteId === "new") {
        dispatch(
          showToast({
            message: "Site has been successfully created",
            state: ToastState.Success,
          }),
        );
      } else {
        // dispatch to update the edited site details in redux store
        handleSiteViewAction(dispatch, response);
        dispatch(
          showToast({
            message: "Site is successfully updated",
            state: ToastState.Success,
          }),
        );
      }
      navigate(locationRoute);
    } catch (error) {
      setErrorInfo(error);
      dispatch(
        showToast({
          state: ToastState.Danger,
          message: parseError(error).data,
        }),
      );
    }
  };

  const checkAndUpdateMetadata = async () => {
    await updateMetadata({
      projectName: SharedStorage.project?.name ?? "",
      metadataList: {
        metadata: currentMetadata,
      },
    })
      .unwrap()
      .catch((error) => {
        logError(error, "Failed to POST Metadata.");
      });
  };

  const regionsDropdownElements: JSX.Element[] =
    regionsQuery.data && regionsQuery.data.regions
      ? regionsQuery.data.regions.map((r) => (
          <Item key={r.resourceId}>{r.name}</Item>
        ))
      : [];

  const columns: SparkTableColumn<MetadataPair>[] = [
    {
      Header: "Key",
      accessor: "key",
    },
    {
      Header: "Value",
      accessor: "value",
    },
  ];
  // @ts-ignore
  const formDetail = (
    <form onSubmit={handleSubmit(save)}>
      <Flex cols={[12, 12]} colsMd={[6, 6]} colsLg={[6, 6]}>
        <div className="site-form-item">
          <FieldLabel required>Name *</FieldLabel>
          <Controller
            name="siteResource.name"
            control={control}
            // defaultValue={siteId === "new" ? "" : siteInfo.template.name}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                className="name"
                data-cy="name"
                placeholder="Name"
                isRequired={true}
                isDisabled={!checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
                validationState={
                  errors.siteResource?.name !== undefined ? "invalid" : "valid"
                }
                errorMessage={
                  errors.siteResource?.name !== undefined
                    ? "Name is required"
                    : ""
                }
                size={InputSize.Large}
                {...field}
              />
            )}
          />
        </div>
        <div className="site-form-item">
          <Controller
            name="siteResource.regionId"
            control={control}
            rules={{ required: true }}
            render={(field) => (
              <Dropdown
                size="l"
                data-cy="regionDropdown"
                placeholder={site?.region?.name || region?.name || "-"}
                name="region-dropdown"
                isDisabled={
                  !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]) ||
                  (regionId !== undefined && siteId === "new")
                }
                isRequired={true}
                label="Region"
                onSelectionChange={(e) => {
                  setValue("siteResource.regionId", e.toString());
                  trigger("siteResource.regionId");
                }}
                {...field}
                validationState={
                  errors.siteResource?.region !== undefined
                    ? "invalid"
                    : "valid"
                }
                errorMessage={
                  errors.siteResource?.region !== undefined
                    ? "region Id is required"
                    : ""
                }
              >
                {regionsDropdownElements}
              </Dropdown>
            )}
          />
        </div>
      </Flex>
      <Flex cols={[12, 12]} colsMd={[6, 6]} colsLg={[6, 6]}>
        <div className="site-form-item">
          <FieldLabel>Latitude</FieldLabel>
          <Controller
            name="siteResource.siteLat"
            control={control}
            render={({ field }) => (
              // TextField doesn't seem to realize it is configured to be a number
              // @ts-ignore
              <TextField
                className="latitude"
                placeholder="Latitude"
                isDisabled={!checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
                type="number"
                size={InputSize.Large}
                data-cy="latitude"
                {...field}
              />
            )}
          />
        </div>
        <div className="site-form-item">
          <FieldLabel>Longitude</FieldLabel>
          <Controller
            name="siteResource.siteLng"
            control={control}
            render={({ field }) => (
              // @ts-ignore
              <TextField
                className="longitude"
                placeholder="Longitude"
                isDisabled={!checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
                type="number"
                size={InputSize.Large}
                data-cy="longitude"
                {...field}
              />
            )}
          />
        </div>
      </Flex>
      <Flex cols={[12]}>
        {inheritedMetadata && inheritedMetadata.length > 0 && (
          <>
            <Heading semanticLevel={2} size="m">
              Location Information
            </Heading>
            <Table
              data-cy="inheritedMetadataTable"
              pageSize={10}
              columns={columns}
              data={inheritedMetadata}
              pagination={inheritedMetadata.length > 10}
              size="l"
              variant="minimal"
            />
          </>
        )}
      </Flex>
      <Heading semanticLevel={4} size={HeaderSize.Medium}>
        Advanced Settings
      </Heading>
      <div id="site-metadata" className="site-metadata" data-cy="siteMetadata">
        <RadioGroup
          label="Do you want to make changes to the advanced settings?"
          orientation="horizontal"
          value={hasTelemetry ? "1" : "0"}
          size={RadioButtonSize.Large}
          isDisabled={!checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
          onChange={(value) => {
            const isSelected = value === "1";
            setHasSiteMetadata(isSelected);
            setHasTelemetry(isSelected);
          }}
        >
          <RadioButton value="1" data-cy="advSettings">
            yes
          </RadioButton>
          <RadioButton value="0">no</RadioButton>
        </RadioGroup>
      </div>
      {hasSiteMetadata && checkAuthAndRole([Role.INFRA_MANAGER_WRITE]) && (
        <>
          <Heading semanticLevel={2} size="m">
            Deployment Metadata
          </Heading>
          {memoizedMetadataForm}
        </>
      )}
      {hasTelemetry && checkAuthAndRole([Role.INFRA_MANAGER_WRITE]) && (
        <div className="telemetry-settings" data-cy="telemetry-settings">
          <Heading semanticLevel={2} size="m">
            Telemetry Settings
          </Heading>

          <MessageBanner
            messageBody="Telemetry Settings will be applied to all hosts in this site"
            variant="info"
            messageTitle=""
            size="s"
            showIcon
            outlined
          />
          <br />

          {profileMetricLoading && <ProgressLoader variant={"circular"} />}
          {profileMetricIsError && <ApiError error={profileMetricError} />}
          {(profileMetricSuccess || siteId === "new") && (
            <TelemetryMetricsForm
              onUpdate={setCurrentSystemMetric}
              pairs={currentSystemMetric}
            />
          )}
          {profileLogLoading && <ProgressLoader variant={"circular"} />}
          {profileLogIsError && <ApiError error={profileLogError} />}
          {(profileLogSuccess || siteId === "new") && (
            <TelemetryLogsForm
              onUpdate={setCurrentSystemLog}
              pairs={currentSystemLog}
            />
          )}
        </div>
      )}
      <ButtonGroup
        className="site-form-btn-container"
        align={ButtonGroupAlignment.End}
      >
        <Button
          data-cy="siteFormCancelBtn"
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Large}
          onPress={() => {
            navigate(locationRoute);
            if (regionId && location.search.includes("source=region")) {
              dispatch(setTreeBranchNodeCollapse(regionId));
            }
          }}
        >
          Cancel
        </Button>
        <Button
          data-cy="createSave"
          type="submit"
          isDisabled={
            isFetching ||
            !isValid ||
            !checkAuthAndRole([Role.INFRA_MANAGER_WRITE])
          }
          size={ButtonSize.Large}
        >
          {siteId === "new" ? "Add" : "Save"}
        </Button>
      </ButtonGroup>
    </form>
  );

  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="site-form">
      <Heading semanticLevel={1} size="l">
        {siteId === "new"
          ? "Add New Site"
          : site && site.name
            ? site.name
            : siteId}
      </Heading>
      {formDetail}
    </div>
  );
};

export default SiteForm;
