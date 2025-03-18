/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { InfoPopup } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Heading, Icon, Text } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardsHeaderBtn.scss";

const dataCy = "dashboardsHeaderBtn";
interface DashboardsHeaderBtnProps {
  active: boolean;
  setActive: () => void;
}
const DashboardsHeaderBtn = ({
  active,
  setActive,
}: DashboardsHeaderBtnProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const cy = { "data-cy": dataCy };
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const tooltipRefEl = useRef(null);
  const navigate = useNavigate();

  // use a listener to close the dropdown if we click outside of it
  const listener = (e: MouseEvent) => {
    // Check if the click is outside of this component
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setExpanded(false);
    }
  };
  useEffect(() => {
    if (expanded) {
      document.addEventListener("mousedown", listener);
    } else {
      document.removeEventListener("mousedown", listener);
    }
  }, [expanded]);

  // load the list of extensions
  const { data: extensions, isSuccess } =
    adm.useDeploymentServiceListUiExtensionsQuery({
      projectName: SharedStorage.project?.name ?? "",
    });

  const isManyDashboard =
    (extensions && extensions.uiExtensions
      ? extensions.uiExtensions.length
      : 0) > 0;

  useEffect(() => {
    if (isSuccess) {
      setShowTooltip(
        // If extension exist
        isManyDashboard,
      );
    }
  }, [extensions]);

  // activates the top level item
  // and closes the dropdown
  const activateAndClose = () => {
    setActive();
    setExpanded(false);
  };

  const dropDownContent = (
    <div className={"dropdown-container"} ref={ref} data-cy="dropdown">
      <Link to="/dashboard" onClick={activateAndClose}>
        <div data-cy="lpDashboard">
          <Heading className={"label"} semanticLevel={6}>
            Dashboard
          </Heading>
          <Text className={"description"}>
            This is the default dashboard showing the overall deployment status
          </Text>
        </div>
      </Link>
      {extensions &&
        extensions.uiExtensions.map((e, i) => (
          <Link to={`/extension/${e.label}`} key={i} onClick={activateAndClose}>
            <Heading className={"label"} semanticLevel={6}>
              {e.label}
            </Heading>
            {e.description && (
              <Text className={"description"}>{e.description}</Text>
            )}
          </Link>
        ))}
    </div>
  );

  const sm = "dashboards-header-btn";

  const hasExtensions =
    extensions?.uiExtensions && extensions.uiExtensions.length > 0;
  return (
    <div {...cy} className={sm}>
      <a
        data-cy="mainBtn"
        className={active ? "active" : undefined}
        onClick={() => {
          if (!hasExtensions) {
            setActive();
            navigate("/dashboard");
          } else setExpanded((e) => !e);
        }}
      >
        Dashboard
        {hasExtensions && <Icon icon={"caret-down"} />}
      </a>
      {expanded && hasExtensions && dropDownContent}

      {localStorage.getItem("hideDashboardInfoTooltip") !== "true" && (
        <span className={`${sm}__tooltip`} ref={tooltipRefEl}>
          <InfoPopup
            className={`${sm}__tooltip-position`}
            isVisible={showTooltip}
            onHide={() => setShowTooltip(false)}
            onButtonClick={() => {
              setShowTooltip(false);

              localStorage.setItem(
                "hideDashboardInfoTooltip",
                isManyDashboard.toString(),
              );
            }}
            buttonText="Got It"
            buttonVariant={ButtonVariant.Action}
            sourceSelector={`.${sm}__tooltip`}
          >
            <p>A new dashboard is available in the option here.</p>
          </InfoPopup>
        </span>
      )}
    </div>
  );
};

export default DashboardsHeaderBtn;
