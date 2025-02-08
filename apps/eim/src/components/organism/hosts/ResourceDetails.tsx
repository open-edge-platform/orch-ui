/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { useEffect, useState } from "react";
import Cpu, { HostResourcesCpuRead } from "./resourcedetails/Cpu";
import Gpu from "./resourcedetails/Gpu";
import Interfaces from "./resourcedetails/Interfaces";
import Memory from "./resourcedetails/Memory";
import Storage from "./resourcedetails/Storage";
import Usb from "./resourcedetails/Usb";

export type ResourceType =
  | HostResourcesCpuRead[]
  | eim.HostResourcesStorage[]
  | eim.HostResourcesInterface[]
  | eim.HostRead["hostStatus"]
  | eim.HostResourcesGpuRead[]
  | eim.HostResourcesUsb
  | string;

export type ResourceTypeTitle =
  | "CPUs"
  | "Memory"
  | "Storage"
  | "GPUs"
  | "Interfaces"
  | "USB";

interface ResourceDetailsProps<T> {
  title: ResourceTypeTitle;
  data: T;
}

const ResourceDetails = <T extends ResourceType>({
  title,
  data,
}: ResourceDetailsProps<T>) => {
  const [jsx, setJsx] = useState<JSX.Element>();
  useEffect(() => {
    switch (title) {
      case "CPUs":
        setJsx(<Cpu data={data as HostResourcesCpuRead[]} />);
        break;
      case "Memory":
        setJsx(<Memory data={data as string} />);
        break;
      case "Storage":
        setJsx(<Storage data={data as eim.HostResourcesStorageRead[]} />);
        break;
      case "GPUs":
        setJsx(<Gpu data={data as eim.HostResourcesGpuRead[]} />);
        break;
      case "Interfaces":
        setJsx(<Interfaces data={data as eim.HostResourcesInterfaceRead[]} />);
        break;
      case "USB":
        setJsx(<Usb data={data as eim.HostResourcesUsbRead} />);
    }
  }, [title]);

  return <div data-cy="resourceDetails">{jsx}</div> ?? null;
};

/*eslint-disable @typescript-eslint/no-empty-interface */
export interface ResourceDetailsDisplayProps<T extends ResourceType>
  extends Pick<ResourceDetailsProps<T>, "data"> {}

export default ResourceDetails;
