/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import "./SquareSpinner.scss";

export interface SquareSpinnerProps {
  message?: string;
  dataCy?: string;
}
export const SquareSpinner = ({
  message = "One moment...",
  dataCy = "squareSpinner",
}: SquareSpinnerProps): JSX.Element => (
  <div className="square-spinner" data-cy={dataCy}>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className="square-spinner-svg"
    >
      <rect className="square-spinner-svg__background" />
      <rect className="square-spinner-svg__stroke" />
    </svg>
    <p className="square-spinner__message" data-cy="message">
      {message}
    </p>
  </div>
);
