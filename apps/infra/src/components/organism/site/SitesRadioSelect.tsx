/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { useState } from "react";

const SitesRadioSelect = ({
  selectedName,
  row,
  onRadioSelect,
}: {
  row: infra.SiteRead;
  selectedName?: string;
  onRadioSelect?: (item: infra.SiteRead) => void;
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

export default SitesRadioSelect;
