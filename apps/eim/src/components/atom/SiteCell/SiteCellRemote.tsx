/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Provider } from "react-redux";
import { store } from "../../../store/store";
import SiteCell, { SiteCellProps } from "./SiteCell";

const SiteCellRemote = (props: SiteCellProps) => (
  <Provider store={store}>
    <SiteCell {...{ ...props }} />
  </Provider>
);

export default SiteCellRemote;
