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
  setActiveNavItem,
  setBreadcrumb,
  TableLoader,
} from "@orch-ui/components";
import {
  checkAuthAndRole,
  logError,
  parseError,
  Role,
  SharedStorage,
  SparkTableColumn,
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TelemetryLogsForm, {
  SystemLogPair,
} from "../../../components/organism/TelemetryLogsForm/TelemetryLogsForm";
import TelemetryMetricsForm, {
  SystemMetricPair,
} from "../../../components/organism/TelemetryMetricsForm/TelemetryMetricsForm";
import {
  homeBreadcrumb,
  locationsBreadcrumb,
  sitesBreadcrumb,
  sitesCreateBreadcrumb,
  sitesMenuItem,
} from "../../../routes/const";
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
  } = infra.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdQuery(
    {
      regionId: regionId ?? "", //TODO: not used in EIM endpoint
      projectName: SharedStorage.project?.name ?? "",
      siteId: siteId,
    },
    {
      skip: siteId === "new" || !regionId || !SharedStorage.project?.name,
    },
  );

  const { data: region } =
    infra.useGetV1ProjectsByProjectNameRegionsAndRegionIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        regionId: regionId ?? "",
      },
      { skip: !regionId || !SharedStorage.project?.name },
    );

  const {
    data: profileMetrics,
    error: profileMetricError,
    isError: profileMetricIsError,
    isSuccess: profileMetricSuccess,
    isLoading: profileMetricLoading,
  } = infra.useGetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesQuery(
    {
      telemetryMetricsGroupId: "group-id", //TODO: not used in real endpoint
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
  } = infra.useGetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesQuery(
    {
      telemetryLogsGroupId: "group-id", //TODO: not used in real endpoint
      projectName: SharedStorage.project?.name ?? "",
      siteId: siteId,
    },
    {
      skip: siteId === "new" || !SharedStorage.project?.name,
    },
  );

  const getMetricPairs = () => {
    const metricProfiles = profileMetrics?.TelemetryMetricsProfiles ?? [];
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
    const logProfiles = profileLogs?.TelemetryLogsProfiles ?? [];
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

  const regionsQuery = infra.useGetV1ProjectsByProjectNameRegionsQuery({
    projectName: SharedStorage.project?.name ?? "",
    pageSize: 100,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const breadcrumb = useMemo(() => {
    if (siteId === "new") {
      return [locationsBreadcrumb, sitesCreateBreadcrumb];
    }
    return [
      homeBreadcrumb,
      sitesBreadcrumb,
      {
        // text may show `undefined` if template.name is not available
        // especially when an error (404), consider siteId specified
        text: `${site?.name || siteId}`,
        link: `regions/${regionId}/sites/${siteId}`,
      },
    ];
  }, [site]);
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(sitesMenuItem));
  }, [breadcrumb]);

  const [hasSiteMetadata, setHasSiteMetadata] = useState(false);
  const [createSite] =
    infra.usePostV1ProjectsByProjectNameRegionsAndRegionIdSitesMutation();
  const [updateSite] =
    infra.usePutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdMutation();
  const [createLogProfile] =
    infra.usePostV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesMutation();
  const [editLogProfile] =
    infra.usePutV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdMutation();
  const { data: logsResponse } =
    infra.useGetV1ProjectsByProjectNameTelemetryLoggroupsQuery({
      projectName: SharedStorage.project?.name ?? "",
    });
  const logsgroup = logsResponse?.TelemetryLogsGroups ?? [];
  const [createMetricProfile] =
    infra.usePostV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesMutation();
  const [editMetricProfile] =
    infra.usePutV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdMutation();
  const { data: metricsResponse } =
    infra.useGetV1ProjectsByProjectNameTelemetryMetricgroupsQuery({
      projectName: SharedStorage.project?.name ?? "",
    });
  const metricsgroup = metricsResponse?.TelemetryMetricsGroups ?? [];
  const [hasTelemetry, setHasTelemetry] = useState<boolean>(false);
  const [updateMetadata] =
    mbApi.useMetadataServiceCreateOrUpdateMetadataMutation();
  const [currentMetadata, setCurrentMetadata] = useState<MetadataPair[]>([]);
  const [currentSystemMetric, setCurrentSystemMetric] =
    useState<SystemMetricPair[]>(getMetricPairs());
  const [currentSystemLog, setCurrentSystemLog] =
    useState<SystemLogPair[]>(getLogPairs());
  const [deleteMetricProfile] =
    infra.useDeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdMutation();
  const [deleteLogProfile] =
    infra.useDeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdMutation();
  const [inheritedMetadata, setInheritedMetadata] = useState<MetadataPair[]>(
    [],
  );

  useEffect(() => {
    if (
      profileMetricSuccess &&
      profileMetrics.TelemetryMetricsProfiles.length > 0
    ) {
      setHasTelemetry(true);
      setCurrentSystemMetric(getMetricPairs());
    }
  }, [profileMetricSuccess, profileMetrics]);

  useEffect(() => {
    if (profileLogSuccess && profileLogs.TelemetryLogsProfiles.length > 0) {
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

  const getMetricsGroup = (id: string): infra.TelemetryMetricsGroup => {
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

  const getLogsGroup = (id: string): infra.TelemetryLogsGroup => {
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
  } = useForm<infra.PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg>(
    {
      mode: "all",
    },
  );

  // reset form registered defaultValue when API response returns to check field sanity
  useEffect(() => {
    const defaultValue: infra.PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg =
      {
        regionId: regionId ?? "", //TODO: not used in real endpoint
        projectName: SharedStorage.project?.name ?? "",
        siteId: siteId,
        site: {
          siteLat: 0,
          siteLng: 0,
          name: "",
          metadata: [],
          regionId: "",
        },
      };
    //Grab the inherited Metadata
    const location = site?.inheritedMetadata?.location;
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
        site: {
          ...defaultValue.site,
          regionId: regionId,
        },
      });
    } else if (site) {
      // Update site with known regionId and siteId
      reset({
        site: {
          ...site,
          siteLat: site.siteLat ? site.siteLat / Math.pow(10, 7) : undefined,
          siteLng: site.siteLng ? site.siteLng / Math.pow(10, 7) : undefined,
        },
        siteId: site.resourceId,
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
      setValue("site.regionId", regionId);
      trigger("site.regionId");
    }
  }, [regionsQuery.data?.regions]);

  if (isLoading) {
    return <TableLoader count={2} />;
  }

  if (isError) {
    return <ApiError error={error} />;
  }

  const save: SubmitHandler<
    infra.PutV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiArg
  > = async (formData) => {
    const site: infra.SiteWrite = {
      name: formData.site.name,
      siteLat: formData.site.siteLat
        ? Math.round(formData.site.siteLat * Math.pow(10, 7))
        : undefined,
      siteLng: formData.site.siteLng
        ? Math.round(formData.site.siteLng * Math.pow(10, 7))
        : undefined,
      metadata: currentMetadata,
      regionId: formData.site.regionId,
    };

    try {
      let siteOperation: Promise<infra.PostV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse>;

      if (siteId === "new") {
        siteOperation = createSite({
          regionId: site.regionId!,
          projectName: SharedStorage.project?.name ?? "",
          site,
        }).unwrap();
      } else {
        siteOperation = updateSite({
          regionId: site.regionId!,
          projectName: SharedStorage.project?.name ?? "",
          siteId: siteId,
          site,
        }).unwrap();
      }

      const response: infra.SiteRead = await siteOperation;
      const allPromises: Promise<any>[] = [];

      for (const metricPair of currentSystemMetric) {
        const metricProfile: infra.TelemetryMetricsProfile = {
          targetSite: response.siteID,
          metricsInterval: parseInt(metricPair.interval),
          metricsGroupId: metricPair.metricType,
          metricsGroup: getMetricsGroup(metricPair.metricType),
        };

        if (metricPair.profileId != "") {
          allPromises.push(
            editMetricProfile({
              telemetryMetricsGroupId: "group-id", //TODO: not used in real endpoint,
              projectName: SharedStorage.project?.name ?? "",
              telemetryMetricsProfileId: metricPair.profileId,
              telemetryMetricsProfile: metricProfile,
            }),
          );
        } else {
          allPromises.push(
            createMetricProfile({
              telemetryMetricsGroupId: "group-id", //TODO: evaluate
              projectName: SharedStorage.project?.name ?? "",
              telemetryMetricsProfile: metricProfile,
            }),
          );
        }
      }

      for (const logPair of currentSystemLog) {
        const logProfile: infra.TelemetryLogsProfile = {
          targetSite: response.siteID,
          logLevel: logPair.logLevel as infra.TelemetrySeverityLevel,
          logsGroupId: logPair.logSource,
          logsGroup: getLogsGroup(logPair.logSource),
        };

        if (logPair.profileId != "") {
          allPromises.push(
            editLogProfile({
              telemetryLogsGroupId: "group-id", //TODO: not used in real endpoint
              projectName: SharedStorage.project?.name ?? "",
              telemetryLogsProfileId: logPair.profileId,
              telemetryLogsProfile: logProfile,
            }),
          );
        } else {
          allPromises.push(
            createLogProfile({
              telemetryLogsGroupId: "group-id", //TODO: evaluate
              projectName: SharedStorage.project?.name ?? "",
              telemetryLogsProfile: logProfile,
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
                telemetryMetricsGroupId: "group-id", //TODO: evaluate
                projectName: SharedStorage.project?.name ?? "",
                telemetryMetricsProfileId: responsePair.profileId,
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
              telemetryLogsGroupId: "group-id", //TODO: evaluate
              projectName: SharedStorage.project?.name ?? "",
              telemetryLogsProfileId: responsePair.profileId,
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

        if (regionId) {
          navigate("../../../../locations", { relative: "path" });
        } else {
          navigate("../../locations", { relative: "path" });
        }
      } else {
        // dispatch to update the edited site details in redux store
        handleSiteViewAction(dispatch, response);
        dispatch(
          showToast({
            message: "Site is successfully updated",
            state: ToastState.Success,
          }),
        );

        navigate("../../../../locations", { relative: "path" });
      }
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
            name="site.name"
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
                  errors.site?.name !== undefined ? "invalid" : "valid"
                }
                errorMessage={
                  errors.site?.name !== undefined ? "Name is required" : ""
                }
                size={InputSize.Large}
                {...field}
              />
            )}
          />
        </div>
        <div className="site-form-item">
          <Controller
            name="site.regionId"
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
                  setValue("site.regionId", e.toString());
                  trigger("site.regionId");
                }}
                {...field}
                validationState={
                  errors.site?.region !== undefined ? "invalid" : "valid"
                }
                errorMessage={
                  errors.site?.region !== undefined
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
            name="site.siteLat"
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
            name="site.siteLng"
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
            if (regionId && location.search.includes("source=region")) {
              navigate("../../../../locations", { relative: "path" });
              dispatch(setTreeBranchNodeCollapse(regionId));
            } else {
              let redirectPath = "../../../../locations";
              if (location.pathname.includes("sites/new")) {
                redirectPath = "../../locations";
              }
              navigate(redirectPath, { relative: "path" });
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
