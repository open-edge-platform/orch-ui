/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { mbApi } from "@orch-ui/apis";
import { Cy, CyApiDetails, CyPom } from "@orch-ui/tests";
import * as metadataBrokerMocks from "../../../../utils/mocks/metadata-broker";
import { ReactHookFormComboboxPom } from "../../molecules/ReactHookFormCombobox/ReactHookFormCombobox.pom";
// pair identifies all existing metadata
// entry is the new one
const dataCySelectors = [
  "pair",
  "entry",
  "add",
  "delete",
  "leftLabelText",
  "rightLabelText",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getMetadata" | "getMockedMetadata" | "getEmptyMetadata";
export const route = "/v1/projects/**/metadata";
const apis: CyApiDetails<ApiAliases> = {
  getMetadata: {
    route,
    statusCode: 200,
  },
  getMockedMetadata: {
    route,
    statusCode: 200,
    response: {
      metadata: metadataBrokerMocks.metadata,
    } as mbApi.MetadataResponse,
  },
  getEmptyMetadata: {
    route,
    statusCode: 200,
    response: {
      metadata: [],
    } as mbApi.MetadataResponse,
  },
};

export class MetadataFormPom extends CyPom<Selectors, ApiAliases> {
  public rhfComboboxKeyPom = new ReactHookFormComboboxPom(
    "rhfComboboxEntryKey",
  );
  public rhfComboboxValuePom = new ReactHookFormComboboxPom(
    "rhfComboboxEntryValue",
  );

  constructor(public rootCy: string = "metadataForm") {
    super(rootCy, [...dataCySelectors], apis);
  }

  public getNewEntryInput(type: "Key" | "Value"): Cy<HTMLInputElement> {
    // TODO, bug in SI sends the data-cy value into to different elements of a Combobox
    return this.el.entry
      .find(`[data-cy=rhfComboboxEntry${type}]`)
      .find("input");
  }

  public getNewEntryOptions(type: "Key" | "Value"): Cy {
    // Options pop-over only exists when input is interacted with
    this.el.entry
      .find(`[data-cy=rhfComboboxEntry${type}] .spark-combobox-arrow-button`)
      .click();
    return cy.get(".spark-popover .spark-list-item");
  }

  /**
   * Given a Metadata Key updates the corresponding value
   * @param key The metadata Key
   * @param newValue the new metadata value
   */
  public udpateMetadataValue(key: string, newValue: string) {
    this.el.pair.each((pair) => {
      cy.wrap(pair)
        .find("[data-cy=metadataKey]")
        .find("input")
        .then(($el) => {
          if (
            $el.val() &&
            $el.val()?.toString().toLowerCase() === key.toLowerCase()
          ) {
            cy.wrap(pair)
              .find("[data-cy=metadataValue]")
              .find("input")
              .clear()
              .type(newValue);
          }
        });
    });

    // move somewhere so the value is updated in the callback
    this.getNewEntryInput("Key").focus();
  }

  /**
   * Given a Metadata Key, the corresponding delete is clicked
   * @param key The metadata Key
   */
  public deleteMetadataByKey(key: string) {
    this.el.pair.each((pair) => {
      cy.wrap(pair)
        .find("[data-cy=metadataKey]")
        .find("input")
        .then(($el) => {
          if (
            $el.val() &&
            $el.val()?.toString().toLowerCase() === key.toLowerCase()
          ) {
            cy.wrap(pair).find("[data-cy=delete]").click();
          }
        });
    });
  }

  public deleteMetadataByIndex(index: number) {
    this.el.pair.eq(index).find("[data-cy=delete]").click();
  }

  public getMetadataResponse() {
    return CyPom.isResponseMocked
      ? this.api.getMockedMetadata
      : this.api.getMetadata;
  }
}
