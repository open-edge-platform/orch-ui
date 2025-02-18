/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { SummaryStatusChart } from "./SummaryStatusChart";
import { SummaryStatusChartPom } from "./SummaryStatusChart.pom";

const pom = new SummaryStatusChartPom("summaryStatus");
describe("SummaryStatusChart component testing", () => {
  it("should render ", () => {
    cy.mount(
      <div>
        <SummaryStatusChart
          centerText={"Running"}
          data={{ total: 50, error: 15, running: 33, unknown: 7 }}
        />
      </div>,
    );

    pom.root.should("contain.text", "Running");
  });
});
