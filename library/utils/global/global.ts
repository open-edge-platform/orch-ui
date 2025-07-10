/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Direction, Operator } from "../interfaces/Pagination";

//https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arrays-by-string-path#comment55278413_6491621
// eslint-disable-next-line
export const getStringPoperty = (o: any, s: string): any => {
  s = s.replace(/\[(\w+)]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  const a = s.split(".");
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

/**
 * Deep (recursive) merge of two objects
 */
export const mergeRecursive = (obj1: any, obj2: any) => {
  for (const p in obj2) {
    try {
      if (obj2[p].constructor == Object) {
        obj1[p] = mergeRecursive(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      obj1[p] = obj2[p];
    }
  }
  return obj1;
};

/**
 * @deprecated use rfc3339ToDate instead
 */
export const convertUTCtoOrchUIDate = (utc: string): string => {
  const date = new Date(utc);

  return `${date.getDate()} ${date.toLocaleDateString("en-us", {
    month: "short",
  })} ${date.getFullYear()}`;
};

/**
 * @deprecated use rfc3339ToDate instead
 */
export const convertUTCtoOrchUIDateTime = (utc: string): string => {
  const date = new Date(utc);

  return `${date.getDate()} ${date.toLocaleDateString("en-us", {
    month: "short",
  })} ${date.getFullYear()} ${date.toTimeString().split(" ")[0]}`;
};

/**
 * rfc3339ToDate converts Golang's timestamps to date objects
 * @param ts https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/timestamp.proto#L106
 * @param dateOnly true for print only the date part of the datetime
 * @param timezone Require to make tests reliable across timezones
 */
export const rfc3339ToDate = (
  ts?: string,
  dateOnly: boolean = false,
  timezone?: {
    locale: string;
    zone: string;
  },
): string => {
  if (!ts) {
    return "-";
  }
  const time = Date.parse(ts);
  if (isNaN(time)) {
    return "-";
  }
  const date = new Date(time);
  if (timezone) {
    return dateOnly
      ? date.toLocaleDateString(timezone.locale, { timeZone: timezone.zone })
      : date.toLocaleString(timezone.locale, { timeZone: timezone.zone });
  }
  return dateOnly ? date.toLocaleDateString() : date.toLocaleString();
};

export const humanFileSize = (
  size?: number,
): { value: string; units: string } | null => {
  if (!size) return null;
  const i: number = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return {
    value: (size / Math.pow(1024, i)).toFixed(2),
    units: ["B", "kB", "MB", "GB", "TB"][i],
  };
};

export const humanSpeedBps = (bytes: number) => {
  let i = -1;
  const byteUnits = [
    " kbps",
    " Mbps",
    " Gbps",
    " Tbps",
    "Pbps",
    "Ebps",
    "Zbps",
    "Ybps",
  ];
  do {
    bytes = bytes / 1024;
    i++;
  } while (bytes > 1024);

  return Math.max(bytes, 0.1).toFixed(1) + byteUnits[i];
};

export const API_INTERVAL = 5000;

export const getSessionTimeout = () =>
  window.__RUNTIME_CONFIG__ ? window.__RUNTIME_CONFIG__.SESSION_TIMEOUT : 3600;

export const downloadFile = (data: string, filename?: string) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
  const anchorElement = document.createElement("a");
  anchorElement.setAttribute("href", dataStr);
  anchorElement.setAttribute("download", filename ?? "kubeconfig.yaml");
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
};

export const copyToClipboard = (
  data: string,
  onSuccess?: () => void,
  onFail?: () => void,
) => {
  navigator.clipboard.writeText(data).then(
    () => {
      /* clipboard successfully set */
      if (onSuccess) onSuccess();
    },
    () => {
      /* clipboard write failed */
      if (onFail) onFail();
    },
  );
};

// Found solution from here https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
// First the type check if the Generic Type T is object so that we can generate type from it's keys/leaves
// If yes continue, if no return never as no type can be generated from T
// { [K in keyof T]: xxx}[keyof T] nested keys will be saved under parent key in xx.x format
// ${Exclude<K, symbol>} ???
// ${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`} check if we arrive at the bottom, if not continue generate nested leaves again with dot
export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ""
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

export const getFilter = <T>(
  searchTerm: string,
  searchableFields: Leaves<T>[],
  operator: Operator,
  withQuotes = false,
  fieldMapping: { [key: string]: string } = {},
) => {
  if (searchTerm === "") return undefined;
  const filter: string[] = [];
  searchableFields.forEach((field) => {
    const fieldStr = String(field);
    const fieldKey = Object.hasOwn(fieldMapping, fieldStr)
      ? fieldMapping[fieldStr]
      : fieldStr;
    filter.push(
      withQuotes ? `${fieldKey}="${searchTerm}"` : `${fieldKey}=${searchTerm}`,
    );
  });
  if (operator !== Operator.NOT) return filter.join(` ${operator} `);
  return `${operator} ${filter.join(` ${operator} `)}`;
};

export const getOrder = <T>(
  orderField: keyof T | null,
  orderDirection: Direction | null,
  withoutAsc = false,
) => {
  const orderDirectionValue = withoutAsc
    ? orderDirection === Direction.DESC
      ? ` ${orderDirection}`
      : ""
    : ` ${orderDirection ?? ""}`;
  if (orderField) return `${String(orderField)}${orderDirectionValue}`;
  return undefined;
};

export const getObservabilityUrl = (): string | undefined => {
  return window.__RUNTIME_CONFIG__ &&
    window.__RUNTIME_CONFIG__.OBSERVABILITY_URL !== ""
    ? window.__RUNTIME_CONFIG__.OBSERVABILITY_URL
    : undefined;
};

export const stripTrailingSlash = (str: string) => str.replace(/\/$/, "");

export const clearAllStorage = () => {
  // Clear localStorage
  localStorage.clear();

  // Clear sessionStorage
  sessionStorage.clear();
};

export const downloadBlobFile = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const anchorElement = document.createElement("a");
  anchorElement.style.display = "none";
  anchorElement.setAttribute("href", url);
  anchorElement.setAttribute("download", fileName);
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement); // Remove the element after clicking
  window.URL.revokeObjectURL(url); // Revoke the URL to free resources
};
