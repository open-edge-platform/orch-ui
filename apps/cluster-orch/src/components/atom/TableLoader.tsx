/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Shimmer } from "@spark-design/react";

export default function TableLoader() {
  return (
    <div>
      <Shimmer
        items={12}
        style={{ width: "100%", display: "grid", gap: "10px" }}
      >
        <div
          style={{
            height: "30px",
            width: "100%",
          }}
        />
        <div
          style={{
            height: "30px",
            width: "100%",
          }}
        />
        <div
          style={{
            height: "30px",
            width: "100%",
          }}
        />
      </Shimmer>
    </div>
  );
}
