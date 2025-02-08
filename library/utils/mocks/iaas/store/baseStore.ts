/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

type baseMiResource<IdField extends string> = {
  // NOTE that this has to be optional as elements like clusters and deployment
  // mark the ID as optional (it's a OUTPUT_ONLY field)
  [F in IdField]?: string;
};

/**
 * Base class to support application catalog store
 * @template T
 * @param {T} resourceType The interface of the resources that are stored
 * @template B
 * @param {B} bodyType The interface of body for a PUT or POST request, defaults to T
 */
export default abstract class BaseStore<
  I extends string,
  T extends baseMiResource<I>,
  B = T
> {
  idField: I;
  resources: T[] = [];
  constructor(idField: I, resources: T[]) {
    this.resources = resources;
    this.idField = idField;
  }

  /**
   * We do not know how to convert the request body into the object,
   * so you must override this method
   * NOTE: if we find a way to check if B and T are the same,
   * we can create a default method
   * @param {B} body The body of a PUT/POST/PATCH request
   * @param {string} id The resource ID, needed for PUT and PATCH
   * @return {T}
   */
  abstract convert(body: B, id?: string): T;

  list(): T[] {
    return this.resources;
  }

  get(id: string): T | undefined {
    return this.resources.find((r) => r[this.idField] === id);
  }

  post(body: B): T | void {
    const data = this.convert(body);
    this.resources.push(data);
    return data;
  }

  put(id: string, body: B): T | undefined {
    const idx = this.resources.findIndex((r) => r[this.idField] === id);
    if (idx === -1) {
      throw new Error("Not Found");
    }
    const data = this.convert(body, id);
    this.resources[idx] = data;
    return data;
  }

  /**
   * Removes an element from the store
   * @return boolean True if the element was actually remove, false if it wasn't found
   */
  delete(id: string): boolean {
    if (this.get(id) === undefined) {
      return false;
    }
    this.resources = this.resources.filter((r) => {
      return r[this.idField] !== id;
    });
    return true;
  }
}
