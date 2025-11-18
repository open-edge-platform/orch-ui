/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Empty, MetadataForm, MetadataPair } from "@orch-ui/components";
import { Button, Drawer } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import "./FiltersDrawer.scss";

interface FiltersDrawerProps {
  show: boolean;
  filters: MetadataPair[];
  onApply: (metadataPairs: MetadataPair[]) => void;
  onClose: () => void;
}

const FiltersDrawer = ({
  show,
  filters,
  onApply,
  onClose,
}: FiltersDrawerProps) => {
  const [currentFilters, setCurrentFilters] = useState<MetadataPair[]>(filters);
  const [showFilters, setShowFilters] = useState(false);
  const [hasFormErrors, setHasFormErrors] = useState(false);

  const noFilters = currentFilters.length === 0;

  if (!showFilters && !noFilters) {
    setShowFilters(true);
  }

  useEffect(() => {
    if (filters.length === 0) {
      setCurrentFilters([]);
      setShowFilters(false);
    }
  }, [filters]);

  const filtersContent = useMemo(
    () => (
      <MetadataForm
        pairs={filters}
        onUpdate={(metadataPairs: MetadataPair[]) => {
          setCurrentFilters(() => metadataPairs);
        }}
        hasError={(isError: boolean) => {
          setHasFormErrors(isError);
        }}
        allowDuplicateKeys={true}
      />
    ),
    [filters],
  );

  const welcomeContent = (
    <Empty
      dataCy="empty"
      icon="filter"
      subTitle="No deployment metadata is selected for filtering."
      actions={[
        {
          action: () => setShowFilters(() => true),
          name: "Add Metadata",
        },
      ]}
    />
  );

  const handleClose = () => {
    onClose();
    if (noFilters) {
      setShowFilters(false);
    }
  };

  return (
    <>
      {createPortal(
        <Drawer
          show={show}
          backdropIsVisible={false}
          headerProps={{
            title: "Filter by Deployment Metadata",
            subTitle: "",
            onHide: handleClose,
          }}
          bodyContent={showFilters ? filtersContent : welcomeContent}
          footerContent={
            <div className="filtersDrawerButtons">
              <Button
                size={ButtonSize.Large}
                variant={ButtonVariant.Secondary}
                onPress={() => {
                  setCurrentFilters(() => filters);
                  handleClose();
                }}
                data-cy="buttonClose"
              >
                Close
              </Button>
              <Button
                size={ButtonSize.Large}
                variant={ButtonVariant.Secondary}
                isDisabled={!showFilters || noFilters}
                onPress={() => {
                  setCurrentFilters(() => []);
                  setShowFilters(false);
                }}
                data-cy="buttonClear"
              >
                Clear All Filters
              </Button>
              <Button
                size={ButtonSize.Large}
                variant={ButtonVariant.Action}
                isDisabled={hasFormErrors || noFilters}
                onPress={() => {
                  onApply(currentFilters);
                  handleClose();
                }}
                data-cy="buttonApply"
              >
                Apply
              </Button>
            </div>
          }
          data-cy="drawerContent"
        />,
        document.body,
      )}
    </>
  );
};

export default FiltersDrawer;
