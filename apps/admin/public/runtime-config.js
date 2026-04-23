/*
* SPDX-FileCopyrightText: (C) 2023 Intel Corporation
* SPDX-License-Identifier: Apache-2.0
*/

// SPDX-FileCopyrightText: (C) 2022 Intel Corporation
// SPDX-License-Identifier: Apache-2.0

window.__RUNTIME_CONFIG__ = {
  AUTH: "false",
  KC_URL: "https://keycloak.orch-10-114-181-220.espdqa.infra-host.com",
  KC_REALM: "master",
  KC_CLIENT_ID: "webui-client",
  SESSION_TIMEOUT: 0,
  OBSERVABILITY_URL: "https://observability-ui.orch-10-114-181-220.espdqa.infra-host.com",
  MFE: {
    APP_ORCH: "false",
    INFRA: "false",
    CLUSTER_ORCH: "false",
    ADMIN: "true",
  },
  TITLE: "Admin",
  API: {
    CATALOG: "https://app-orch.orch-10-114-181-220.espdqa.infra-host.com",
    ADM: "https://app-orch.orch-10-114-181-220.espdqa.infra-host.com",
    ARM: "https://app-orch.orch-10-114-181-220.espdqa.infra-host.com",
    INFRA: "https://api.orch-10-114-181-220.espdqa.infra-host.com",
    CO: "https://cluster-orch.orch-10-114-181-220.espdqa.infra-host.com",
    MB: "https://metadata.orch-10-114-181-220.espdqa.infra-host.com",
    ALERT: "https://alerting-monitor.orch-10-114-181-220.espdqa.infra-host.com",
    TM: "https://api.orch-10-114-181-220.espdqa.infra-host.com",
  },
  VERSIONS: {
    orchestrator: "unknown",
  },
};
