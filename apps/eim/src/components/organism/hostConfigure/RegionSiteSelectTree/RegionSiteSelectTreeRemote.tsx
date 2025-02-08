/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import { RegionSiteSelectTree } from "./RegionSiteSelectTree";

const RegionSiteSelectTreeRemote = (props: any) => (
  <Provider store={store}>
    <RegionSiteSelectTree {...props} />
  </Provider>
);

export default RegionSiteSelectTreeRemote;
