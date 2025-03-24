/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from "react-redux";
import { store } from "../../../store/store";
import OSProfiles from "./OSProfiles";

const OSProfilesRemote = () => (
  <Provider store={store}>
    <OSProfiles />
  </Provider>
);

export default OSProfilesRemote;
