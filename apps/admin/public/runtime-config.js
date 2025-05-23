/*
* SPDX-FileCopyrightText: (C) 2023 Intel Corporation
* SPDX-License-Identifier: Apache-2.0
*/

// SPDX-FileCopyrightText: (C) 2022 Intel Corporation
// SPDX-License-Identifier: Apache-2.0

window.__RUNTIME_CONFIG__ = {
  AUTH: "false",
  KC_URL: "https://keycloak.kind.internal",
  KC_REALM: "master",
  KC_CLIENT_ID: "webui-client",
  SESSION_TIMEOUT: 0,
  OBSERVABILITY_URL: "https://observability-ui.kind.internal",
  MFE: {
    APP_ORCH: "false",
    INFRA: "false",
    CLUSTER_ORCH: "false",
    ADMIN: "true",
  },
  TITLE: "Admin",
  API: {
    CATALOG: "https://app-orch.kind.internal",
    ADM: "https://app-orch.kind.internal",
    ARM: "https://app-orch.kind.internal",
    INFRA: "https://api.kind.internal",
    CO: "https://cluster-orch.kind.internal",
    MB: "https://metadata.kind.internal",
    ALERT: "https://alerting-monitor.kind.internal",
    TM: "https://api.kind.internal",
  },
  VERSIONS: {
    orchestrator: "unknown",
  },
};
