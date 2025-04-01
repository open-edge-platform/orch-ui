/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { catalog } from "@orch-ui/apis";
import {
  Empty,
  setActiveNavItem,
  setBreadcrumb,
  SquareSpinner,
} from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Button } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  applicationBreadcrumb,
  applicationsNavItem,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import ApplicationDetailsMain from "../../organisms/applications/ApplicationDetailsMain/ApplicationDetailsMain";
import "./ApplicationDetails.scss";

type params = {
  appName: string;
  version: string;
};

const ApplicatinDetails = () => {
  const dispatch = useAppDispatch();
  const { appName, version } = useParams<keyof params>();
  const navigate = useNavigate();

  const [registryName, setRegistryName] = useState<string>();
  const [dockerRegistryName, setDockerRegistryName] = useState<string>();
  const projectName = SharedStorage.project?.name ?? "";
  const { data, isLoading, isError, isSuccess } =
    catalog.useCatalogServiceGetApplicationQuery(
      {
        projectName,
        applicationName: appName!,
        version: version!,
      },
      { skip: !appName || !version || !projectName },
    );

  const { data: registry } = catalog.useCatalogServiceGetRegistryQuery(
    {
      projectName,
      registryName: registryName!,
    },
    { skip: !registryName || !projectName },
  );

  // To fetch docker image registry details
  const { data: dockerRegistry } = catalog.useCatalogServiceGetRegistryQuery(
    {
      projectName,
      registryName: dockerRegistryName!,
    },
    { skip: !dockerRegistryName || !projectName },
  );

  useEffect(() => {
    setRegistryName(data?.application.helmRegistryName ?? "");
    setDockerRegistryName(data?.application.imageRegistryName ?? "");
  }, [data]);

  useEffect(() => {
    if (appName) {
      const breadcrumb = [
        homeBreadcrumb,
        applicationBreadcrumb,
        {
          text: appName,
          link: `/applications/application/${appName}/version/${version}`,
        },
      ];
      dispatch(setBreadcrumb(breadcrumb));
    }
    dispatch(setActiveNavItem(applicationsNavItem));
  }, [appName]);

  return (
    <div className="application-details" data-cy="appDetailsPage">
      {isSuccess && data.application && (
        <ApplicationDetailsMain
          app={data.application}
          registry={registry?.registry}
          dockerRegistry={dockerRegistry?.registry}
        />
      )}
      {isLoading && <SquareSpinner message="One moment..." dataCy="loading" />}
      {isError && (
        <Empty
          icon="cross"
          title="Failed at fetching application details"
          dataCy="empty"
        />
      )}
      <div className="application-details__footer">
        <Button
          className="application-details__back-button"
          onPress={() =>
            data?.application.kind === "KIND_EXTENSION"
              ? navigate("/applications/applications/extensions")
              : navigate("/applications/applications")
          }
          size={ButtonSize.Large}
          data-cy="backAppsBtnBottom"
          variant={ButtonVariant.Secondary}
        >
          Back to Applications
        </Button>
      </div>
    </div>
  );
};

export default ApplicatinDetails;
