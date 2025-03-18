/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { ConfirmationDialog, RibbonButtonProps } from "@orch-ui/components";
import {
  Button,
  Icon,
  Item,
  Tabs,
  Toast,
  ToastProps,
  Tooltip,
} from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  checkAuthAndRole,
  parseError,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { useAppDispatch } from "../../../../store/hooks";
import {
  clearApplication,
  setApplication,
} from "../../../../store/reducers/application";
import { setProps } from "../../../../store/reducers/toast";
import ApplicationAddRegistryDrawer from "../ApplicationAddRegistryDrawer/ApplicationAddRegistryDrawer";
import ApplicationTable from "../ApplicationTable/ApplicationTable";
import AvailableRegistriesTable, {
  DeleteRegistryState,
} from "../AvailableRegistriesTable/AvailableRegistriesTable";
import "./ApplicationTabs.scss";

const dataCy = "applicationTabs";

interface ApplicationTabsProps {
  hasPermission?: boolean;
}

const ApplicationTabs = ({ hasPermission = false }: ApplicationTabsProps) => {
  const toastProps: ToastProps = {
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    duration: 3000,
    position: ToastPosition.TopRight,
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const activePath = location.pathname;

  const [isAddRegistryDrawerOpen, setIsAddRegistryDrawerOpen] =
    useState<boolean>(false);
  const [editRegistryData, setEditRegistry] = useState<
    catalog.Registry | undefined
  >();
  const [deleteRegistryData, setDeleteRegistry] = useState<
    DeleteRegistryState | undefined
  >();
  const [appToDelete, setAppToDelete] =
    useState<catalog.ApplicationReference>();
  const [isAppDeleteModalOpen, setIsAppDeleteModalOpen] = useState(false);
  const [deleteApplication] =
    catalog.useCatalogServiceDeleteApplicationMutation();

  const deleteApp = (name: string, version: string) => {
    deleteApplication({
      projectName: SharedStorage.project?.name ?? "",
      applicationName: name,
      version: version,
    })
      .unwrap()
      .then(() => {
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Success,
            message: "Application Successfully removed",
            visibility: ToastVisibility.Show,
          }),
        );
        navigate("/applications/applications");
      })
      .catch((err) => {
        const errorObj = parseError(err);

        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Danger,
            message: errorObj.data,
            visibility: ToastVisibility.Show,
          }),
        );
      });
    setIsAppDeleteModalOpen(false);
  };

  const [deleteRegistry] = catalog.useCatalogServiceDeleteRegistryMutation();

  const getActiveTabIndex = () => {
    if (activePath.includes("registries")) {
      return 2; // registries tab
    } else if (activePath.includes("extensions")) {
      return 1; // extensions tab
    } else return 0; // applicationsTab
  };

  // Application Tab Configurations
  const [tabIndex, setTabIndex] = useState<number>(getActiveTabIndex());
  const tabAddButtonDetails: RibbonButtonProps[] = [
    {
      text: "Add Application",
      dataCy: "addApplicationButton",
      disable: !hasPermission,
      tooltip: hasPermission
        ? ""
        : "The users with 'View Only' access can mostly view the data and do few of the Add/Edit operations.",
      tooltipIcon: "lock",
      tooltipPlacement: "left",
      onPress: () => {
        dispatch(clearApplication());
        navigate("./add", { relative: "path" });
      },
    },
    {
      text: "Add Extensions",
      hide: true, // As the existing logic reads active add button from tabIndex, Empty object is added for tabIndex = 1 to avoid rendering any buttons in extensions
    },
    {
      text: "Add a Registry",
      dataCy: "addRegistryButton",
      disable: !hasPermission,
      tooltip: hasPermission
        ? ""
        : "The users with 'View Only' access can mostly view the data and do few of the Add/Edit operations.",
      tooltipIcon: "lock",
      tooltipPlacement: "left",
      onPress: () => {
        setIsAddRegistryDrawerOpen(true);
      },
    },
  ];

  const activeAddButton = tabAddButtonDetails[tabIndex];

  // Applications Actions
  const appTableActions = [
    {
      text: "View Details",
      action: (item: catalog.Application) => {
        navigate(`../application/${item.name}/version/${item.version}`);
      },
    },
    {
      text: "Edit",
      disable: !checkAuthAndRole([Role.CATALOG_WRITE]),
      action: (item: catalog.Application) => {
        dispatch(setApplication(item));
        navigate(`edit/${item.name}/version/${item.version}`);
      },
    },
    {
      text: "Delete",
      disable: !checkAuthAndRole([Role.CATALOG_WRITE]),
      action: (app: catalog.Application) => {
        setAppToDelete({
          name: app.name,
          version: app.version,
        });
        setIsAppDeleteModalOpen(true);
      },
    },
  ];

  // Applications Actions
  const extensionTableActions = [
    {
      text: "View Details",
      action: (item: catalog.Application) => {
        navigate(`../application/${item.name}/version/${item.version}`);
      },
    },
  ];

  // Application Registry Actions
  const editRegistryFn = (registry: catalog.Registry) => {
    setEditRegistry(registry);
    setIsAddRegistryDrawerOpen(true);
  };
  const deleteRegistryFn = (registry: catalog.Registry) => {
    deleteRegistry({
      projectName: SharedStorage.project?.name ?? "",
      registryName: registry.name,
    })
      .unwrap()
      .then(() => {
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Success,
            message: "Application Registry is successfully deleted",
            visibility: ToastVisibility.Show,
          }),
        );
        if (deleteRegistryData?.onDeleteSuccess)
          deleteRegistryData.onDeleteSuccess();
      })
      .catch((err) => {
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Danger,
            message: `Error: ${parseError(err).data}`,
            visibility: ToastVisibility.Show,
          }),
        );
      });
  };

  const renderDeleteConfirmationModal = () => {
    return (
      <ConfirmationDialog
        title="Confirm Application Deletion"
        subTitle={`This will delete ${
          appToDelete?.name && appToDelete.version
            ? ` "${appToDelete?.name}@${appToDelete.version}"`
            : ""
        } application.`}
        content="Are you sure you want to proceed?"
        buttonPlacement="left-reverse"
        isOpen
        confirmCb={() => {
          if (appToDelete) {
            deleteApp(appToDelete.name, appToDelete.version);
          }
          setIsAppDeleteModalOpen(false);
        }}
        data-cy="deleteModal"
        confirmBtnText="Delete"
        confirmBtnVariant={ButtonVariant.Alert}
        cancelCb={() => setIsAppDeleteModalOpen(false)}
      />
    );
  };

  return (
    <div data-cy={dataCy} className="application-tabs">
      {/** TODO: `.add-button-container` Copied from button component in shared/Ribbon.tsx  */}
      <div className="add-button-container">
        {!activeAddButton.hide &&
          (activeAddButton.tooltip ? (
            <div className="add-button-container__button">
              <Tooltip
                placement={
                  activeAddButton.tooltipPlacement || activeAddButton.disable
                    ? "left"
                    : "top"
                }
                content={activeAddButton.tooltip}
                data-cy="buttonTooltip"
                icon={
                  activeAddButton.tooltipIcon && (
                    <Icon
                      artworkStyle="solid"
                      icon={activeAddButton.tooltipIcon}
                    />
                  )
                }
              >
                {activeAddButton.iconOnly ? (
                  <Button
                    className="add-button-container__button"
                    isDisabled={activeAddButton.disable}
                    aria-label="action button"
                    onPress={() => {
                      if (activeAddButton.onPress) {
                        activeAddButton.onPress();
                      }
                    }}
                    variant={activeAddButton.variant}
                    data-cy={activeAddButton.dataCy ?? "button"}
                    size={ButtonSize.Large}
                    iconOnly
                  >
                    <Icon icon={activeAddButton.icon} />
                  </Button>
                ) : (
                  <Button
                    isDisabled={activeAddButton.disable}
                    aria-label="action button"
                    onPress={() => {
                      if (activeAddButton.onPress) {
                        activeAddButton.onPress();
                      }
                    }}
                    variant={activeAddButton.variant}
                    data-cy={activeAddButton.dataCy ?? "button"}
                    size={ButtonSize.Large}
                  >
                    {activeAddButton.text}
                  </Button>
                )}
              </Tooltip>
            </div>
          ) : activeAddButton.iconOnly ? (
            <Button
              className="add-button-container__button"
              isDisabled={activeAddButton.disable}
              aria-label="action button"
              onPress={() => {
                if (activeAddButton.onPress) {
                  activeAddButton.onPress();
                }
              }}
              variant={activeAddButton.variant}
              data-cy={activeAddButton.dataCy ?? "button"}
              size={ButtonSize.Large}
              iconOnly
            >
              <Icon icon={activeAddButton.icon} />
            </Button>
          ) : (
            <Button
              className="add-button-container__button"
              isDisabled={activeAddButton.disable}
              aria-label="action button"
              onPress={() => {
                if (activeAddButton.onPress) {
                  activeAddButton.onPress();
                }
              }}
              variant={activeAddButton.variant}
              data-cy={activeAddButton.dataCy ?? "button"}
              size={ButtonSize.Large}
            >
              {activeAddButton.text}
            </Button>
          ))}
      </div>

      <Tabs
        onSelectionChange={(key) => {
          const index = key.toString().split(".")[1];
          switch (index) {
            case "0":
              navigate("./apps", { relative: "path" });
              break;
            case "1":
              navigate("./extensions", { relative: "path" });
              break;
            case "2":
              navigate("./registries", { relative: "path" });
              break;
          }
          setTabIndex(parseInt(index));
        }}
        isCloseable={false}
        selectedKey={`$.${getActiveTabIndex()}`}
      >
        <Item title="Applications">
          <div className="application-table-content" data-cy="appTableContent">
            <ApplicationTable
              hasPermission={checkAuthAndRole([Role.CATALOG_WRITE])}
              hideRibbon
              actions={appTableActions}
              isDialogOpen={isAppDeleteModalOpen && tabIndex === 0}
              kind={"KIND_NORMAL"}
            />
            {isAppDeleteModalOpen &&
              tabIndex === 0 &&
              renderDeleteConfirmationModal()}
          </div>
        </Item>
        <Item title="Extensions">
          <div
            className="application-table-content"
            data-cy="appExtensionsContent"
          >
            <ApplicationTable
              hasPermission={checkAuthAndRole([Role.CATALOG_WRITE])}
              hideRibbon
              actions={extensionTableActions}
              isDialogOpen={isAppDeleteModalOpen && tabIndex === 1}
              kind={"KIND_EXTENSION"}
            />
          </div>
        </Item>
        <Item title="Registries">
          <div
            className="application-registry-table-content"
            data-cy="registryTableContent"
          >
            <AvailableRegistriesTable
              hasPermission={checkAuthAndRole([Role.CATALOG_WRITE])}
              hideRibbon
              onAdd={() => {
                if (activeAddButton.onPress) {
                  activeAddButton.onPress();
                }
              }}
              onEdit={editRegistryFn}
              onDelete={({ registry, onDeleteSuccess }) => {
                setDeleteRegistry({
                  registry,
                  onDeleteSuccess,
                });
              }}
            />
          </div>
        </Item>
      </Tabs>

      {tabIndex === 2 /*if selected tab is Available Registry*/ && (
        <ApplicationAddRegistryDrawer
          isDrawerOpen={isAddRegistryDrawerOpen}
          setIsDrawerOpen={(isOpen: boolean) => {
            setIsAddRegistryDrawerOpen(isOpen);
            if (!isOpen) setEditRegistry(undefined);
          }}
          editRegistryData={editRegistryData}
        />
      )}

      {deleteRegistryData && (
        <div data-cy="deleteConfirmationDialog">
          <ConfirmationDialog
            title="Confirm Application Registry Deletion"
            subTitle={`This will delete Registry "${deleteRegistryData.registry.name}"?`}
            content="Are you sure you want to proceed?"
            isOpen={deleteRegistryData && true}
            confirmCb={() => {
              deleteRegistryFn(deleteRegistryData.registry);
              setDeleteRegistry(undefined);
            }}
            confirmBtnText="Delete"
            confirmBtnVariant={ButtonVariant.Alert}
            cancelCb={() => setDeleteRegistry(undefined)}
          />
        </div>
      )}

      <Toast
        {...toastProps}
        onHide={() =>
          setProps({ ...toastProps, visibility: ToastVisibility.Hide })
        }
      />
    </div>
  );
};

export default ApplicationTabs;
