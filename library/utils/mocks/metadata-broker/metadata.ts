/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { mbApi } from "@orch-ui/apis";
import { BaseStore } from "../baseStore";

export const userDefinedKeyOne = "customer-one";
export const userDefinedKeyTwo = "customer-two";

export const userDefinedValueOne = "value-one";
export const userDefinedValueTwo = "value-two";

export const customersKey = "customer";
export const customersOne = "culvers";
export const customersTwo = "seven-eleven";

const customers: mbApi.StoredMetadata = {
  key: customersKey,
  values: [customersOne, customersTwo],
};

export const regionsKey = "regions";
export const regionsOne = "north-east";
export const regionsTwo = "south-east";
export const regionsThree = "north-west";
export const regionsFour = "mid-west";
export const regionsFive = "south-west";
const regions: mbApi.StoredMetadata = {
  key: regionsKey,
  values: [regionsOne, regionsTwo, regionsTwo, regionsFour, regionsFive],
};

export const statesKey = "states";
export const statesOne = "california";
export const statesTwo = "oregon";
export const statesThree = "washington";
export const statesFour = "georgia";
export const statesFive = "illinois";
const states: mbApi.StoredMetadata = {
  key: statesKey,
  values: [statesOne, statesTwo, statesThree, statesFour, statesFive],
};

export const metadata: mbApi.StoredMetadata[] = [customers, regions, states];

export default class MetadataStore extends BaseStore<
  "key",
  mbApi.StoredMetadata,
  mbApi.MetadataList
> {
  constructor() {
    super("key", [customers, regions, states]);
  }

  // NOTE: can't really convert this object
  convert(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    body: mbApi.MetadataList,
  ): mbApi.StoredMetadata {
    return { key: "", values: [] };
  }
  post(body: mbApi.MetadataList): void {
    body.metadata?.forEach((kv) => {
      const result = this.get(kv.key!);
      // if you have the key and the user entered value does not already exist in the key list (values)
      if (result && !result.values?.find((value) => value === kv.value)) {
        result.values?.push(kv.value as string);
        const index = this.resources.findIndex((r) => r.key === kv.key);
        this.resources[index] = result;
      }
      // else this is a brand new key/value pair
      else {
        this.resources.push({ key: kv.key, values: [kv.value!] });
      }
    });
  }
}
