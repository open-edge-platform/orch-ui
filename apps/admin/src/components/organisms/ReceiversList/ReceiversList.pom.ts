/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { receiver } from "@orch-ui/utils";
import { dataCy } from "./ReceiversList";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "receiversList";

const endpoints: CyApiDetails<
  ApiAliases,
  omApi.GetProjectAlertReceiversApiResponse
> = {
  receiversList: {
    route: "**/alerts/receivers",
    response: {
      receivers: [receiver],
    },
  },
};

class ReceiversListPom extends CyPom<Selectors, ApiAliases> {
  table: SiTablePom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new SiTablePom();
  }
}
export default ReceiversListPom;
