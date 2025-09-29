/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import "./OsUpdatePolicy.scss";
const dataCy = "osUpdatePolicy";
interface OsUpdatePolicyProps {}
const OsUpdatePolicy = ({}: OsUpdatePolicyProps) => {
  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="os-update-policy">
      OS UPDATE POLICY
    </div>
  );
};

export default OsUpdatePolicy;
