/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Heading, IconVariant } from "@spark-design/react";
import { ReactEChart } from "../../atoms/EChart/EChart";
import { Empty } from "../../molecules/Empty/Empty";
import "./CounterWheel.scss";
export const CounterWheel = ({
  counterTitle = "",
  count = 0,
  total = 0,
  emptyIcon = "cube",
  emptyText = "Empty",
  dataCy = "counterWheel",
}: {
  counterTitle: string;
  count: number;
  total: number;
  emptyText?: string;
  emptyIcon?: IconVariant;
  dataCy?: string;
}) => {
  if (count > total || count === 0) {
    return <Empty dataCy={dataCy} icon={emptyIcon} title={emptyText} />;
  }

  return (
    <div className="wheel" data-cy={dataCy}>
      <div className="wheel__heading" data-cy={`${dataCy}Heading`}>
        <Heading semanticLevel={5}>{counterTitle}</Heading>
      </div>
      <div className="wheel__wheel-body">
        <div className="wheel__wheel-body__stat-box">
          <div
            className="wheel__wheel-body__stat-box__text"
            data-cy={`${dataCy}Text`}
          >
            <div
              className="wheel__wheel-body__stat-box__text__focus"
              data-cy={`${dataCy}TextFocus`}
            >
              {count}
            </div>{" "}
            out of {total}
          </div>
        </div>
        <ReactEChart
          style={{ minHeight: "inherit" }}
          className="wheel__echart"
          option={{
            tooltip: { show: false },
            series: [
              {
                silent: true,
                top: "20%",
                left: "10%",
                height: "80%",
                width: "80%",
                name: "Access From",
                type: "pie",
                radius: ["63%", "70%"],
                avoidLabelOverlap: false,
                label: { show: false },
                data: [
                  {
                    value: count,
                    name: "Unconfigured Hosts",
                    itemStyle: { color: "#8F5DA2" },
                  },
                  {
                    value: total - count,
                    name: "Configured Hosts",
                    itemStyle: { color: "#D1D5DB" },
                  },
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
