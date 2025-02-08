/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Button, Heading } from "@spark-design/react";
import { ButtonSize } from "@spark-design/tokens";
import { Link } from "react-router-dom";
import "./PermissionDenied.scss";

export const PermissionDenied = () => {
  return (
    <div data-cy={"permissionDenied"} className="permission-denied">
      <div className="permission-denied__container">
        <Heading semanticLevel={1}>Permission Denied</Heading>
        <p>You don't have permission to see this page.</p>

        <Link to="/">
          <Button size={ButtonSize.Large}>Home</Button>
        </Link>
      </div>
    </div>
  );
};
