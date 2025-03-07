/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AutoPropertiesMessages {
  NoneSelected = "Once connected, the hosts will need to be manually onboarded and provisioned.",
  BothSelected = "You'll only be able to assign one site to all hosts in the following steps.  Once connected, the hosts will automatically be onboarded and provisioned, and will be ready to receive a workload",
  OnboardOnly = "Hosts will onboard automatically.  You will need to provision them manually to receive a workload",
  ProvisionOnly = "You'll only be able to assign one site to all hosts in the following steps.  Once connected, the hosts will need to be manually onboarded. After onboarding, they will be automatically provisioned",
}
