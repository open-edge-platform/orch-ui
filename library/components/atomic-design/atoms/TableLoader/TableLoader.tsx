/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Shimmer } from "@spark-design/react";

interface TableLoaderProps {
  count?: number;
}

export function TableLoader(props: TableLoaderProps) {
  const { count = 4 } = props;
  return (
    <div data-cy="tableLoader">
      <Shimmer style={{ width: "100%", display: "grid", gap: "10px" }}>
        {new Array(count).fill(undefined).map((_, index: number) => (
          <div
            data-cy="row"
            style={{
              height: "30px",
              width: "100%",
            }}
            key={index}
          />
        ))}
      </Shimmer>
    </div>
  );
}
