/*
* SPDX-FileCopyrightText: (C) 2023 Intel Corporation
* SPDX-License-Identifier: Apache-2.0
*/

// SPDX-FileCopyrightText: (C) 2022 Intel Corporation
// SPDX-License-Identifier: Apache-2.0

window.__RUNTIME_CONFIG__ = {
  AUTH: "true",
  KC_URL: "https://keycloak.kind.internal",
  KC_REALM: "master",
  KC_CLIENT_ID: "webui-client",
  SESSION_TIMEOUT: 0,
  OBSERVABILITY_URL: "https://observability-ui.kind.internal",
  DOCUMENTATION_URL: "https://web-ui.kind.internal/",
  DOCUMENTATION: [
    {
      src: "/dashboard",
      dest: "/docs/content/dev_guide/monitor_deployments/monitor_deployment.html",
    },
    {
      src: "/applications/deployments",
      dest: "/docs/content/dev_guide/package_software/deployments.html",
    },
    {
      src: "/applications/deployment/*",
      dest: "/docs/content/dev_guide/package_software/deployment_details.html",
    },
    {
      src: "/applications/deployment/*/cluster/*",
      dest: "/docs/content/dev_guide/package_software/deployment_details.html",
    },
    {
      src: "/applications/setup-deployment",
      dest: "/docs/content/dev_guide/package_software/setup_deploy.html",
    },
    {
      src: "/applications/packages",
      dest: "/docs/content/dev_guide/package_software/deploy_packages.html",
    },
    {
      src: "/applications/packages/create",
      dest: "/docs/content/dev_guide/package_software/add_deploy_pack.htm",
    },
    {
      src: "/applications/packages/import",
      dest: "/docs/content/dev_guide/package_software/import_deployment.html",
    },
    {
      src: "/applications/package/*",
      dest: "/docs/content/dev_guide/package_software/deploy_pack_details.html",
    },
    {
      src: "/applications/packages/edit/*",
      dest: "/docs/content/dev_guide/package_software/edit_deploy_pack.html",
    },
    {
      src: "/applications/packages/clone/*",
      dest: "/docs/content/dev_guide/package_software/clone_applications.html",
    },
    {
      src: "/applications/applications/apps",
      dest: "/docs/content/dev_guide/package_software/applications.html",
    },
    {
      src: "/applications/applications/add",
      dest: "/docs/content/dev_guide/package_software/add_applications.html",
    },
    {
      src: "/applications/application/*",
      dest: "/docs/content/dev_guide/package_software/app_details.html",
    },
    {
      src: "/applications/applications/edit/*",
      dest: "/docs/content/dev_guide/package_software/edit_application.html",
    },
    {
      src: "/applications/applications/extensions",
      dest: "/docs/content/dev_guide/package_software/extensions/deploy_extension_package.html",
    },
    {
      src: "/applications/applications/registries",
      dest: "/docs/content/dev_guide/package_software/registry.html",
    },
    {
      src: "/infrastructure/clusters",
      dest: "/docs/content/dev_guide/set_up_edge_infra/clusters_main",
    },
    {
      src: "/infrastructure/clusters/create",
      dest: "/docs/content/dev_guide/set_up_edge_infra/create_clusters.html",
    },
    {
      src: "/infrastructure/cluster/*",
      dest: "/docs/content/dev_guide/set_up_edge_infra/cluster_details.html",
    },
    {
      src: "/infrastructure/cluster/*/edit",
      dest: "/docs/content/dev_guide/set_up_edge_infra/edit_clusters.html",
    },
    {
      src: "/infrastructure/hosts",
      dest: "/docs/content/dev_guide/set_up_edge_infra/active_hosts.html",
    },
    {
      src: "/infrastructure/host/*",
      dest: "/docs/content/dev_guide/set_up_edge_infra/active_host_details.html",
    },
    { src: "/infrastructure/host/*/edit", dest: "TBD" },
    {
      src: "/infrastructure/unassigned-hosts",
      dest: "/docs/content/dev_guide/set_up_edge_infra/configured_hosts_main.html",
    },
    {
      src: "/infrastructure/unconfigured-hosts",
      dest: "/docs/content/dev_guide/set_up_edge_infra/onboarded_hosts.html",
    },
    {
      src: "/infrastructure/unconfigured-host/*",
      dest: "/docs/content/dev_guide/set_up_edge_infra/onboard_host_details.html",
    },
    {
      src: "/infrastructure/unconfigured-host/configure",
      dest: "/docs/content/dev_guide/set_up_edge_infra/configure_host.html",
    },
    {
      src: "/infrastructure/deauthorized-hosts",
      dest: "/docs/content/dev_guide/set_up_edge_infra/deauthorize_host.html",
    },
    {
      src: "/infrastructure/locations",
      dest: "/docs/content/dev_guide/set_up_edge_infra/location.html",
    },
    {
      src: "/infrastructure/regions/new",
      dest: "/docs/content/dev_guide/set_up_edge_infra/location/add_region.html",
    },
    {
      src: "/infrastructure/regions/*",
      dest: "/docs/content/dev_guide/set_up_edge_infra/location/view_region_detail.html",
    },
    {
      src: "/infrastructure/regions/*/sites/new",
      dest: "/docs/content/dev_guide/set_up_edge_infra/location/add_site.html",
    },
    {
      src: "/admin/alerts",
      dest: "/docs/content/dev_guide/additional_howtos/alerting.html",
    },
    {
      src: "/admin/alert-definitions",
      dest: "/docs/content/dev_guide/additional_howtos/alerts_config.html",
    },
    {
      src: "/admin/cluster-templates",
      dest: "/docs/content/dev_guide/additional_howtos/set_up_a_cluster_template.html",
    },
    {
      src: "/admin/cluster-templates/*/view",
      dest: "/docs/content/dev_guide/additional_howtos/view_cluster_template.html",
    },
    {
      src: "/admin/os-profiles",
      dest: "/docs/content/dev_guide/additional_howtos/gs_os_profile_aws.html",
    },
  ],
  MFE: {
    APP_ORCH: "true",
    FM: "true",
    CLUSTER_ORCH: "true",
    ADMIN: "true",
  },
  TITLE: "Edge Orchestrator",
  API: {
    CATALOG: "https://api.kind.internal",
    ADM: "https://api.kind.internal",
    ARM: "https://api.kind.internal",
    CO: "https://api.kind.internal",
    FM: "https://api.kind.internal",
    MB: "https://api.kind.internal",
    ALERT: "https://web-ui.kind.internal/api",
    LICENSE: "https://license.kind.internal",
    TM: "https://api.kind.internal/",
  },
  VERSIONS: {
    orchestrator: "unknown",
  },
};
