/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Heading } from "@spark-design/react";
import Version from "../../atoms/Version/Version";
import "./About.scss";

export const dataCy = "about";
const About = () => {
  const cy = { "data-cy": dataCy };

  return (
    <div {...cy} className="about">
      <Heading semanticLevel={1} size="l" data-cy="title">
        About
      </Heading>
      <Heading semanticLevel={2} size="m">
        Edge Orchestrator
      </Heading>
      <div className="card">
        <Version />
      </div>
    </div>
  );
};

export default About;
