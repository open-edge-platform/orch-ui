/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DomainProfileTable from "../../organisms/DomainProfileTable/DomainProfileTable";
import "./DomainProfile.scss";

const dataCy = "domain";

interface DomainProfileProps {}

const DomainProfile = ({}: DomainProfileProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <div {...cy} className="domain">
      <DomainProfileTable />
    </div>
  );
};

export default DomainProfile;
