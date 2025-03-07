/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLocation } from "react-router-dom";

export function RenderLocation() {
  const location = useLocation() as unknown as { [key: string]: string };
  return (
    <>
      <div id="react-router-location">
        {Object.keys(location).map((key, i) => (
          <div key={i} id={`${key}`}>
            {key}: <span id="value">{location[key]}</span>
          </div>
        ))}
      </div>
      <hr />
    </>
  );
}
