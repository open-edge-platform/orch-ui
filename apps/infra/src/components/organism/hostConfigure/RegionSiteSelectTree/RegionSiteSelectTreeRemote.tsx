/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
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
