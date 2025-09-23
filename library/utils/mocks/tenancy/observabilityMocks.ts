/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { http , HttpResponse} from "msw"
import AlertStore from "../../mocks_new/admin/store/alerts";
import { SharedStorage } from "../../shared-storage/shared-storage";
import AlertDefinitionStore from "./data/alertDefinitions";
import AlertDefinitionTemplateStore from "./data/alertDefinitionTemplates";
import ReceiversStore from "./data/receivers";

const baseURL = "/v1";

const as = new AlertStore();
const ads = new AlertDefinitionStore();
const adts = new AlertDefinitionTemplateStore();
const rs = new ReceiversStore();

const projectName = SharedStorage.project?.name;

// alerts
export const handlers = [
  http.get(`${baseURL}/projects/${projectName}/alerts`, () => {
    return HttpResponse.json(
{ alerts: as.list() },
{status: 200,
});
  }),
  http.get(
    `${baseURL}/projects/${projectName}/alerts/definitions`,
    () => {
      return HttpResponse.json(
{ alertDefinitions: ads.list() },
{status: 200,
});
    },
  ),
  http.get(
    `${baseURL}/projects/${projectName}/alerts/receivers`,
    () => {
      return HttpResponse.json(
{ receivers: rs.list() },
{status: 200,
});
    },
  ),
  http.get(
    `${baseURL}/projects/${projectName}/alerts/definitions/:alertDefinitionId/template`,
    () => {
      const { alertDefinitionId } = params;
      return HttpResponse.json(
adts.get(alertDefinitionId as string),
{status: 200,
});
    },
  ),
  http.patch(
    `${baseURL}/projects/${projectName}/alerts/receivers/:receiverId`,
    () => {
      return HttpResponse.text(
{status: 204,
});
    },
  ),
  http.patch(
    `${baseURL}/projects/${projectName}/alerts/definitions/:alertDefinitionId`,
    () => {
      return HttpResponse.text(
{status: 503,
});
    },
  ),
];
