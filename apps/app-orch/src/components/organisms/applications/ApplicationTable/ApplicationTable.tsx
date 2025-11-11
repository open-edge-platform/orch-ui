/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog, CatalogKinds } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  ConfirmationDialog,
  Empty,
  EmptyActionProps,
  Popup,
  PopupOption,
  Ribbon,
  SortDirection,
  SquareSpinner,
  Table,
  TableColumn,
  TextTruncate,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  Direction,
  getFilter,
  getOrder,
  Operator,
  SharedStorage,
} from "@orch-ui/utils";
import { Button, Drawer, Icon, Text, Tooltip } from "@spark-design/react";
import { useCallback, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import { clearApplication } from "../../../../store/reducers/application";
import ApplicationDetailsDrawerContent from "../ApplicationDetailsDrawerContent/ApplicationDetailsDrawerContent";
import "./ApplicationTable.scss";

export interface ApplicationTableAction {
  disable?: boolean;
  text: string;
  action: (item: catalog.Application) => void;
}

interface ApplicationTableProps {
  hasPermission?: boolean;
  kind?: CatalogKinds;
  actions?: ApplicationTableAction[];

  /**
   * This property:
   * when set `false` will display app details of a name field link click on new page.
   * when set `true` will display drawer on the same page with the app details within the drawer.
   **/
  isShownByDrawer?: boolean;
  /** Parent ribbon delivered search key */
  manualSearch?: string;
  hideRibbon?: boolean;
  isDialogOpen?: boolean;

  // for Row Selection
  canSelect?: boolean;
  selectedIds?: string[];
  onSelect?: (
    selectedRowData: catalog.Application,
    isSelected: boolean,
    rowIndex?: number,
  ) => void;
}

const ApplicationTable = ({
  hasPermission,
  kind,
  actions,
  isShownByDrawer = false,
  hideRibbon = false,
  manualSearch,
  isDialogOpen,
  canSelect,
  selectedIds = [],
  onSelect,
}: ApplicationTableProps) => {
  const cy = { "data-cy": "applicationTable" };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [pollingInterval, setPollingInterval] = useState<number>(API_INTERVAL);

  const [drawerFocusApplication, setDrawerFocusApplication] = useState<{
    application?: catalog.Application;
    isDrawerShown: boolean;
  }>({
    isDrawerShown: false,
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  const handleAddApplicationConfirm = () => {
    dispatch(clearApplication());
    navigate("/applications/applications/add", { relative: "path" });
  };

  const columns: TableColumn<catalog.Application>[] = [
    {
      Header: "Name",
      apiName: "name",
      accessor: (item) => item.displayName || item.name,
      Cell: (table: { row: { original: catalog.Application } }) =>
        isShownByDrawer ? (
          <Link
            data-cy={`${table.row.original.name}AppLink`}
            to=""
            onClick={(e) => {
              e.preventDefault();
              setDrawerFocusApplication({
                application: table.row.original,
                isDrawerShown: true,
              });
            }}
          >
            {table.row.original.displayName || table.row.original.name}
          </Link>
        ) : (
          <Link
            to={`/applications/application/${table.row.original.name}/version/${table.row.original.version}`}
          >
            {table.row.original.displayName || table.row.original.name}
          </Link>
        ),
    },
    {
      Header: "Version",
      apiName: "version",
      accessor: (app) => app.version,
    },
    {
      Header: "Chart name",
      apiName: "chartName",
      accessor: (app) => app.chartName,
    },
    {
      Header: "Chart version",
      apiName: "chartVersion",
      accessor: (app) => app.chartVersion,
    },
    {
      Header: "Description",
      apiName: "description",
      accessor: (app) => app.description,
      Cell: (table: { row: { original: catalog.Application } }) => {
        const application = table.row.original;
        return (
          <TextTruncate
            id={`${application.name}-${application.version.replace(".", "_")}`}
            text={application.description ?? "-"}
          />
        );
      },
    },
  ];

  /**
   Passing kinds in request only if particular kind type is required..
   Not passing the kinds field in the request fetches both applications and extensions
   */
  const kindsParam = kind ? { kinds: [kind] } : {};
  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ?? "Name";
  const sortDirection = (searchParams.get("direction") ?? "asc") as Direction;
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const orderBy =
    getOrder(searchParams.get("column"), sortDirection) ?? "name asc";
  const searchTerm = searchParams.get("searchTerm") ?? undefined;

  const {
    data: applicationsData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = catalog.useCatalogServiceListApplicationsQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      orderBy,
      pageSize,
      offset,
      ...kindsParam,
      ...(searchTerm
        ? {
            filter: getFilter<catalog.Application>(
              manualSearch || searchTerm,
              ["name", "version", "chartName", "chartVersion", "description"],
              Operator.OR,
            ),
          }
        : {}),
    },
    { pollingInterval, skip: isDialogOpen || !SharedStorage.project?.name },
  );

  if (actions) {
    columns.push({
      Header: "Action",
      textAlign: "center",
      padding: "0",
      accessor: (item: catalog.Application) => (
        <Popup
          onToggle={(isToggled: boolean) =>
            setPollingInterval(isToggled ? 0 : API_INTERVAL)
          }
          dataCy="appPopup"
          options={actions.map(
            (action): PopupOption => ({
              displayText: action.text,
              disable: action.disable ?? false,
              onSelect: action.action.bind(this, item),
            }),
          )}
          jsx={<Icon icon="ellipsis-v" />}
        />
      ),
    });
  }

  const getEmptyPropActions = () => {
    const emptyDataAction: EmptyActionProps[] = [];
    if (kind === "KIND_NORMAL") {
      // Adding "Add application" action to applications
      emptyDataAction.push({
        action: () => setShowConfirmDialog(true),
        name: `Add ${applicationType}`,
        disable: !hasPermission,
      });
    }
    return emptyDataAction;
  };

  const onSearchChange = (value: string) => {
    setSearchParams((prev) => {
      if (value.trim() === "") {
        prev.delete("searchTerm");
      } else {
        prev.set("searchTerm", value);
        prev.set("offset", "0");
      }
      return prev;
    });
  };

  const applicationType =
    kind === "KIND_EXTENSION" ? "extensions" : "applications";

  const newApplicationButtonJsx = !hideRibbon ? (
    // If permission exist show button or show tooltip on the button
    hasPermission ? (
      <Button
        data-cy="newAppRibbonButton"
        onPress={() => {
          console.log("pressed");
          setShowConfirmDialog(true);
        }}
        isDisabled={!hasPermission}
      >
        Add Application
      </Button>
    ) : (
      <Tooltip
        icon={<Icon icon="lock" />}
        content="The users with 'View Only' access can mostly view the data and do few of the Add/Edit operations."
        placement="left"
        className="text-wrap-balance"
      >
        <Button
          data-cy="newAppRibbonButton"
          onPress={() => {
            console.log("pressed");
            setShowConfirmDialog(true);
          }}
          isDisabled={!hasPermission}
        >
          Add Application
        </Button>
      </Tooltip>
    )
  ) : undefined;

  const memoTable = useCallback(
    (applicationsData: catalog.ListApplicationsResponseRead) => (
      <Table
        // Basic table data
        key="applications-table"
        columns={columns}
        data={applicationsData.applications}
        totalOverallRowsCount={applicationsData.totalElements}
        initialState={{
          pageSize,
          pageIndex: Math.floor(offset / pageSize),
        }}
        initialSort={{
          column: sortColumn,
          direction: sortDirection,
        }}
        // Pagination
        isServerSidePaginated
        canPaginate
        onChangePage={(index) => {
          setSearchParams((prev) => {
            prev.set("offset", (index * pageSize).toString());
            return prev;
          });
        }}
        onChangePageSize={(size) => {
          setSearchParams((prev) => {
            prev.set("pageSize", size.toString());
            prev.set("offset", "0");
            return prev;
          });
        }}
        // Sorting
        sortColumns={[0, 1, 2, 3, 4]}
        onSort={(column: string, direction: SortDirection) => {
          setSearchParams((prev) => {
            if (direction) {
              const apiName = columnDisplayNameToApiName(columns, column);

              if (apiName) {
                prev.set("column", apiName);
                prev.set("direction", direction);
              }
            } else {
              prev.delete("column");
              prev.delete("direction");
            }
            return prev;
          });
        }}
        // Row Selection
        canSelectRows={canSelect}
        getRowId={(row) => `${row.name}@${row.version}`}
        selectedIds={selectedIds}
        onSelect={onSelect}
        isLoading={isLoading}
        // Searching
        canSearch={!hideRibbon}
        searchTerm={!hideRibbon && manualSearch ? searchTerm : undefined}
        onSearch={onSearchChange}
        actionsJsx={newApplicationButtonJsx}
      />
    ),
    [applicationsData],
  );
  const getApplicationsTable = () => {
    if (isError) {
      return <ApiError error={error} />;
    } else if (isLoading) {
      return <SquareSpinner />;
    } else if (
      !applicationsData ||
      applicationsData.applications.length === 0
    ) {
      return (
        <>
          {!hideRibbon && (
            <Ribbon
              onSearchChange={onSearchChange}
              defaultValue={searchParams.get("searchTerm") ?? ""}
              customButtons={newApplicationButtonJsx}
            />
          )}
          <Empty
            icon="cube-detached"
            title={`There are no ${applicationType} currently available.`}
            subTitle={
              kind === "KIND_NORMAL"
                ? "To add, and deploy applications, select Add Applications."
                : ""
            }
            actions={getEmptyPropActions()}
          />
        </>
      );
    } else {
      return memoTable(applicationsData);
    }
  };

  return (
    <div {...cy}>
      <div className="application-table">{getApplicationsTable()}</div>

      {isSuccess && applicationsData.applications.length > 0 && (
        <Drawer
          show={drawerFocusApplication.isDrawerShown}
          bodyContent={
            <>
              {drawerFocusApplication.application && (
                <ApplicationDetailsDrawerContent
                  application={drawerFocusApplication.application}
                />
              )}
              {!drawerFocusApplication.application && (
                <Text style={{ fontStyle: "italic" }} isDisabled>
                  Please select one application from the Application table.
                </Text>
              )}
            </>
          }
          onHide={() => {
            setDrawerFocusApplication({
              isDrawerShown: false,
              application: undefined,
            });
          }}
          headerProps={{
            closable: true,
            onHide: () => {
              setDrawerFocusApplication({
                isDrawerShown: false,
                application: undefined,
              });
            },
            title: drawerFocusApplication.application
              ? (drawerFocusApplication.application.displayName ??
                drawerFocusApplication.application.name)
              : "No Application selected",
          }}
          backdropIsVisible
          backdropClosable
        />
      )}

      {showConfirmDialog && (
        <ConfirmationDialog
          isOpen={true}
          title="Confirm Navigation"
          content="You will be moved to the application creation stepper. You will lose your current progress in the deployment package creation process. Do you want to continue to add a new application?"
          confirmBtnText="Continue"
          cancelBtnText="Cancel"
          confirmCb={handleAddApplicationConfirm}
          cancelCb={() => setShowConfirmDialog(false)}
        />
      )}
    </div>
  );
};

export default ApplicationTable;
