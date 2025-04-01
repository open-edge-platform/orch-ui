/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import "./SidebarMain.scss";

export interface SidebarMainProps {
  sidebar: JSX.Element;
  main: JSX.Element;
  dataCy?: string;
}

export const SidebarMain = ({
  sidebar,
  main,
  dataCy = "sidebarMain",
}: SidebarMainProps): JSX.Element => {
  return (
    <div className="sidebar-main" data-cy={dataCy}>
      <div className="sidebar-main__sidebar" data-cy="sidebar">
        {sidebar}
      </div>
      <div className="sidebar-main__main" data-cy="main">
        {main}
      </div>
    </div>
  );
};
