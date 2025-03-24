/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EChartDonut,
  EChartDonutSeries,
  EChartDonutSeriesItem,
  TableColumn,
} from "@orch-ui/components";
import { EChartColorSet } from "@orch-ui/utils";
import { Table, Text } from "@spark-design/react";
import { useEffect, useState } from "react";
import { ResourceDetailsDisplayProps } from "../ResourceDetails";

export interface HostResourcesCpuRead {
  cores: number;
  model: string;
  threads?: number;
  sockets?: number;
  architecture?: string;
  capabilities?: string;
}

interface CpuDonutChartProps {
  data: HostResourcesCpuRead[];
}

const CpuDonutChart = ({ data }: CpuDonutChartProps) => {
  const [barSeries, setBarSeries] = useState<EChartDonutSeries<number>>({
    data: new Map<string, EChartDonutSeriesItem<number>>(),
    radius: ["50%", "80%"],
  });

  useEffect(() => {
    const updatedBarSeries = { ...barSeries };
    data.forEach((value: HostResourcesCpuRead, index: number) => {
      const series: EChartDonutSeriesItem<number> = {
        name: value.model,
        value: value.cores,
        color: EChartColorSet[index % EChartColorSet.length],
      };
      updatedBarSeries.data.set(index.toString(), series);
    });
    setBarSeries(updatedBarSeries);
  }, [data]);

  return (
    <EChartDonut
      dataCy="cpuDonutChart"
      width="100%"
      height="200px"
      showLabel={true}
      series={[barSeries]}
    />
  );
};

const Cpu = ({ data }: ResourceDetailsDisplayProps<HostResourcesCpuRead[]>) => {
  const columns: TableColumn<HostResourcesCpuRead>[] = [
    { Header: "Model", accessor: "model" },
    { Header: "Cores", accessor: "cores" },
    { Header: "Architecture", accessor: "architecture" },
    { Header: "Threads", accessor: "threads" },
    { Header: "Sockets", accessor: "sockets" },
  ];

  return (
    <div data-cy="cpu">
      <Text>Cores</Text>
      <CpuDonutChart data={data} />
      <Table
        data-cy="cpuTable"
        columns={columns}
        data={data}
        variant="minimal"
        size="l"
        sort={[0, 1, 2, 3, 4]}
      />
    </div>
  );
};

export default Cpu;
