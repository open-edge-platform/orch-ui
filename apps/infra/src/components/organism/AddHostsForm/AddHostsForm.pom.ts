/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactHookFormTextFieldPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["add", "entryRow", "itemRow"] as const;
type Selectors = (typeof dataCySelectors)[number];

class AddHostsFormPom extends CyPom<Selectors> {
  public newHostNamePom = new ReactHookFormTextFieldPom("newHostName");
  public newSerialNumberPom = new ReactHookFormTextFieldPom("newSerialNumber");
  public newUuidPom = new ReactHookFormTextFieldPom("newUuid");
  public enteredHostNamePom = new ReactHookFormTextFieldPom("enteredHostName");
  public enteredSerialNumberPom = new ReactHookFormTextFieldPom(
    "enteredSerialNumber",
  );
  public enteredUuidPom = new ReactHookFormTextFieldPom("enteredUuid");
  constructor(public rootCy: string = "addHostsForm") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default AddHostsFormPom;
