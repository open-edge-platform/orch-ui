/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { useState } from "react";

const RegionRadioSelect = ({
  selectedName,
  row,
  onRadioSelect,
}: {
  region?: infra.RegionRead;
  row: infra.RegionRead;
  selectedName?: string;
  onRadioSelect?: (item: infra.RegionRead) => void;
}) => {
  const [selected, setSelected] = useState(selectedName);

  return (
    <input
      type="radio"
      name="check"
      checked={selected === row.resourceId || selected === row.name}
      onChange={() => {
        if (onRadioSelect) {
          onRadioSelect(row);
        }
        setSelected(row.resourceId || row.name);
      }}
    />
  );
};

export default RegionRadioSelect;
