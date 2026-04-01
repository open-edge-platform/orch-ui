/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class LocationAutocompleteReactAriaPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "locationAutocompleteReactAria") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default LocationAutocompleteReactAriaPom;
