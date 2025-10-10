/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from "react-redux";
import { store } from "../../../store/store";
import OsUpdatePolicy from "./OsUpdatePolicy";

const OsUpdatePolicyRemote = () => (
  <Provider store={store}>
    <OsUpdatePolicy />
  </Provider>
);

export default OsUpdatePolicyRemote;
