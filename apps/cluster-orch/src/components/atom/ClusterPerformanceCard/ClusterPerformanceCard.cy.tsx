/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import ClusterPerformanceCard from "./ClusterPerformanceCard";
import { ClusterPerformanceCardPom } from "./ClusterPerformanceCard.pom";

const pom = new ClusterPerformanceCardPom();
describe("<ClusterPerformanceCard>", () => {
  it("should render the component with low color", () => {
    cy.mount(<ClusterPerformanceCard title="CPU" count={5} max={20} />);

    pom.el.clusterPerformanceCardTitle.should("have.text", "CPU");
    pom.el.clusterPerformanceCardChart.should("contain.text", "25%");
    pom.root.should("have.class", "low");
  });

  it("should render the component with medium color", () => {
    cy.mount(<ClusterPerformanceCard title="CPU" count={87} max={120} />);

    pom.el.clusterPerformanceCardTitle.should("have.text", "CPU");
    pom.el.clusterPerformanceCardChart.should("contain.text", "73%");
    pom.root.should("have.class", "medium");
  });

  it("should render the component with high color", () => {
    cy.mount(<ClusterPerformanceCard title="CPU" count={83} max={100} />);

    pom.el.clusterPerformanceCardTitle.should("have.text", "CPU");
    pom.el.clusterPerformanceCardChart.should("contain.text", "83%");
    pom.root.should("have.class", "high");
  });

  it("should render the component with custom threshold values", () => {
    cy.mount(
      <ClusterPerformanceCard
        title="CPU"
        count={87}
        max={120}
        thresholdPercent={{ medium: 30, high: 70 }}
      />,
    );

    pom.el.clusterPerformanceCardTitle.should("have.text", "CPU");
    pom.el.clusterPerformanceCardChart.should("contain.text", "73%");
    pom.root.should("have.class", "high");
  });

  it("should render the component with message when count exceeds max value", () => {
    cy.mount(<ClusterPerformanceCard title="CPU" count={130} max={100} />);
    pom.el.clusterPerformanceCardChart.should("contain.text", "130%");
    pom.root.should("have.class", "high");
  });

  it("should render the component when values provided are not defined", () => {
    cy.mount(
      <ClusterPerformanceCard title="CPU" count={undefined} max={undefined} />,
    );

    pom.el.clusterPerformanceCardTitle.should("have.text", "CPU");
    pom.el.clusterPerformanceCardChart.should("contain.text", "0%");
    pom.root.should("have.class", "emptyColor");
  });
});
