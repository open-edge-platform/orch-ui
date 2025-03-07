/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Icon } from "@spark-design/react";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import "./ErrorBoundaryFallback.scss";
export const dataCy = "errorBoundaryFallback";

const ErrorBoundaryFallback = ({ error }: FallbackProps) => {
  const cy = { "data-cy": dataCy };
  const className = "error-boundary-fallback";
  const navigate = useNavigate();

  const handleReloadClick = () => {
    navigate(0);
  };

  const handleCopyErrorClick = () => {
    navigator.clipboard.writeText(error.stack ?? error.message);
  };

  return (
    <div {...cy} className={className}>
      <Icon
        icon="information-circle"
        artworkStyle="solid"
        className={`${className}__icon`}
      />
      <h1>Something went wrong.</h1>
      <p className={`${className}__info`}>
        There was a problem processing the request. Please try again.
      </p>
      <div className={`${className}__buttons`}>
        <Button onPress={handleReloadClick} data-cy="reloadBtn">
          Reload
        </Button>
        <Button onPress={handleCopyErrorClick} data-cy="copyBtn">
          Copy Error
        </Button>
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;
