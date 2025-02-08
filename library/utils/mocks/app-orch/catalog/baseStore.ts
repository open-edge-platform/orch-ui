/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

interface baseMaResource {
  name: string;
  version: string;
}

/**
 * Base class to support application catalog store
 * @template T
 * @param {T} resourceType The interface of the resources that are stored
 * @template B
 * @param {B} bodyType The interface of body for a PUT or POST request, defaults to T
 */
export default class CatalogBaseStore<
  T extends baseMaResource,
  B extends T = T,
> {
  resources: T[] = [];
  constructor(resources: T[]) {
    this.resources = resources;
  }

  list(): T[] {
    return this.resources;
  }

  getVersions(name: string): T[] {
    return this.resources.filter((ca) => ca.name === name);
  }

  get(name: string, version: string): T | undefined {
    return this.resources.find(
      (ca) => ca.name === name && ca.version === version,
    );
  }

  post(body: B): T | void {
    const data = body;
    this.resources.push(data);
    return data;
  }

  put(name: string, version: string, body: B): T | void {
    const idx = this.resources.findIndex(
      (r) => r.name === name && r.version === version,
    );
    if (idx === -1) {
      throw new Error("Not Found");
    }
    const data = body;
    this.resources[idx] = body;
    return data;
  }

  /**
   * Removes an element from the store
   * @return boolean True if the element was actually remove, false if it wasn't found
   */
  delete(name: string, version: string): boolean {
    if (this.get(name, version) === undefined) {
      return false;
    }
    this.resources = this.resources.filter((r) => {
      return !(r.name === name && r.version === version);
    });
    return true;
  }
}
