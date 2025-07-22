/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PopupOption } from "@orch-ui/components";
import {
  checkAuthAndRole,
  hostProvisionRoute,
  Role,
  useInfraNavigate,
} from "@orch-ui/utils";
import { reset, setHosts } from "../../../store/configureHost";
import { useAppDispatch } from "../../../store/hooks";
import GenericHostPopup, {
  GenericHostPopupProps,
} from "../../atom/GenericHostPopup/GenericHostPopup";

const dataCy = "onboardedHostPopup";
export type OnboardedHostPopupProps = Omit<
  GenericHostPopupProps,
  "additionalPopupOptions"
>;

/** This will show all available host actions within popup menu */
const OnboardedHostPopup = (props: OnboardedHostPopupProps) => {
  const cy = { "data-cy": dataCy };
  const { host } = props;

  const navigate = useInfraNavigate();
  const dispatch = useAppDispatch();

  const onProvision = () => {
    // reset the HostConfig form
    dispatch(reset());
    // store the current Host in Redux, so we don't have to fetch it again
    dispatch(setHosts({ hosts: [host] }));

    navigate(hostProvisionRoute);
  };

  const onboardedHostPopup: PopupOption[] = [
    {
      displayText: "Provision",
      disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
      onSelect: onProvision,
    },
  ];

  return (
    <div {...cy} className="onboarded-host-popup">
      <GenericHostPopup
        {...props}
        additionalPopupOptions={onboardedHostPopup}
      />
    </div>
  );
};

export default OnboardedHostPopup;
