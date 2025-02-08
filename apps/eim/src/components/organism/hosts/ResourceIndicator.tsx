/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Flex } from "@orch-ui/components";
import { Icon as IconName } from "@spark-design/iconfont";
import { Icon, Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { ResourceType, ResourceTypeTitle } from "./ResourceDetails";
import "./ResourceIndicator.scss";

interface ResourceIndicatorProps<T extends ResourceType> {
  onClickCategory: (title: string, data: T) => void;
  data: T;
  title: ResourceTypeTitle;
  icon?: IconName;
  units?: string;
  value: string;
  dataCy?: string;
}
const ResourceIndicator = <T extends ResourceType>({
  onClickCategory,
  data,
  title,
  icon = "help",
  units,
  value,
  dataCy = "resourceIndicator",
}: ResourceIndicatorProps<T>) => {
  const ri = "resource-indicator";
  return (
    <div className={`${ri} spark-border`} data-cy={dataCy}>
      <Flex cols={[4, 8]}>
        <Icon className={`${ri}__icon`} icon={icon} />
        <div>
          <Text
            className={`${ri}__title`}
            data-cy="title"
            size={TextSize.Large}
          >
            {title}
          </Text>
          <Text
            className={`${ri}__value`}
            data-cy="value"
            size={TextSize.ExtraSmall}
          >
            {`${value} ${units ?? ""}`}
          </Text>
          <Text
            className={`${ri}__view-details`}
            onClick={() => onClickCategory(title, data)}
          >
            View Details
          </Text>
        </div>
      </Flex>
    </div>
  );
};

export default ResourceIndicator;
