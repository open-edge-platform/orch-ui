/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ctm } from "@orch-ui/apis";
import { BaseStore } from "../baseStore";
import {
  clusterTemplateFiveName,
  clusterTemplateFiveV1Info,
  clusterTemplateFiveV2Info,
  clusterTemplateFiveV3Info,
  clusterTemplateFiveV4Info,
  clusterTemplateFourName,
  clusterTemplateFourV1Info,
  clusterTemplateFourV2Info,
  clusterTemplateOneName,
  clusterTemplateOneV1Info,
  clusterTemplateOneV2Info,
  clusterTemplateOneV3Info,
  clusterTemplateThreeName,
  clusterTemplateThreeV1Info,
  clusterTemplateTwoName,
  clusterTemplateTwoV1Info,
  clusterTemplateTwoV2Info,
} from "./data/clusterOrchIds";

export const selectClusterOneV1 = `${clusterTemplateOneName}-${clusterTemplateOneV1Info.version}`;
export const selectClusterTwoV1 = `${clusterTemplateTwoName}-${clusterTemplateTwoV1Info.version}`;
export const selectClusterThreeV1 = `${clusterTemplateThreeName}-${clusterTemplateThreeV1Info.version}`;
export const selectClusterFourV1 = `${clusterTemplateFourName}-${clusterTemplateFourV1Info.version}`;
export const selectClusterFiveV1 = `${clusterTemplateFiveName}-${clusterTemplateFiveV1Info.version}`;

export const clusterTemplateOneV1: ctm.TemplateInfo = {
  id: clusterTemplateOneV1Info.id,
  name: clusterTemplateOneName,
  version: clusterTemplateOneV1Info.version,
  description: "example description 1",
  clustertype: "rke2",
  providertype: "Rancher",
  clusterconfiguration: {
    rke2: {
      apiVersion: "provisioning.cattle.io/v1",
      kind: "Cluster",
      metadata: {
        finalizers: [
          "wrangler.cattle.io/cloud-config-secret-remover",
          "wrangler.cattle.io/provisioning-cluster-remove",
          "wrangler.cattle.io/rke-cluster-remove",
        ],
        labels: {
          cpumanager: "true",
        },
        generation: 1,
        managedFields: null,
        name: "lp-app-cluster",
        namespace: "fleet-default",
      },
      spec: {
        kubernetesVersion: "v1.26.8+rke2r1",
        localClusterAuthEndpoint: {},
        rkeConfig: {
          chartValues: {
            "rke2-calico": {
              installation: {
                calicoNetwork: {
                  nodeAddressAutodetectionV4: {
                    kubernetes: "NodeInternalIP",
                  },
                },
              },
            },
            "rke2-coredns": {
              resources: {
                limits: {
                  cpu: "250m",
                },
                requests: {
                  cpu: "250m",
                },
              },
            },
          },
          etcd: {
            snapshotRetention: 5,
            snapshotScheduleCron: "0 */5 * * *",
          },
          machineGlobalConfig: {
            cni: "multus,calico",
            "disable-kube-proxy": false,
            "etcd-expose-metrics": false,
            "kube-apiserver-arg": ["feature-gates=DownwardAPIHugePages=true"],
            "etcd-arg": [
              "cipher-suites=[TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_AES_256_GCM_SHA384,TLS_AES_128_GCM_SHA256,TLS_CHACHA20_POLY1305_SHA256]",
            ],
            profile: null,
          },
          machineSelectorConfig: [
            {
              config: {
                "kubelet-arg": [
                  "feature-gates=TopologyManager=true",
                  "topology-manager-policy=best-effort",
                  "cpu-manager-policy=static",
                  "reserved-cpus=1",
                  "max-pods=250",
                  "tls-cipher-suites=TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256",
                ],
                "protect-kernel-defaults": true,
              },
            },
          ],
          registries: {
            mirrors: {
              "cr.fluentbit.io": {
                endpoint: ["amr-registry.caas.intel.com"],
              },
              "docker.elastic.co": {
                endpoint: ["amr-registry.caas.intel.com"],
              },
              "docker.io": {
                endpoint: ["amr-registry.caas.intel.com"],
              },
              "ghcr.io": {
                endpoint: ["amr-registry.caas.intel.com"],
              },
              "k8s.gcr.io": {
                endpoint: ["amr-registry.caas.intel.com"],
              },
              "quay.io": {
                endpoint: ["amr-registry.caas.intel.com"],
              },
              "registry.k8s.io": {
                endpoint: ["amr-registry.caas.intel.com"],
              },
            },
          },
          upgradeStrategy: {
            controlPlaneConcurrency: "1",
            controlPlaneDrainOptions: {
              deleteEmptyDirData: true,
              disableEviction: false,
              enabled: false,
              force: false,
              gracePeriod: -1,
              ignoreDaemonSets: true,
              postDrainHooks: null,
              preDrainHooks: null,
              skipWaitForDeleteTimeoutSeconds: 0,
              timeout: 120,
            },
            workerConcurrency: "1",
            workerDrainOptions: {
              deleteEmptyDirData: true,
              disableEviction: false,
              enabled: false,
              force: false,
              gracePeriod: -1,
              ignoreDaemonSets: true,
              postDrainHooks: null,
              preDrainHooks: null,
              skipWaitForDeleteTimeoutSeconds: 0,
              timeout: 120,
            },
          },
        },
      },
    },
  },
};

export const clusterTemplateOneV2: ctm.TemplateInfo = {
  id: clusterTemplateOneV2Info.id,
  name: clusterTemplateOneName,
  version: clusterTemplateOneV2Info.version,
  description: "Lorem ipsum dolor sit amet",
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: {
      status: "disabled",
      name: {
        first: "Jayde",
        middle: "Gray",
        last: "Prosacco",
      },
      username: "Jayde-Prosacco",
      password: "OcUpus19RgBnZao",
      emails: ["Graciela_Considine70@example.com", "Benton21@example.com"],
      phoneNumber: "922.353.3184 x809",
      location: {
        street: "73715 Cesar Stravenue",
        city: "Botsfordfort",
        state: "New Mexico",
        country: "Bahrain",
        zip: "21424",
        coordinates: {
          latitude: 61.3622,
          longitude: -37.7982,
        },
      },
      uuid: "dac13de6-1846-4743-b255-91a1455843b1",
      objectId: "65aa6476ceb0375e468d7a5b",
    },
  },
};

const clusterTemplateOneV3: ctm.TemplateInfo = {
  id: clusterTemplateOneV3Info.id,
  name: clusterTemplateOneName,
  version: clusterTemplateOneV3Info.version,
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: {
      status: "active",
      name: {
        first: "Amina",
        middle: "Bailey",
        last: "Terry",
      },
      username: "Amina-Terry",
      password: "W78jwyZmIFXv2Wn",
      emails: ["Adrien_Hackett@example.com", "Clarabelle30@example.com"],
      phoneNumber: "1-222-755-4409",
      location: {
        street: "994 Beer Fort",
        city: "Jesusfield",
        state: "North Carolina",
        country: "Turkey",
        zip: "62677-1338",
        coordinates: {
          latitude: 75.6856,
          longitude: 143.0378,
        },
      },
      uuid: "2778b8b4-560a-44ee-906d-8df939ca7b47",
      objectId: "65aa6488ceb0375e468d7a5c",
    },
  },
};

export const clusterTemplateTwoV1: ctm.TemplateInfo = {
  id: clusterTemplateTwoV1Info.id,
  name: clusterTemplateTwoName,
  version: clusterTemplateTwoV1Info.version,
  description: "Vivamus aliquam dolor nec aliquet",
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: {
      status: "active",
      name: {
        first: "Carlos",
        middle: "Kennedy",
        last: "Wisozk",
      },
      username: "Carlos-Wisozk",
      password: "dZVTEbed07gjBIt",
      emails: ["Enos_Smith@gmail.com", "Lilliana_Denesik@gmail.com"],
      phoneNumber: "664-854-9263 x4445",
      location: {
        street: "40533 Ratke Extension",
        city: "New Jesse",
        state: "West Virginia",
        country: "French Guiana",
        zip: "80953",
        coordinates: {
          latitude: 41.1387,
          longitude: 154.1501,
        },
      },
      uuid: "584da684-9fb4-4dbd-990e-792e02405602",
      objectId: "65aa6493ceb0375e468d7a5d",
    },
  },
};

const clusterTemplateTwoV2: ctm.TemplateInfo = {
  id: clusterTemplateTwoV2Info.id,
  name: clusterTemplateTwoName,
  version: clusterTemplateTwoV2Info.version,
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: {
      status: "active",
      name: {
        first: "Derek",
        middle: "Shiloh",
        last: "Brown",
      },
      username: "Derek-Brown",
      password: "R0JrC6v5BKailbH",
      emails: ["Jaren.Hackett94@example.com", "Junius.Kovacek86@example.com"],
      phoneNumber: "(949) 372-5853 x21267",
      location: {
        street: "64237 Stephon Ville",
        city: "Fort Emeraldtown",
        state: "Nevada",
        country: "Australia",
        zip: "83985-5320",
        coordinates: {
          latitude: -40.6715,
          longitude: -123.0179,
        },
      },
      uuid: "ad17f5b1-c42a-4c72-9543-eaff7b5b9e12",
      objectId: "65aa649cceb0375e468d7a5e",
    },
  },
};

const clusterTemplateThreeV1: ctm.TemplateInfo = {
  id: clusterTemplateThreeV1Info.id,
  name: clusterTemplateThreeName,
  version: clusterTemplateThreeV1Info.version,
  description: "Etiam tristique sollicitudin rutrum",
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: {
      status: "active",
      name: {
        first: "Cyril",
        middle: "James",
        last: "Zulauf",
      },
      username: "Cyril-Zulauf",
      password: "7rbNACpK2A8Tz5L",
      emails: ["Zula.Boyle68@gmail.com", "Jeramie_Ullrich@example.com"],
      phoneNumber: "(404) 954-4501",
      location: {
        street: "496 Abshire Locks",
        city: "Katelinport",
        state: "Georgia",
        country: "Latvia",
        zip: "48235",
        coordinates: {
          latitude: 26.4697,
          longitude: -171.3622,
        },
      },
      uuid: "9300f1d9-e05b-476b-aa11-3211c76412e8",
      objectId: "65aa64a5ceb0375e468d7a5f",
    },
  },
};

const clusterTemplateFourV1: ctm.TemplateInfo = {
  id: clusterTemplateFourV1Info.id,
  name: clusterTemplateFourName,
  version: clusterTemplateFourV1Info.version,
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: undefined,
  },
};
const clusterTemplateFourV2: ctm.TemplateInfo = {
  id: clusterTemplateFourV2Info.id,
  name: clusterTemplateFourName,
  version: clusterTemplateFourV2Info.version,
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: undefined,
  },
};

const clusterTemplateFiveV1: ctm.TemplateInfo = {
  id: clusterTemplateFiveV1Info.id,
  name: clusterTemplateFiveName,
  version: clusterTemplateFiveV1Info.version,
  description: "Aenean rutrum condimentum purus",
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: undefined,
  },
};
const clusterTemplateFiveV2: ctm.TemplateInfo = {
  id: clusterTemplateFiveV2Info.id,
  name: clusterTemplateFiveName,
  version: clusterTemplateFiveV2Info.version,
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: undefined,
  },
};
const clusterTemplateFiveV3: ctm.TemplateInfo = {
  id: clusterTemplateFiveV3Info.id,
  name: clusterTemplateFiveName,
  version: clusterTemplateFiveV3Info.version,
  description: "Praesent ligula felis",
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: undefined,
  },
};
const clusterTemplateFiveV4: ctm.TemplateInfo = {
  id: clusterTemplateFiveV4Info.id,
  name: clusterTemplateFiveName,
  version: clusterTemplateFiveV4Info.version,
  clustertype: "test",
  providertype: "test",
  clusterconfiguration: {
    rke2: undefined,
  },
};

export const templates: ctm.TemplateInfoList = {
  templateInfoList: [
    clusterTemplateOneV1,
    clusterTemplateOneV2,
    clusterTemplateTwoV1,
    clusterTemplateThreeV1,
    clusterTemplateFourV1,
  ],
};

export default class ClusterTemplatesStore extends BaseStore<
  "name",
  ctm.TemplateInfo
> {
  private defaultTemplate: ctm.DefaultTemplateInfo = {
    name: clusterTemplateOneV1.name,
    version: clusterTemplateOneV1.version!,
  };

  convert(body: ctm.TemplateInfo, id?: string | undefined) {
    return body;
  }

  getTemplate(name: string, version: string): ctm.TemplateInfo | undefined {
    return this.resources.find((r) => r.name === name && r.version === version);
  }

  getDefault(): ctm.DefaultTemplateInfo {
    return this.defaultTemplate;
  }

  setDefault(name: string, version: string) {
    this.defaultTemplate.name = name;
    this.defaultTemplate.version = version;
  }

  deleteTemplate(template: ctm.TemplateInfo): boolean {
    if (this.getTemplate(template.name, template.version!) === undefined) {
      return false;
    }
    this.resources = this.resources.filter((tpl) => {
      return tpl.name !== template.name || tpl.version !== template.version;
    });
    return true;
  }

  constructor() {
    super("name", [
      clusterTemplateOneV1,
      clusterTemplateOneV2,
      clusterTemplateOneV3,
      clusterTemplateTwoV1,
      clusterTemplateTwoV2,
      clusterTemplateThreeV1,
      clusterTemplateFourV1,
      clusterTemplateFourV2,
      clusterTemplateFiveV1,
      clusterTemplateFiveV2,
      clusterTemplateFiveV3,
      clusterTemplateFiveV4,
    ]);
  }
}
