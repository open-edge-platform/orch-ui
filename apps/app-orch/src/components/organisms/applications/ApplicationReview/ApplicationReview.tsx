/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { useAppSelector } from "../../../../store/hooks";
import { selectApplication } from "../../../../store/reducers/application";

const ApplicationReview = () => {
  const application = useAppSelector(selectApplication);

  return (
    <table data-cy="appReview">
      <tbody>
        <tr>
          <td>Display Name</td>
          <td>{application.displayName}</td>
        </tr>
        <tr>
          <td>Version</td>
          <td>{application.version}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{application.description}</td>
        </tr>
        <tr>
          <td>Helm Registry</td>
          <td>{application.helmRegistryName}</td>
        </tr>
        <tr>
          <td>Chart Name</td>
          <td>{application.chartName}</td>
        </tr>
        <tr>
          <td>Chart Version</td>
          <td>{application.chartVersion}</td>
        </tr>
        <tr>
          <td>Image Registry</td>
          <td>{application.imageRegistryName}</td>
        </tr>
      </tbody>
    </table>
  );
};
export default ApplicationReview;
