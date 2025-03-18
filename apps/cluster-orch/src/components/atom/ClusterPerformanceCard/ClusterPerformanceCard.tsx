/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactEChart } from "@orch-ui/components";
import { Heading } from "@spark-design/react";
import "./ClusterPerformanceCard.scss";

const dataCy = "clusterPerformanceCard";

interface ClusterPerformanceCardProps {
  /** heading title for the card */
  title: string;
  /** performance value measure */
  count?: number;
  /** maximum performance measure */
  max?: number;
  /** custom identifier for testing data-cy */
  rootCy?: string;
  /** Threshold to indicate color:
   * low color(below 35%),
   * medium color(35%-75%) &
   * high color (75% above)
   **/
  thresholdPercent?: { medium: number; high: number };
}

type ColorIntensity = "low" | "medium" | "high" | "emptyColor";

const ClusterPerformanceCard = ({
  title,
  count = 0,
  max = 100,
  thresholdPercent = { medium: 35, high: 75 },
  /** this will overload root data-cy only */
  rootCy,
}: ClusterPerformanceCardProps) => {
  let safeMax = max,
    safeCount = count;
  if (max === 0) {
    safeCount = 0;
    safeMax = 100;
  }

  const mediumThreshold = (safeMax * thresholdPercent.medium) / 100;
  const highThreshold = (safeMax * thresholdPercent.high) / 100;

  // Decide graph color based on the gauge value
  const colorValues = {
    low: "#8BAE46",
    medium: "#EDB200",
    high: "#CE0000",
    emptyColor: "#C9CACE",
  };

  let colorID: ColorIntensity = "emptyColor";
  const gaugeColors: [number, string][] = [];
  if (
    safeCount != 0 &&
    mediumThreshold < highThreshold &&
    highThreshold < safeMax
  ) {
    if (safeCount < mediumThreshold) {
      colorID = "low";
    } else if (mediumThreshold < safeCount && safeCount < highThreshold) {
      colorID = "medium";
    } else if (mediumThreshold < safeCount && highThreshold < safeCount) {
      colorID = "high";
    }
  }

  gaugeColors.push([safeCount / safeMax, colorValues[colorID]]);
  gaugeColors.push([1, colorValues["emptyColor"]]);

  return (
    <div className={`performance-card ${colorID}`} data-cy={rootCy || dataCy}>
      <div className="performance-card-box">
        <Heading
          className="performance-card-head"
          semanticLevel={5}
          data-cy={`${dataCy}Title`}
        >
          {title}
        </Heading>
        <div className="performance-card-body" data-cy={`${dataCy}Body`}>
          <ReactEChart
            dataCy={`${dataCy}Chart`}
            className="performanceCardChart"
            style={{ width: "auto", height: "20rem" }}
            option={{
              series: {
                name: "CPU",
                type: "gauge",
                radius: "100%",
                axisTick: {
                  show: false,
                },
                splitNumber: undefined,
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: gaugeColors,
                    width: 15,
                  },
                },
                pointer: {
                  show: false,
                },
                data: [{ value: Math.ceil((safeCount / safeMax) * 100) }],
                detail: {
                  show: true,
                  fontSize: 60,
                  fontWeight: "lighter",
                  fontFamily: "IntelOneText",
                  offsetCenter: ["0", "0"],
                  formatter: "{value}%",
                  color: "rgb(0,0,0)",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClusterPerformanceCard;
