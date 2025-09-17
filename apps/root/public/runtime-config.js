/*
* SPDX-FileCopyrightText: (C) 2023 Intel Corporation
* SPDX-License-Identifier: Apache-2.0
*/

// SPDX-FileCopyrightText: (C) 2022 Intel Corporation
// SPDX-License-Identifier: Apache-2.0

const fqdn = "orch-10-114-181-230.espdqa.infra-host.com";

// common documentation URLs
const documentationUrls = [
  { src: "/dashboard", dest: "/user_guide/monitor_deployments/index.html" },
  { src: "/applications/deployments", dest: "/user_guide/package_software/deployments.html" },
  { src: "/applications/deployment/*", dest: "/user_guide/package_software/deployment_details.html" },
  { src: "/applications/deployment/*/cluster/*", dest: "/user_guide/package_software/deployment_details.html" },
  { src: "/applications/setup-deployment", dest: "/user_guide/package_software/setup_deploy.html" },
  { src: "/applications/packages", dest: "/user_guide/package_software/deploy_packages.html" },
  { src: "/applications/packages/create", dest: "/user_guide/package_software/add_deploy_pack.html" },
  { src: "/applications/packages/import", dest: "/user_guide/package_software/import_deployment.html" },
  { src: "/applications/package/*", dest: "/user_guide/package_software/deploy_pack_details.html" },
  { src: "/applications/packages/edit/*/*/*", dest: "/user_guide/package_software/edit_deploy_pack.html" },
  { src: "/applications/packages/clone/*/*/*", dest: "/user_guide/package_software/clone_applications.html" },
  { src: "/applications/applications/apps", dest: "/user_guide/package_software/applications.html" },
  { src: "/applications/applications/add", dest: "/user_guide/package_software/add_applications.html" },
  { src: "/applications/applications/edit/*/*/*", dest: "/user_guide/package_software/edit_application.html" },
  { src: "/applications/application/*/*/*", dest: "/user_guide/package_software/app_details.html" },
  { src: "/applications/applications/extensions", dest: "/user_guide/package_software/extensions/deploy_extension_package.html" },
  { src: "/applications/applications/registries", dest: "/user_guide/package_software/registry.html" },
  { src: "/infrastructure/host/*", dest: "/user_guide/set_up_edge_infra/active_host_details.html" },
  { src: "/infrastructure/host/*/edit", dest: "/user_guide/set_up_edge_infra/edit_host.html" },
  { src: "/infrastructure/regions/new", dest: "/user_guide/set_up_edge_infra/location/add_region.html" },
  { src: "/infrastructure/regions/*", dest: "/user_guide/set_up_edge_infra/location/view_region_detail.html" },
  { src: "/infrastructure/regions/*/sites/new", dest: "/user_guide/set_up_edge_infra/location/add_site.html" },
  { src: "/admin/os-profiles", dest: "/shared/shared_os_profile.html" },
];

const v3_0_docs = [
  { src: "/admin/ssh-keys", dest: "/user_guide/additional_howtos/configure_ssh_public_keys.html" },
  { src: "/infrastructure/clusters", dest: "/user_guide/set_up_edge_infra/clusters_main.html" },
  { src: "/infrastructure/clusters/create", dest: "/user_guide/set_up_edge_infra/clusters/create_clusters.html" },
  { src: "/infrastructure/cluster/*", dest: "/user_guide/set_up_edge_infra/cluster_details.html" },
  { src: "/infrastructure/cluster/*/edit", dest: "/user_guide/set_up_edge_infra/edit_clusters.html" },
  { src: "/infrastructure/hosts", dest: "/user_guide/set_up_edge_infra/provisioned_hosts_main.html" },
  { src: "/infrastructure/locations", dest: "/user_guide/set_up_edge_infra/location_main.html" },
  { src: "/infrastructure/hosts/provision", dest: "/user_guide/set_up_edge_infra/provision_host.html" },
  { src: "/admin/alerts", dest: "/user_guide/additional_howtos/alerting.html" },
  { src: "/admin/alert-definitions", dest: "/user_guide/additional_howtos/alerts_config.html" },
  { src: "/admin/cluster-templates", dest: "/user_guide/additional_howtos/set_up_a_cluster_template.html" },
  { src: "/admin/cluster-templates/*/*/view", dest: "/user_guide/additional_howtos/view_cluster_template.html" },
  { src: "/admin/about", dest: "/user_guide/additional_howtos/index.html" }
];

const v3_1_docs = [{ src: "/admin/ssh-keys", dest: "/user_guide/advanced_functionality/configure_ssh_public_keys.html" },
{ src: "/infrastructure/clusters", dest: "/user_guide/set_up_edge_infra/clusters/index.html" },
{ src: "/infrastructure/clusters/create", dest: "/user_guide/set_up_edge_infra/clusters/create_clusters.html" },
{ src: "/infrastructure/cluster/*", dest: "/user_guide/set_up_edge_infra/clusters/cluster_details.html" },
{ src: "/infrastructure/cluster/*/edit", dest: "/user_guide/set_up_edge_infra/clusters/edit_clusters.html" },
{ src: "/infrastructure/hosts", dest: "/user_guide/set_up_edge_infra/edge_node_states/index.html" },
{ src: "/infrastructure/locations", dest: "/user_guide/set_up_edge_infra/location/index.html" },
{ src: "/infrastructure/hosts/provision", dest: "/user_guide/set_up_edge_infra/edge_node_onboard/onboarding_actions/provision_host.html" },//verify
{ src: "/admin/alerts", dest: "/user_guide/monitor_deployments/alerts_view.html" },
{ src: "/admin/alert-definitions", dest: "/user_guide/advanced_functionality/alerts_config.html" },
{ src: "/admin/cluster-templates", dest: "/user_guide/advanced_functionality/set_up_a_cluster_template.html" },
{ src: "/admin/cluster-templates/*/*/view", dest: "/user_guide/advanced_functionality/view_cluster_template.html" },
{ src: "/admin/about", dest: "/user_guide/administration/index.html" }];

window.__RUNTIME_CONFIG__ = {
  AUTH: "true",
  KC_URL: `https://keycloak.${fqdn}`,
  KC_REALM: "master",
  KC_CLIENT_ID: "webui-client",
  SESSION_TIMEOUT: 0,
  OBSERVABILITY_URL: `https://observability-ui.${fqdn}`,
  DOCUMENTATION_URL: "https://docs.openedgeplatform.intel.com/edge-manage-docs/main",
  DOCUMENTATION: {
    "3.0": [// 3.0 documentation URLs
      ...documentationUrls,
      ...v3_0_docs
    ],
    "3.1": [// 3.1 documentation URLs
      ...documentationUrls,
      ...v3_1_docs
    ],
    //default
    "main": [
      // main is pointing to latest release URLs.
      // Whenever documentation URL changes update main which acts as default to contain latest release URLs
      ...documentationUrls,
      ...v3_1_docs
    ]
  },
  MFE: {
    APP_ORCH: "true",
    INFRA: "true",
    CLUSTER_ORCH: "true",
    ADMIN: "true",
  },
  TITLE: "Edge Orchestrator",
  API: {
    CATALOG: `https://api.${fqdn}`,
    ADM: `https://api.${fqdn}`,
    ARM: `https://api.${fqdn}`,
    CO: `https://api.${fqdn}`,
    INFRA: `https://api.${fqdn}`,
    MB: `https://api.${fqdn}`,
    ALERT: `https://api.${fqdn}/`,
    TM: `https://api.${fqdn}/`,
    RPS: `https://api.${fqdn}/`,
    MPS: `https://api.${fqdn}/`,
  },
  VERSIONS: {
    orchestrator: "unknown",
  },
};
