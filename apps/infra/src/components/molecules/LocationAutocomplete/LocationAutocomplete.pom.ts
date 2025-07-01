/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiComboboxPom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class LocationAutocompletePom extends CyPom<Selectors> {
  public combobox = new SiComboboxPom("locationCombobox");

  constructor(public rootCy: string = "locationAutocomplete") {
    super(rootCy, [...dataCySelectors]);
  }
}

export default LocationAutocompletePom;
