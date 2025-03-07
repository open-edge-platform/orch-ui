/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog, useCatalogServiceListChartsQuery } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Combobox, Item, Text, TextField } from "@spark-design/react";
import { ComboboxSize, ComboboxVariant, InputSize } from "@spark-design/tokens";
import { Key, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectApplication,
  setChartName,
  setChartVersion,
  setHelmRegistryName,
  setImageRegistryName,
} from "../../../../store/reducers/application";
import {
  chartVersionPattern,
  namePattern,
} from "../../../../utils/regexPatterns";
import { ApplicationInputs } from "../../../pages/ApplicationCreateEdit/ApplicationCreateEdit";
import "./ApplicationSource.scss";

interface ApplicationSourceProps {
  control: Control<ApplicationInputs, string>;
  validateVersionFn: (value: boolean) => void;
}

type RegistryType = "IMAGE" | "HELM";

const ApplicationSource = ({
  control,
  validateVersionFn,
}: ApplicationSourceProps) => {
  const { chartName, chartVersion, helmRegistryName, imageRegistryName } =
    useAppSelector(selectApplication);
  const dispatch = useAppDispatch();
  const { data: registriesResponse, isSuccess: registriesLoaded } =
    catalog.useCatalogServiceListRegistriesQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
      },
      {
        skip: !SharedStorage.project?.name,
      },
    );
  const { data: chartNames, isSuccess: chartNamesLoaded } =
    useCatalogServiceListChartsQuery(
      {
        // FIXME once component-library 1.5.16 is out, update to `project:`
        projectName: SharedStorage.project?.name ?? "",
        registry: helmRegistryName ?? "",
      },
      {
        skip:
          !registriesLoaded ||
          !helmRegistryName ||
          !SharedStorage.project?.name,
      },
    );
  const { data: chartVersions, isSuccess: chartVersionsLoaded } =
    useCatalogServiceListChartsQuery(
      {
        // FIXME once component-library 1.5.16 is out, update to `project:`
        projectName: SharedStorage.project?.name ?? "",
        registry: helmRegistryName ?? "",
        chart: chartName ?? "",
      },
      {
        skip:
          !registriesLoaded ||
          !helmRegistryName ||
          !chartName ||
          !SharedStorage.project?.name,
      },
    );

  /** This function will add `None` Select value to starting of registry list */
  const addNoneSelectToRegistryList = (
    /** registry from api data */
    registryList: catalog.Registry[],
    /** Registry type: HELM or IMAGE */
    filterRegistry: RegistryType,
  ) => {
    const registryItemElements = registryList
      .filter((registry) => registry.type.toUpperCase() === filterRegistry)
      .map((registry) => (
        <Item textValue={registry.name} key={registry.name}>
          {registry.displayName
            ? `${registry.displayName}(${registry.name})`
            : `${registry.name}`}
        </Item>
      ));
    registryItemElements.unshift(
      <Item textValue="None" key="None">
        None
      </Item>,
    );
    return registryItemElements;
  };

  const [selectedHelmRegistryLocation, setSelectedHelmRegistryLocation] =
    useState<string | undefined>(undefined);
  const [selectedImageRegistryLocation, setSelectedImageRegistryLocation] =
    useState<string | undefined>(undefined);

  useEffect(() => {
    setSelectedHelmRegistryLocation(
      registriesResponse?.registries.find(
        (registry) => registry.name === helmRegistryName,
      )?.rootUrl,
    );
    setSelectedImageRegistryLocation(
      registriesResponse?.registries.find(
        (registry) => registry.name === imageRegistryName,
      )?.rootUrl,
    );
  }, [registriesResponse, helmRegistryName, imageRegistryName]);
  useEffect(() => {
    validateVersionFn(
      chartVersion.length === 0 || chartVersionPattern.test(chartVersion),
    );
  }, [chartVersion]);

  return (
    <form className="application-source" data-cy="appSourceForm">
      <Text size="l">Application Source</Text>
      <div />
      <div className="application-source-text">
        <Text size="l">Helm Chart</Text>
      </div>
      <Flex cols={[6, 6]}>
        <Combobox
          label="Registry Name"
          placeholder="Select a registry"
          size={ComboboxSize.Large}
          variant={ComboboxVariant.Primary}
          inputValue={helmRegistryName ?? ""}
          onSelectionChange={(value) => {
            if (helmRegistryName !== value) {
              dispatch(setHelmRegistryName(value as string));
              dispatch(setChartName(""));
              dispatch(setChartVersion(""));
            }
            const selectedRegistry = registriesResponse?.registries.find(
              (registry) => registry.name === value,
            );
            setSelectedHelmRegistryLocation(selectedRegistry?.rootUrl);
          }}
          isRequired={true}
          errorMessage="Registry Name is required"
          data-cy="helmRegistryNameCombobox"
        >
          {registriesLoaded && registriesResponse.registries
            ? registriesResponse.registries
                .filter((registry) => registry.type.toUpperCase() === "HELM")
                .map((registry) => (
                  <Item textValue={registry.name} key={registry.name}>
                    {registry.displayName
                      ? `${registry.displayName}(${registry.name})`
                      : `${registry.name}`}
                  </Item>
                ))
            : []}
        </Combobox>
        <div className="application-source-content">
          <Controller
            name="helmRegistryLocation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Registry Location"
                value={selectedHelmRegistryLocation ?? ""}
                size={InputSize.Large}
                data-cy="helmLocationInput"
                isDisabled
              />
            )}
          />
        </div>
      </Flex>
      <div className="application-source-text">
        <Flex cols={[6, 6]}>
          <Combobox
            label="Chart name"
            placeholder="Type or select a chart Name"
            size={ComboboxSize.Large}
            variant={ComboboxVariant.Primary}
            allowsCustomValue={true}
            inputValue={chartName ?? ""}
            onInputChange={(value: string) => {
              if (helmRegistryName && chartName !== value) {
                dispatch(setChartName(value));
                dispatch(setChartVersion(""));
              }
            }}
            isDisabled={!helmRegistryName}
            isRequired={true}
            validationState={
              chartName.length === 0 || namePattern.test(chartName)
                ? "valid"
                : "invalid"
            }
            errorMessage="Invalid Name"
            data-cy="chartNameCombobox"
          >
            {chartNamesLoaded && chartNames
              ? chartNames.map((chart) => (
                  <Item textValue={chart} key={chart}>
                    {chart}
                  </Item>
                ))
              : []}
          </Combobox>
          <div className="application-source-version">
            <Combobox
              label="Version"
              placeholder="Type or select a chart version"
              size={ComboboxSize.Large}
              variant={ComboboxVariant.Primary}
              allowsCustomValue={true}
              inputValue={chartVersion ?? ""}
              onInputChange={(value: string) =>
                dispatch(setChartVersion(value))
              }
              isDisabled={!chartName}
              isRequired={true}
              validationState={
                chartVersion.length === 0 ||
                chartVersionPattern.test(chartVersion)
                  ? "valid"
                  : "invalid"
              }
              errorMessage="Invalid version (ex. 1.0.0 or v0.1.2)"
              data-cy="chartVersionCombobox"
            >
              {chartVersionsLoaded && chartVersions
                ? chartVersions.map((chart) => (
                    <Item textValue={chart} key={chart}>
                      {chart}
                    </Item>
                  ))
                : []}
            </Combobox>
          </div>
        </Flex>
      </div>
      <div className="application-source-text">
        <Text size="l">Docker Image</Text>
      </div>
      <Flex cols={[6, 6]}>
        <Combobox
          label="Registry Name"
          placeholder="Select a registry"
          size={ComboboxSize.Large}
          variant={ComboboxVariant.Primary}
          inputValue={imageRegistryName ?? ""}
          onSelectionChange={(key: Key | null) => {
            dispatch(setImageRegistryName(key as string));
            const selectedImageRegistry = registriesResponse?.registries.find(
              (registry) => registry.name === (key as string),
            );
            setSelectedImageRegistryLocation(selectedImageRegistry?.rootUrl);
          }}
          data-cy="imageRegistryNameCombobox"
        >
          {registriesLoaded && registriesResponse.registries
            ? addNoneSelectToRegistryList(
                registriesResponse.registries,
                "IMAGE",
              )
            : []}
        </Combobox>
        <div className="application-source-content">
          <Controller
            name="imageRegistryLocation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Registry Location"
                value={selectedImageRegistryLocation ?? ""}
                size={InputSize.Large}
                isDisabled
                data-cy="imageLocationInput"
              />
            )}
          />
        </div>
      </Flex>
    </form>
  );
};

export default ApplicationSource;
