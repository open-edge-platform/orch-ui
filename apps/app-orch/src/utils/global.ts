/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { arm } from "@orch-ui/apis";
import { MetadataPair } from "@orch-ui/components";
import { FullTagDescription } from "@reduxjs/toolkit/dist/cjs";
import { AppDispatch } from "../store";

export const invalidateCacheByTagname = (
  tagname: string,
  dispatch: AppDispatch,
) => {
  const appResourceManager = arm.resourceManager;
  dispatch(
    appResourceManager.util.invalidateTags([
      { type: tagname } as FullTagDescription<never>,
    ]),
  );
};

export const generateName = (displayName: string) =>
  displayName
    .replace(/ /g, "-")
    .replace(/\//g, "-")
    .replace(/[^0-9a-z-.]/gi, "")
    .toLowerCase();

export const printName = (name: string, displayName?: string) =>
  displayName ? `${displayName} (${name})` : name;

export const printStatus = (status: string) => {
  const result = status.replace("STATE_", "").replaceAll("_", " ");
  return `${result.slice(0, 1).toUpperCase()}${result
    .slice(1)
    .toLocaleLowerCase()}`;
};

export const nameErrorMsgForRequired = "Name is required!";
export const nameDefaultErrorMsg =
  "Name entered doesnot meet the required standards.";

/** get error message on Deployment Name entered.
 *
 * This requires `<Controller/>` rendering `<TextField/>` and argument `useForm()->errors.*.type`.  */
export const getDisplayNameValidationErrorMessage = (
  type?: string,
  maxLength = 40,
  validCharacters: {
    space?: boolean;
    lowerLetter?: boolean;
    upperLetter?: boolean;
    digit?: boolean;
    hyphen?: boolean;
    slash?: boolean;
  } = {
    space: true,
    lowerLetter: true,
    upperLetter: true,
    digit: true,
    hyphen: true,
    slash: true,
  },
) => {
  const canContain: string[] = [];
  switch (type) {
    case "required":
      return nameErrorMsgForRequired;
    case "maxLength":
      return `Name can't be more than ${maxLength} characters.`;
    case "pattern":
      [
        "space",
        "lowerLetter",
        "upperLetter",
        "digit",
        "hyphen",
        "slash",
      ].forEach((key) => {
        switch (key) {
          case "space":
            if (validCharacters.space !== false) {
              canContain.push("spaces");
            }
            break;

          case "lowerLetter":
            if (validCharacters.lowerLetter !== false) {
              canContain.push("lowercase letter(s)");
            }
            break;

          case "upperLetter":
            if (validCharacters.upperLetter !== false) {
              canContain.push("uppercase letter(s)");
            }
            break;

          case "digit":
            if (validCharacters.digit !== false) {
              canContain.push("number(s)");
            }
            break;

          case "hyphen":
            if (validCharacters.hyphen !== false) {
              canContain.push("hyphen(s)");
            }
            break;

          case "slash":
            if (validCharacters.slash !== false) {
              canContain.push("slash(es)");
            }
            break;
        }
      });
      return `Name must start and end with a letter or a number. Name can contain ${canContain.join(
        ", ",
      )}.`;
  }
  return nameDefaultErrorMsg;
};

/** @deprecated refer to `generateMetadataPair()` in `@orch-ui/utils` */
export const generateMetadataPair = (labels?: any): MetadataPair[] => {
  const result: MetadataPair[] = [];
  if (labels) {
    Object.keys(labels).map((key) => {
      if (typeof key === "string" && typeof labels[key] === "string") {
        result.push({ key: key, value: labels[key] });
      }
    });
  }
  return result;
};

export const flattenObject = (
  obj: Record<string, any>,
  parentKey = "",
  result: Record<string, any> = {},
): Record<string, any> => {
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
};
