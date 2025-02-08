/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { logError } from "../error-handler/errorHandler";

export type ProjectItem = { name: string; uID: string };

export enum StorageItems {
  PROJECT = "project",
}

export class SharedStorage {
  public static getStorageEvents = (key: StorageItems) => {
    return `storage-${key}-updated`;
  };

  /**
   * @description A function to set the value in the local storage.
   * @param {string} key - The key to be used to store the value in the local storage.
   * @param {any} value - The value to be stored in the local storage.
   * @returns {void}
   */
  public static setStorageItem = (key: StorageItems, value: any): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event(SharedStorage.getStorageEvents(key)));
    } catch (error) {
      logError(error);
    }
  };

  /**
   * @description A function to get the value from the local storage.
   * @returns {any | undefined} - The value retrieved from the local storage, or undefined if an error occurred.
   */
  public static getStorageItem = (key: StorageItems): any | undefined => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null || item === undefined) {
        return undefined;
      }
      return JSON.parse(item);
    } catch (error) {
      logError(error);
      return undefined;
    }
  };

  /**
   * @description A function to remove the value from the local storage.
   * @returns {void}
   */
  public static removeStorageItem = (key: StorageItems): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      logError(error);
    }
  };

  public static get project(): ProjectItem | undefined {
    return SharedStorage.getStorageItem(StorageItems.PROJECT);
  }

  public static set project(value: ProjectItem | undefined) {
    SharedStorage.setStorageItem(StorageItems.PROJECT, value);
  }
}
