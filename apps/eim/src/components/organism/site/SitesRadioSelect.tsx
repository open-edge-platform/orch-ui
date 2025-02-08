/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { useState } from "react";

const SitesRadioSelect = ({
  selectedName,
  row,
  onRadioSelect,
}: {
  row: eim.SiteRead;
  selectedName?: string;
  onRadioSelect?: (item: eim.SiteRead) => void;
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
