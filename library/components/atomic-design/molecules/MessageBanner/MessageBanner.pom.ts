/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "close",
  "messageBannerText",
  "messageBannerContent",
  "title",
  "titleIcon",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class MessageBannerPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "messageBanner") {
    super(rootCy, [...dataCySelectors]);
  }
}
