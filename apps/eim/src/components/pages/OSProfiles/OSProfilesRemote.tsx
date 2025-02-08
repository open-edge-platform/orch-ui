/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
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
