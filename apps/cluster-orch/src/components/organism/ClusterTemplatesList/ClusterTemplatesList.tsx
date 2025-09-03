/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import {
  ApiError,
  Empty,
  Popup,
  PopupOption,
  Table,
  TableColumn,
  UploadButton,
} from "@orch-ui/components";
import { checkAuthAndRole, Role, SharedStorage } from "@orch-ui/utils";
import { Badge, Icon } from "@spark-design/react";
import { BadgeSize, ButtonVariant } from "@spark-design/tokens";
import { ChangeEvent } from "react";
import TableLoader from "../../atom/TableLoader";
import "./ClusterTemplatesList.scss";

const dataCy = "clusterTemplatesList";

interface ClusterTemplateListProps {
  getPopupOptions: (
    tpl: cm.TemplateInfo,
    defaultTemplateInfo: cm.DefaultTemplateInfo | undefined,
  ) => PopupOption[];
  onDelete: (tpl: cm.TemplateInfo) => void;
  onAddTemplate?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ClusterTemplatesList = ({
  getPopupOptions,
  onAddTemplate,
}: ClusterTemplateListProps) => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";

  const {
    data: templates,
    isSuccess,
    error,
    isLoading,
    isError,
  } = cm.useGetV2ProjectsByProjectNameTemplatesQuery(
    {
      projectName,
      default: false,
    },
    {
      skip: !projectName,
    },
  );

  const columns: TableColumn<cm.TemplateInfo>[] = [
    {
      Header: "Template Name",
      accessor: (tpl) => tpl.name,
    },
    {
      Header: "Version",
      accessor: (tpl) => tpl.version,
    },
    {
      Header: "Description",
      accessor: (tpl) => tpl.description,
    },
    {
      Header: " ",
      Cell: (table: { row: { original: cm.TemplateInfo } }) => {
        const rowTpl = table.row.original;
        if (
          templates &&
          templates.defaultTemplateInfo &&
          templates.defaultTemplateInfo.name === rowTpl.name &&
          templates.defaultTemplateInfo.version === rowTpl.version
        ) {
          return (
            <Badge
              className="default-badge"
              size={BadgeSize.Medium}
              text="Default"
              variant="info"
              shape="square"
            />
          );
        } else {
          return <></>;
        }
      },
    },
    {
      Header: "Action",
      textAlign: "center",
      accessor: (tpl) => (
        <Popup
          options={getPopupOptions(tpl, templates?.defaultTemplateInfo)}
          jsx={<Icon icon="ellipsis-v" />}
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <div {...cy} className="cluster-templates-list">
        <TableLoader />
      </div>
    );
  }

  const doTemplatesExist =
    isSuccess &&
    templates.templateInfoList &&
    templates.templateInfoList.length > 0;

  return (
    <div {...cy} className="cluster-templates-list">
      {isError && <ApiError error={error} />}

      {!doTemplatesExist && (
        <>
          <Empty
            icon="document-gear"
            subTitle="There are no cluster templates defined yet"
          />
          <UploadButton
            type="file"
            text="Import template"
            accept="application/json"
            multiple={false}
            onChange={onAddTemplate}
            variant={ButtonVariant.Action}
            disabled={!checkAuthAndRole([Role.CLUSTER_TEMPLATES_WRITE])}
          />
        </>
      )}

      {doTemplatesExist && (
        <Table
          key={templates?.templateInfoList?.length}
          columns={columns}
          data={templates?.templateInfoList}
          canSearch
          isLoading={isLoading}
          sortColumns={[0, 1, 2]}
          actionsJsx={
            <UploadButton
              type="file"
              text="Import template"
              accept="application/json"
              multiple={false}
              onChange={onAddTemplate}
              variant={ButtonVariant.Action}
              disabled={!checkAuthAndRole([Role.CLUSTER_TEMPLATES_WRITE])}
            />
          }
        />
      )}
    </div>
  );
};

export default ClusterTemplatesList;
