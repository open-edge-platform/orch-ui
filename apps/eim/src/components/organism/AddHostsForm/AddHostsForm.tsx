/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ReactHookFormTextField } from "@orch-ui/components";
import { Button, Icon, Text } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { setNewRegisteredHosts } from "../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import "./AddHostsForm.scss";

export type AddHostsFormItem = {
  name: string;
  serialNumber: string;
  uuid: string;
};
export type AddHostsFormItems = { hosts: AddHostsFormItem[] };

export enum ErrorMessages {
  SerialNumberMaxLengthExceeded = "Maximum of 20 characters allowed",
  HostNameExists = "Name already exists",
  SerialNumberExists = "Serial number already exists",
  RequireSerialNumber = "Required if Uuid not provided",
  RequireUuid = "Required if Serial Number not provided",
  UuidFormat = "UUID format is invalid",
  SerialNumberFormat = "Serial Number format is invalid",
}

export const dataCy = "addHostsForm";
const AddHostsForm = () => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();
  const { hosts } = useAppSelector((store) => store.configureHost);

  const {
    control,
    getValues,
    setValue,
    resetField,
    reset,
    trigger,
    formState: { errors, isDirty },
  } = useForm<AddHostsFormItems>({
    defaultValues: { hosts: [{ name: "", serialNumber: "", uuid: "" }] },
    mode: "onChange",
  });

  const checkSerialNumberLength = (value: string) => {
    const exceedsLength = value.length > 20;
    return !exceedsLength || ErrorMessages.SerialNumberMaxLengthExceeded;
  };

  const dispatchNewHosts = () => {
    const { hosts } = getValues();
    dispatch(
      setNewRegisteredHosts({
        hosts: hosts.filter((host) => host.name !== ""),
      }),
    );
  };

  const removeHosts = (index: number) => {
    remove(index);
  };

  const { fields, append, remove } = useFieldArray({ name: "hosts", control });

  const className = "add-hosts-form";
  const canAddHost = Object.keys(errors).length === 0;

  useEffect(() => {
    //grab all the hosts that have a resourceId, aka succesfully registered via API
    const registered: string[] = [];
    Object.keys(hosts).forEach((key) => {
      const host = hosts[key];
      if (host.resourceId) registered.push(host.name);
    });
    //find the matching names from the fields indexes on form
    const registeredIndexes: number[] = [];
    fields.forEach((field, index) => {
      if (registered.includes(field.name)) registeredIndexes.push(index);
    });
    //delete these indexes
    remove(registeredIndexes);
    reset(undefined, { keepValues: true });
  }, [hosts]);

  return (
    <div {...cy} className={className}>
      <form className={`${className}__form`}>
        {fields.length > 0 && (
          <div className={`${className}__headers`}>
            <Text>Host Name</Text>
            <Text>Serial Number</Text>
            <Text>UUID</Text>
            <Text>&nbsp;</Text>
          </div>
        )}

        {fields.map((field, index: number) => {
          const lastIndex = fields.length - 1;
          const isLastIndex = lastIndex === index;
          const rowHasReportedError =
            hosts && hosts[field.name] && hosts[field.name].error;
          return (
            <>
              <div
                className={`${className}__${isLastIndex ? "entry-row" : "item-row"}`}
                key={field.id}
                data-cy={isLastIndex ? "entryRow" : "itemRow"}
              >
                <ReactHookFormTextField
                  dataCy={isLastIndex ? "newHostName" : "enteredHostName"}
                  control={control}
                  placeholder="Host Name"
                  id={`host-${index}-name`}
                  value={field.name}
                  inputsProperty={`hosts.${index}.name`}
                  validate={{
                    //@ts-ignore
                    noDuplicate: (value: string) => {
                      const hosts = [...getValues().hosts];
                      hosts.splice(index, 1); // dont compare against itself
                      const hasDuplicate = hosts
                        .map((host: AddHostsFormItem) => host.name)
                        .some((key: string) => key === value);
                      return !hasDuplicate || ErrorMessages.HostNameExists;
                    },
                  }}
                  onChange={() => {
                    if (!isLastIndex) dispatchNewHosts();
                  }}
                />
                <ReactHookFormTextField
                  dataCy={
                    isLastIndex ? "newSerialNumber" : "enteredSerialNumber"
                  }
                  control={control}
                  placeholder="Serial Number"
                  isRequired={false}
                  id={`host-${index}-serial-number`}
                  value={field.serialNumber}
                  inputsProperty={`hosts.${index}.serialNumber`}
                  onChange={() => {
                    trigger(`hosts.${index}.uuid`);
                    if (!isLastIndex) dispatchNewHosts();
                  }}
                  validate={{
                    noMaxLengthExceeded: (value: string) =>
                      checkSerialNumberLength(value),
                    require: (value: string) => {
                      if (value === "") {
                        const row = getValues(`hosts.${index}`);
                        return (
                          row.uuid !== "" || ErrorMessages.RequireSerialNumber
                        );
                      }
                      return true;
                    },
                    format: (value: string) => {
                      if (value === "") return true;
                      return (
                        value.match(/^([A-Za-z0-9]{5,20})?$/) !== null ||
                        ErrorMessages.SerialNumberFormat
                      );
                    },
                    noDuplicate: (value: string) => {
                      const hosts = [...getValues().hosts];
                      hosts.splice(index, 1); // dont compare against itself
                      const hasDuplicate = hosts
                        .map((host: AddHostsFormItem) => host.serialNumber)
                        .some((key: string) => key === value);
                      return !hasDuplicate || ErrorMessages.SerialNumberExists;
                    },
                  }}
                />
                <ReactHookFormTextField
                  dataCy={isLastIndex ? "newUuid" : "enteredUuid"}
                  control={control}
                  placeholder="UUID"
                  isRequired={false}
                  id={`host-${index}-uuid`}
                  value={field.uuid}
                  inputsProperty={`hosts.${index}.uuid`}
                  onChange={() => {
                    trigger(`hosts.${index}.serialNumber`);
                    if (!isLastIndex) dispatchNewHosts();
                  }}
                  validate={{
                    require: (value: string) => {
                      if (value === "") {
                        const row = getValues(`hosts.${index}`);
                        return (
                          row.serialNumber !== "" || ErrorMessages.RequireUuid
                        );
                      }
                      return true;
                    },
                    format: (value: string) => {
                      if (value === "") return true;
                      return (
                        value.match(
                          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
                        ) !== null || ErrorMessages.UuidFormat
                      );
                    },
                  }}
                />
                <Button
                  data-cy="delete"
                  variant="primary"
                  iconOnly
                  size={ButtonSize.Large}
                  onPress={() => {
                    if (isLastIndex) {
                      resetField(`hosts.${lastIndex}`);
                      setValue(`hosts.${lastIndex}`, {
                        name: "",
                        serialNumber: "",
                        uuid: "",
                      });
                    } else {
                      removeHosts(index);
                      dispatchNewHosts();
                    }
                  }}
                >
                  <Icon icon="trash" />
                </Button>
              </div>
              {rowHasReportedError && (
                <div className={`${className}__api-error`}>
                  API error: {hosts[field.name].error}
                </div>
              )}
            </>
          );
        })}
      </form>
      <Button
        data-cy="add"
        className={`${className}__add`}
        iconOnly
        type="button"
        variant={ButtonVariant.Primary}
        size={ButtonSize.Large}
        isDisabled={!canAddHost || !isDirty}
        onPress={() => {
          const lastIndex = fields.length - 1;

          //Prevent adding blank entry host
          trigger([
            `hosts.${lastIndex}.name`,
            `hosts.${lastIndex}.serialNumber`,
            `hosts.${lastIndex}.uuid`,
          ]).then(() => {
            const hasErrors = Object.keys(errors).length > 0;
            if (hasErrors) return;
            append({ name: "", serialNumber: "", uuid: "" });
            dispatchNewHosts();

            setTimeout(() => {
              const el = document.querySelector(
                `#host-${fields.length}-name`,
              ) as HTMLElement;
              if (el) el.focus();
            }, 0);
          });
        }}
      >
        <Icon icon="plus" />
      </Button>
    </div>
  );
};

export default AddHostsForm;
