/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { mbApi } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import { Button, Icon, Text } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ReactHookFormCombobox } from "../../molecules/ReactHookFormCombobox/ReactHookFormCombobox";
import "./MetadataForm.scss";

export type MetadataPair = { key: string; value: string };
export type MetadataPairs = { pairs: MetadataPair[] };

export interface MetadataFormProps {
  pairs?: MetadataPair[];
  onUpdate: (metadataPairs: MetadataPair[]) => void;
  isDisabled?: boolean;
  buttonText?: string;
  leftLabelText?: string;
  rightLabelText?: string;
  hasError?: (isError: boolean) => void;
  allowDuplicateKeys?: boolean;
}

const upperCaseRegex = new RegExp("[A-Z]");
const k8LabelRegex = new RegExp("^[a-z0-9-./]*$");
const newEntryPair: MetadataPair = { key: "", value: "" };
export const MetadataForm = ({
  pairs = [],
  onUpdate,
  isDisabled = false,
  buttonText = "Add Metadata",
  leftLabelText,
  rightLabelText,
  hasError,
  allowDuplicateKeys = false,
}: MetadataFormProps) => {
  const { data: metadataResponse } = mbApi.useMetadataServiceGetMetadataQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !SharedStorage.project?.name,
    },
  );

  // Note: best to send in all fields pre-packaged. Otherwise React Hook Forms
  // gets into rendering problems if you try to add `newEntryPair` inside
  return (
    <MetadataFormContent
      metadataOptions={metadataResponse?.metadata}
      metadataPairs={{ pairs: [...pairs, newEntryPair] }}
      onUpdate={onUpdate}
      isDisabled={isDisabled}
      buttonText={buttonText}
      leftLabelText={leftLabelText}
      rightLabelText={rightLabelText}
      hasError={hasError}
      allowDuplicateKeys={allowDuplicateKeys}
    />
  );
};

export interface MetadataFormContentProps {
  metadataOptions: mbApi.StoredMetadata[] | undefined;
  metadataPairs: MetadataPairs;
  onUpdate: (metadataPairs: MetadataPair[]) => void;
  isDisabled: boolean;
  buttonText: string;
  leftLabelText?: string;
  rightLabelText?: string;
  hasError?: (error: boolean) => void;
  allowDuplicateKeys?: boolean;
}

export enum ErrorMessages {
  IsRequired = "Is Required",
  KeyExists = "Key already exists",
  NoUpperCase = "Must be lower case",
  InvalidK8Label = "Only alphanumeric values and . - allowed",
  MaxLengthExceeded = "Maximum of 63 characters allowed",
}

type ValueFieldNamePath = `pairs.${number}.value`;

export const errorMessages = {};

export const MetadataFormContent = ({
  metadataOptions,
  metadataPairs = { pairs: [] },
  onUpdate,
  hasError,
  isDisabled = false,
  buttonText,
  leftLabelText,
  rightLabelText,
  allowDuplicateKeys = false,
}: MetadataFormContentProps) => {
  const {
    control,
    getValues,
    trigger,
    formState: { errors },
    reset,
  } = useForm<MetadataPairs>({
    defaultValues: metadataPairs,
    mode: "onChange",
  });

  useEffect(() => {
    /* Invoked only when the error state of the form changes,
       Called on first error and when the errors are cleared.
     * react-hook-form mutates the error state to avoid frequent re-renders on error
     */
    if (hasError) hasError(Boolean(Object.values(errors).length));
  }, [errors.pairs]);

  let allMetadataKeys: string[] = [];
  if (metadataOptions) {
    const availableOptions = metadataOptions
      .map((option) => option.key)
      .filter((key) => key !== undefined);
    allMetadataKeys = availableOptions as string[];
  }

  const [allMetadataValues, setAllMetadataValues] = useState<string[]>([]);

  const { fields, append, remove, replace } = useFieldArray({
    name: "pairs",
    control,
  });

  const triggerEmptyKeyValueValidation = (pairs: MetadataPair[]) => {
    pairs.map((pair: MetadataPair, index: number) => {
      const { key, value } = pair;
      if (value && !key) {
        triggerKeyValidation(index);
      }
      if (key && !value) {
        triggerValValidation(index);
      }
    });
  };

  const handleOnKeyFieldBlur = (fieldPath: ValueFieldNamePath) => {
    // if ComboBox value field is entered first followed by typing the key, then onUpdate is called
    if (getValues(fieldPath)) onUpdate(getMetadataPairs());
  };

  const getMetadataPairs = (): MetadataPair[] => {
    const metadataPairs: MetadataPairs = structuredClone(getValues());
    const { pairs } = metadataPairs;

    if (pairs.length === 0) return [];

    const isLastPairEmpty =
      pairs[pairs.length - 1].key === "" &&
      pairs[pairs.length - 1].value === "";
    if (isLastPairEmpty) pairs.pop();
    triggerEmptyKeyValueValidation(pairs);
    return pairs;
  };

  const triggerKeyValidation = (index: number) => {
    setTimeout(() => {
      trigger(`pairs.${index}.key`);
    }, 250);
  };

  const triggerValValidation = (index: number) => {
    trigger(`pairs.${index}.value`);
  };

  const resetsHandler = (index: number, value: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        resetValueField(index, value);
        triggerKeyValidation(index);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const checkForUpperCase = (value: string) => {
    const hasUpperCase = upperCaseRegex.test(value);
    return !hasUpperCase || ErrorMessages.NoUpperCase;
  };

  const checkK8Label = (value: string) => {
    const isValid = k8LabelRegex.test(value);
    return isValid || ErrorMessages.InvalidK8Label;
  };

  const checkK8MaxLength = (value: string) => {
    const exceedsLength = value.length > 63;
    return !exceedsLength || ErrorMessages.MaxLengthExceeded;
  };

  const removeMetadata = (index: number) => {
    remove(index);
    onUpdate(getMetadataPairs());
  };

  const resetValueField = (index: number, key: string) => {
    const newFields: MetadataPair[] = fields;
    newFields[index].key = key;
    newFields[index].value = "";
    reset({
      pairs: newFields,
    });
  };

  useEffect(() => {
    replace(metadataPairs.pairs);
  }, [metadataPairs]);
  const canAddMetadata = Object.keys(errors).length === 0;
  const mf = "metadata-form";

  return (
    <form className={mf} autoComplete="off" data-cy="metadataForm">
      {fields.length > 0 && (
        <div className={`${mf}__labels`}>
          <Text data-cy="leftLabelText">{leftLabelText ?? "Key"}</Text>
          <Text data-cy="rightLabelText">{rightLabelText ?? "Value"}</Text>
          <Button />
        </div>
      )}

      {fields.map((field, index: number) => {
        const isLastIndex = fields.length - 1 === index;
        return (
          <div
            className={`${mf}__${isLastIndex ? "entry" : "pair"}`}
            key={field.id}
            data-cy={isLastIndex ? "entry" : "pair"}
          >
            <ReactHookFormCombobox
              dataCy={isLastIndex ? "rhfComboboxEntryKey" : "metadataKey"}
              control={control}
              placeholder={`Enter a ${leftLabelText?.toLowerCase() ?? "key"}`}
              id={`rhf-key-${index}`}
              value={field.key}
              label="key"
              inputsProperty={`pairs.${index}.key`}
              items={allMetadataKeys}
              isDisabled={isDisabled}
              onChange={() => triggerKeyValidation(index)}
              onBlur={() => handleOnKeyFieldBlur(`pairs.${index}.value`)}
              onSelect={(value: string) => {
                resetsHandler(index, value).then(() => {
                  if (!metadataOptions) return;
                  const selectedKey = metadataOptions.find(
                    (item) => item.key === value,
                  );

                  if (selectedKey && selectedKey.values) {
                    setAllMetadataValues(selectedKey.values);
                  }
                });
              }}
              validate={{
                //@ts-ignore
                required: (value: string) => {
                  const valueField = getValues(`pairs.${index}.value`);
                  if (valueField && !value) {
                    return ErrorMessages.IsRequired;
                  }
                  return true;
                },
                //@ts-ignore
                ...(!allowDuplicateKeys
                  ? {
                      noDuplicate: (value: string) => {
                        const pairs = [...getValues().pairs];
                        pairs.splice(index, 1); // dont compare against itself
                        const hasDuplicate = pairs
                          .map((pair: MetadataPair) => pair.key)
                          .some((key: string) => key === value);
                        return !hasDuplicate || ErrorMessages.KeyExists;
                      },
                    }
                  : {}),
                //@ts-ignore
                noUpperCase: (value: string) => checkForUpperCase(value),
                //@ts-ignore
                noInvalidLabel: (value: string) => checkK8Label(value),
                //@ts-ignore
                noMaxLengthExceeded: (value: string) => checkK8MaxLength(value),
              }}
            />
            <ReactHookFormCombobox
              dataCy={isLastIndex ? "rhfComboboxEntryValue" : "metadataValue"}
              control={control}
              placeholder={`Enter a ${
                rightLabelText?.toLowerCase() ?? "value"
              }`}
              id={`rhf-value-${index}`}
              label="value"
              value={field.value}
              inputsProperty={`pairs.${index}.value`}
              items={allMetadataValues}
              isDisabled={isDisabled}
              onSelect={() => {
                setTimeout(() => {
                  onUpdate(getMetadataPairs());
                }, 100);
              }}
              onBlur={() => {
                onUpdate(getMetadataPairs());
              }}
              validate={{
                //@ts-ignore
                required: (value: string) => {
                  const keyValue = getValues(`pairs.${index}.key`);
                  if (keyValue && !value) {
                    return ErrorMessages.IsRequired;
                  }
                  return true;
                },
                //@ts-ignore
                noUpperCase: (value: string) => checkForUpperCase(value),
                //@ts-ignore
                noInvalidLabel: (value: string) => checkK8Label(value),
                //@ts-ignore
                noMaxLengthExceeded: (value: string) => checkK8MaxLength(value),
              }}
            />

            <Button
              data-cy="delete"
              variant="primary"
              isDisabled={isDisabled}
              iconOnly
              size={ButtonSize.Large}
              onPress={() => removeMetadata(index)}
            >
              <Icon icon="trash" />
            </Button>
          </div>
        );
      })}
      <Button
        data-cy="add"
        type="button"
        variant={ButtonVariant.Primary}
        size={ButtonSize.Large}
        isDisabled={!canAddMetadata || isDisabled}
        onPress={() => {
          const lastIndex = fields.length - 1;
          const lastKey = getValues(`pairs.${lastIndex}.key`);
          const lastValue = getValues(`pairs.${lastIndex}.value`);

          if (lastKey === "" || lastValue === "") {
            trigger([`pairs.${lastIndex}.key`, `pairs.${lastIndex}.value`]);
            return;
          }
          append({ key: "", value: "" });

          setTimeout(() => {
            const el = document.querySelector(
              `#rhf-key-${fields.length} input`,
            ) as HTMLElement;
            if (el) el.focus();

            const mainEl = document.querySelector(".sidebar-main__main");
            if (mainEl) {
              mainEl.scrollTop = mainEl.scrollHeight;
            }
            onUpdate(getMetadataPairs());
          }, 0);
        }}
      >
        {buttonText}
      </Button>
    </form>
  );
};
