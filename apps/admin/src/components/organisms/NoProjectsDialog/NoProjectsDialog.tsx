/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageBannerAlertState, Modal } from "@orch-ui/components";
import { clearAllStorage } from "@orch-ui/utils";
import { Button, MessageBanner } from "@spark-design/react";
import { useAuth } from "react-oidc-context";
import "./NoProjectsDialog.scss";

const dataCy = "noProjectsDialog";

export const NoProjectsDialog = () => {
  const cy = { "data-cy": dataCy };
  const { signoutRedirect } = useAuth();

  return (
    <div {...cy} className="no-projects">
      <Modal open passiveModal isDimissable={false}>
        <div>
          <MessageBanner
            showIcon
            messageBody={
              "You are not assigned to a project, or you do not have permission to view a project.\n\nContact your administrator."
            }
            variant={MessageBannerAlertState.Warning}
          />
          <br />
          <Button
            onPress={() => {
              clearAllStorage();
              signoutRedirect({
                post_logout_redirect_uri: window.location.origin,
              });
            }}
          >
            Logout
          </Button>
        </div>
      </Modal>
    </div>
  );
};
