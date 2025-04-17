/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ApiError,
  BreadcrumbPiece,
  ConfirmationDialog,
  Flex,
  Popup,
  PopupOption,
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
} from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Combobox,
  FieldLabel,
  Heading,
  Icon,
  Item,
  MessageBanner,
  ProgressLoader,
  RadioButton,
  RadioGroup,
  TextField,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
  ComboboxSize,
  ComboboxVariant,
  FieldLabelSize,
  HeaderSize,
  InputSize,
  RadioButtonSize,
  ToastState,
} from "@spark-design/tokens";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./RegionForm.scss";

import { eim, mbApi } from "@orch-ui/apis";
import TelemetryLogsForm, {
  SystemLogPair,
} from "../../../components/organism/TelemetryLogsForm/TelemetryLogsForm";
import TelemetryMetricsForm, {
  SystemMetricPair,
} from "../../../components/organism/TelemetryMetricsForm/TelemetryMetricsForm";
import {
  getRegionsByIdBreadcrumb,
  homeBreadcrumb,
  locationsBreadcrumb,
  regionsBreadcrumb,
  regionsCreateBreadcrumb,
  regionsMenuItem,
} from "../../../routes/const";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectBranches,
  setIsEmpty,
  setTreeBranchNodeCollapse,
} from "../../../store/locations";
import { setErrorInfo, showToast } from "../../../store/notifications";

const baseRegionTypes = ["Country", "State", "County", "Region", "City"];

const RegionForm: React.FC = () => {
  const cssSelector = "region-form";
  const dataCy = "regionForm";
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const [deleteRegion] =
    eim.useDeleteV1ProjectsByProjectNameRegionsAndRegionIdMutation();
  const [deleteMetricProfile] =
    eim.useDeleteV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdMutation();
  const [deleteLogProfile] =
    eim.useDeleteV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdMutation();
  const deleteRegionFn = async (regionId: string) => {
    try {
      await deleteRegion({
        projectName: SharedStorage.project?.name ?? "",
        regionId,
      })
        .unwrap()
        .then(() => {
          navigate(regionId ? "../../locations" : "../locations", {
            relative: "path",
          });
        })
        .catch((error) => {
          dispatch(
            showToast({
              state: ToastState.Danger,
              message: parseError(error).data,
            }),
          );
        });
      setErrorInfo();
    } catch (e) {
      setErrorInfo(e);
    }
    setIsDeleteOpen(false);
  };

  const navigate = useNavigate();
  const { regionId } = useParams<{ regionId: string }>();
  const { parentRegionId } = useParams<{ parentRegionId: string }>();
  const { data: { regions } = {} } =
    eim.useGetV1ProjectsByProjectNameRegionsQuery({
      projectName: SharedStorage.project?.name ?? "",
      pageSize: 100,
    });
  const {
    data: regionInfo,
    isLoading,
    isError,
    error,
    isFetching,
  } = eim.useGetV1ProjectsByProjectNameRegionsAndRegionIdQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      regionId: regionId as string,
    },
    {
      skip: regionId === "new",
    },
  );

  const {
    data: profileMetrics,
    error: profileMetricError,
    isError: profileMetricIsError,
    isSuccess: profileMetricSuccess,
    isLoading: profileMetricLoading,
  } = eim.useGetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesQuery(
    {
      telemetryMetricsGroupId: "group-id", //TODO: evaluate
      projectName: SharedStorage.project?.name ?? "",
      regionId: regionId,
    },
    {
      skip: regionId === "new",
    },
  );

  const {
    data: profileLogs,
    error: profileLogError,
    isError: profileLogIsError,
    isSuccess: profileLogSuccess,
    isLoading: profileLogLoading,
  } = eim.useGetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesQuery(
    {
      telemetryLogsGroupId: "group-id", //TODO: evaluate
      projectName: SharedStorage.project?.name ?? "",
      regionId: regionId,
    },
    {
      skip: regionId === "new",
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

  const returnRegionName = (regionId?: string) => {
    return (
      (regionId &&
        regions &&
        regions.find((r) => r.resourceId === regionId)?.name) ??
      "None (Top level region)"
    );
  };

  const getParents = (
    currentRegion: eim.RegionRead | undefined,
    regions: eim.RegionRead[] | undefined,
    parents: BreadcrumbPiece[] = [],
  ): BreadcrumbPiece[] => {
    if (!currentRegion || !regions) return parents;
    const parent = regions.find(
      (r) => r.resourceId === currentRegion.parentRegion?.resourceId,
    );
    if (parent) {
      parents.unshift(
        getRegionsByIdBreadcrumb(parent.resourceId ?? "", parent.name),
      );
      return getParents(parent, regions, parents);
    } else {
      return parents;
    }
  };
  const dispatch = useAppDispatch();
  const branches = useAppSelector(selectBranches);
  const breadcrumb = useMemo(() => {
    if (regionId === "new" && parentRegionId) {
      return [
        locationsBreadcrumb,
        regionsBreadcrumb,
        getRegionsByIdBreadcrumb(
          parentRegionId,
          returnRegionName(parentRegionId),
        ),
        regionsCreateBreadcrumb,
      ];
    }
    if (regionId === "new") {
      return [locationsBreadcrumb, regionsCreateBreadcrumb];
    }
    const regionsTree = getParents(regionInfo, regions, [
      getRegionsByIdBreadcrumb(regionId ?? "", returnRegionName(regionId)),
    ]);
    return [homeBreadcrumb, regionsBreadcrumb].concat(regionsTree || []);
  }, [regionInfo, regions]);

  useEffect(() => {
    //dispatch(setBreadcrumb(breadcrumb));
    dispatch(setBreadcrumb([]));
    dispatch(setActiveNavItem(regionsMenuItem));
  }, [breadcrumb]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<eim.RegionRead>({
    mode: "all",
  });

  const [regionType, setRegionType] = useState<string | undefined>(undefined);
  const [allRegionTypes, setAllRegionTypes] =
    useState<string[]>(baseRegionTypes);

  const [hasTelemetry, setHasTelemetry] = useState<boolean>(false);
  const [createRegion] = eim.usePostV1ProjectsByProjectNameRegionsMutation();
  const [createMetricProfile] =
    eim.usePostV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesMutation();
  const [editMetricProfile] =
    eim.usePutV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesTelemetryMetricsProfileIdMutation();
  const { data: metricsResponse } =
    eim.useGetV1ProjectsByProjectNameTelemetryMetricgroupsQuery({
      projectName: SharedStorage.project?.name ?? "",
    });
  const metricsgroup = metricsResponse?.TelemetryMetricsGroups ?? [];
  const [currentSystemMetric, setCurrentSystemMetric] =
    useState<SystemMetricPair[]>(getMetricPairs());
  const [createLogProfile] =
    eim.usePostV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesMutation();
  const [editLogProfile] =
    eim.usePutV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesTelemetryLogsProfileIdMutation();
  const { data: logsResponse } =
    eim.useGetV1ProjectsByProjectNameTelemetryLoggroupsQuery({
      projectName: SharedStorage.project?.name ?? "",
    });
  const logsgroup = logsResponse?.TelemetryLogsGroups ?? [];
  const [currentSystemLog, setCurrentSystemLog] =
    useState<SystemLogPair[]>(getLogPairs());
  const [updateRegion] =
    eim.usePutV1ProjectsByProjectNameRegionsAndRegionIdMutation();
  const [updateMetadata] =
    mbApi.useMetadataServiceCreateOrUpdateMetadataMutation();
  const [parentRegion, setParentRegion] = useState<string | undefined>(
    parentRegionId,
  );

  const validateRegionType = () =>
    (regionType ?? "").length === 0 ||
    ((regionType ?? "").length <= 20 &&
      /^$|^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$/.test(regionType ?? ""));

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

  useEffect(() => {
    if (regionInfo) {
      reset(
        regionInfo.parentRegion
          ? {
              name: regionInfo.name,
              parentRegion: regionInfo.parentRegion,
            }
          : {
              name: regionInfo.name,
            },
      );
      // read the metadata and set the type
      if (regionInfo.metadata && regionInfo.metadata[0]) {
        const rt: string = regionInfo.metadata[0].key;
        setRegionType(rt);
        // if this region's type is not in the base list, add it to the dropdown for convenience
        if (baseRegionTypes.indexOf(rt) === -1) {
          setAllRegionTypes((types) => [rt, ...types]);
        }
      }
      // if it has a parent region, but it's not specified in the URL set it
      if (!parentRegionId && regionInfo.parentRegion) {
        setParentRegion(regionInfo.parentRegion.resourceId);
      }
    }
  }, [regionInfo, regionId]);

  if (isLoading) {
    return <TableLoader />;
  }
  if (isError) {
    return <ApiError error={error} />;
  }

  const redirectToLocationsPage = async () => {
    if (parentRegionId) {
      navigate("../../../../locations", { relative: "path" });
      dispatch(setTreeBranchNodeCollapse(parentRegionId));
    }
    // jump to region details page from `/regions/{region-id}/new` (or /:regionid)
    else {
      navigate("../../locations", { relative: "path" });
    }
  };

  const getMetricsGroup = (id: string): eim.TelemetryMetricsGroup => {
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

  const getLogsGroup = (id: string): eim.TelemetryLogsGroup => {
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

  const save: SubmitHandler<eim.RegionWrite> = async (data) => {
    // handle metadata generation
    if (!data.metadata) {
      data.metadata = [];
    }

    // NOTE that if the regionType is not set the form can't be saved
    if (regionType && validateRegionType()) {
      data.metadata[0] = {
        key: regionType.toLowerCase(),
        value: data.name!.toLowerCase(),
      };
    }

    // handle parent region
    if (parentRegion && parentRegion !== "None") {
      data.parentId =
        regions?.find((r) => r.resourceId === parentRegion)?.resourceId ||
        undefined;

      data.parentRegion = {
        name: data.parentRegion?.name,
        metadata: data.parentRegion?.metadata,
      };
    }
    if (parentRegion && parentRegion === "None" && data.parentRegion) {
      delete data.parentId;
      delete data.parentRegion;
    }
    if (parentRegionId) {
      data.parentId =
        regions?.find((r) => r.resourceId === parentRegion)?.resourceId ||
        undefined;
    }

    try {
      let regionOperation: Promise<eim.PostV1ProjectsByProjectNameRegionsApiResponse>;

      if (regionId === "new") {
        regionOperation = createRegion({
          projectName: SharedStorage.project?.name ?? "",
          region: data,
        }).unwrap();
      } else {
        regionOperation = updateRegion({
          projectName: SharedStorage.project?.name ?? "",
          regionId: regionId as string,
          region: data,
        }).unwrap();
      }

      const response = await regionOperation;

      const allPromises: Promise<any>[] = [];

      // handle metric profiles
      for (const metricPair of currentSystemMetric) {
        const metricProfile: eim.TelemetryMetricsProfile = {
          targetRegion: response.regionID,
          metricsInterval: parseInt(metricPair.interval),
          metricsGroupId: metricPair.metricType,
          metricsGroup: getMetricsGroup(metricPair.metricType),
        };

        if (metricPair.profileId != "") {
          allPromises.push(
            editMetricProfile({
              telemetryMetricsGroupId: "group-id", //TODO: evaluate
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

      // handle log profiles
      for (const logPair of currentSystemLog) {
        const logProfile: eim.TelemetryLogsProfile = {
          targetRegion: response.regionID,
          logLevel: logPair.logLevel as eim.TelemetrySeverityLevel,
          logsGroupId: logPair.logSource,
          logsGroup: getLogsGroup(logPair.logSource),
        };
        if (logPair.profileId != "") {
          allPromises.push(
            editLogProfile({
              telemetryLogsGroupId: "group-id", //TODO: evaluate
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

      if (regionId !== "new") {
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
            allPromises.push(
              deleteLogProfile({
                telemetryLogsGroupId: "group-id", //TODO: not used in real endpoint
                projectName: SharedStorage.project?.name ?? "",
                telemetryLogsProfileId: responsePair.profileId,
              }),
            );
          }
        }
      }

      allPromises.push(checkAndUpdateMetadata(data));
      if (regionId === "new" && branches.length === 0) {
        await dispatch(setIsEmpty(false));
      }

      await Promise.all(allPromises);

      redirectToLocationsPage();
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

  const checkAndUpdateMetadata = async (data: eim.RegionWrite) => {
    if (data.metadata && data.metadata.length >= 0)
      await updateMetadata({
        projectName: SharedStorage.project?.name ?? "",
        metadataList: {
          metadata: data.metadata,
        },
      })
        .unwrap()
        .catch((error) => {
          logError(error, "Failed to POST Metadata.");
        });
  };

  const getErrorMessage = (errorType: string) => {
    switch (errorType) {
      case "required":
        return "Name is required";
      case "maxLength":
        return "Name can't be more than 20 characters";
      default:
        return "Name may only contain alphanumeric characters, symbols (. -) only and cannot end with a symbol. (Minimum: 2, Maximum: 20)";
    }
  };

  const popupOptions: PopupOption[] = [
    {
      displayText: "Delete",
      onSelect: () => {
        setIsDeleteOpen(true);
      },
    },
  ];

  const formDetail = (
    <>
      <form onSubmit={handleSubmit(save)}>
        <Flex cols={[6, 6]}>
          <div className="region-form-item">
            <FieldLabel size={FieldLabelSize.Large} required>
              Name *
            </FieldLabel>
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
                pattern: new RegExp(
                  "^$|^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$",
                ),
              }}
              render={({ field }) => (
                <TextField
                  data-cy="name"
                  className="name-field"
                  placeholder="Name"
                  isRequired={true}
                  pattern="^$|^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$"
                  maxLength={20}
                  isDisabled={!checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
                  validationState={
                    errors.name && Object.keys(errors.name).length > 0
                      ? "invalid"
                      : "valid"
                  }
                  errorMessage={
                    errors.name ? getErrorMessage(errors.name?.type) : undefined
                  }
                  size={InputSize.Large}
                  // NOTE for some reason field.ref causes an error
                  // Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
                  // TODO investigate
                  {...field}
                  // onChange={field.onChange}
                  // onBlur={field.onBlur}
                  // value={field.value}
                  // name={field.name}
                />
              )}
            />
          </div>

          {regionId === "new" ? null : (
            <div className="region-form-item">
              <FieldLabel size={FieldLabelSize.Large} required>
                Region Id
              </FieldLabel>
              <TextField
                placeholder={regionId}
                isDisabled
                size={InputSize.Large}
              />
            </div>
          )}
        </Flex>
        <div className="region-form-item">
          <Combobox
            isRequired={true}
            size="l"
            label="Region Type"
            name="regionType"
            data-cy="regionType"
            onInputChange={setRegionType}
            allowsCustomValue={true}
            inputValue={regionType}
            isDisabled={!checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
            isInvalid={!validateRegionType()}
            validationState={validateRegionType() ? "valid" : "invalid"}
            errorMessage="Region Type only contain alphanumeric characters, symbols (. -) only and cannot end with a symbol"
          >
            {allRegionTypes.map((t) => (
              <Item key={t.toLowerCase()}>{t}</Item>
            ))}
          </Combobox>
        </div>
        <div className="region-form-item">
          <Combobox
            label="Parent Region"
            data-cy="parentRegion"
            placeholder={returnRegionName(parentRegion)}
            size={ComboboxSize.Large}
            variant={ComboboxVariant.Primary}
            isDisabled={true}
            autoComplete="parent-region"
            onSelectionChange={(value: string) => setParentRegion(value)}
          >
            <Item textValue="None" key="None">
              None
            </Item>
            {regions
              ? regions
                  .filter((r) => r.resourceId !== regionId)
                  .map((region) => (
                    <Item textValue={region.name} key={region.resourceId}>
                      {region.name}
                    </Item>
                  ))
              : []}
          </Combobox>
        </div>

        <Heading semanticLevel={4} size={HeaderSize.Medium}>
          Advanced Settings
        </Heading>
        <div
          id="site-metadata"
          className="site-metadata"
          data-cy="siteMetadata"
        >
          <RadioGroup
            label="Do you want to make changes to the advanced settings?"
            orientation="horizontal"
            value={hasTelemetry ? "1" : "0"}
            size={RadioButtonSize.Large}
            isDisabled={!checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
            onChange={(value) => {
              const isSelected = value === "1";
              setHasTelemetry(isSelected);
            }}
          >
            <RadioButton value="1" data-cy="advSettings">
              yes
            </RadioButton>
            <RadioButton value="0">no</RadioButton>
          </RadioGroup>
        </div>
        {hasTelemetry && (
          <div className="telemetry-settings" data-cy="telemetry-settings">
            <Heading semanticLevel={1} size="s">
              Telemetry Settings
            </Heading>

            <MessageBanner
              messageBody="Telemetry settings will be applied to all hosts in this region"
              variant="info"
              messageTitle=""
              size="s"
              showIcon
              outlined
            />
            <br />
            {profileMetricLoading && <ProgressLoader variant={"circular"} />}
            {profileMetricIsError && <ApiError error={profileMetricError} />}
            {(profileMetricSuccess || regionId === "new") && (
              <TelemetryMetricsForm
                onUpdate={setCurrentSystemMetric}
                pairs={currentSystemMetric}
              />
            )}

            {profileLogLoading && <ProgressLoader variant={"circular"} />}
            {profileLogIsError && <ApiError error={profileLogError} />}
            {(profileLogSuccess || regionId === "new") && (
              <TelemetryLogsForm
                onUpdate={setCurrentSystemLog}
                pairs={currentSystemLog}
              />
            )}
          </div>
        )}
        <ButtonGroup
          align={ButtonGroupAlignment.End}
          className="region-form-btn-container"
        >
          <Button
            data-cy="regionFormCancelBtn"
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Large}
            onPress={redirectToLocationsPage}
          >
            Cancel
          </Button>
          <Button
            data-cy="create"
            type="submit"
            className="region-form-btn"
            isDisabled={
              !isValid ||
              isFetching ||
              !regionType ||
              !validateRegionType() ||
              !checkAuthAndRole([Role.INFRA_MANAGER_WRITE])
            }
            size={ButtonSize.Large}
          >
            {regionId === "new" ? "Add" : "Save"}
          </Button>
        </ButtonGroup>
      </form>
    </>
  );

  return (
    <div data-cy="regionForm" className="region-form">
      <header className={`${cssSelector}-header`}>
        <Heading semanticLevel={1} size="l">
          {regionId === "new"
            ? "Add a Region"
            : regionInfo && regionInfo.name
              ? regionInfo.name
              : regionId}
        </Heading>
        {regionInfo && regionId !== "new" && (
          <div className={`${cssSelector}-action-button`}>
            <Popup
              dataCy={`${dataCy}Popup`}
              options={popupOptions}
              jsx={
                <button
                  className="spark-button spark-button-action spark-button-size-l spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
                  type="button"
                >
                  <span className="spark-button-content">
                    Region Actions
                    <Icon className="pa-1 mb-1" icon="chevron-down" />
                  </span>
                </button>
              }
            />
            {isDeleteOpen && (
              <ConfirmationDialog
                showTriggerButton={false}
                content={`Are you sure you want to delete Region "${
                  regionInfo.name ?? regionInfo.resourceId
                }"?`}
                isOpen={isDeleteOpen}
                confirmCb={() =>
                  regionInfo.resourceId && deleteRegionFn(regionInfo.resourceId)
                }
                confirmBtnText="Delete"
                confirmBtnVariant={ButtonVariant.Alert}
                cancelCb={() => setIsDeleteOpen(false)}
              />
            )}
          </div>
        )}
      </header>
      {formDetail}
    </div>
  );
};

export default RegionForm;
