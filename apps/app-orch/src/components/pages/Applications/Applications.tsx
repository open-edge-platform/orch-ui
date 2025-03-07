/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Ribbon, setActiveNavItem, setBreadcrumb } from "@orch-ui/components";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Heading, Text } from "@spark-design/react";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  applicationBreadcrumb,
  applicationsNavItem,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import ApplicationTabs from "../../organisms/applications/ApplicationTabs/ApplicationTabs";
import "./Applications.scss";

export const dataCy = "appPage";

const Applications = () => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();
  const breadcrumb = useMemo(() => [homeBreadcrumb, applicationBreadcrumb], []);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(applicationsNavItem));
  }, []);

  return (
    <div className="applications" {...cy}>
      <div className="applications__intro" data-cy="intro">
        <Heading semanticLevel={1} size="l" data-cy="introTitle">
          Applications
        </Heading>
        <Text className="applications__intro__subHeader" data-cy="introContent">
          An application is a single software product that will be deployed as
          part of a package on a host
        </Text>
      </div>

      <div className="applications__ribbon" data-cy="applicationSearch">
        <Ribbon
          onSearchChange={(value) => {
            setSearchParams((prev) => {
              if (value.trim() === "") {
                prev.delete("searchTerm");
              } else {
                prev.set("searchTerm", value);
                prev.set("offset", "0");
              }
              return prev;
            });
          }}
          defaultValue={searchParams.get("searchTerm") ?? ""}
        />
      </div>

      <ApplicationTabs hasPermission={checkAuthAndRole([Role.CATALOG_WRITE])} />
    </div>
  );
};

export default Applications;
