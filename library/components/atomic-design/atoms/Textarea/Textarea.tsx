/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { FieldLabel, Icon, Text } from "@spark-design/react";
import { FormEvent } from "react";

import { TextSize } from "@spark-design/tokens";
import "./Textarea.scss";

export interface TextareaProps {
  label?: string;
  description?: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  onChange?: (e: FormEvent<HTMLTextAreaElement>) => void;
  dataCy?: string;
  errorMessage?: string;
  validationState?: boolean;
  style?: React.CSSProperties;
}

export const Textarea = ({
  label,
  description,
  value,
  placeholder,
  rows = 3,
  onChange,
  validationState = true,
  errorMessage,
  style,
  dataCy = "textarea",
}: TextareaProps) => (
  <div className="textarea" data-cy={dataCy} style={style}>
    {label && <FieldLabel size="l">{label}</FieldLabel>}
    {description && <Text size={TextSize.Small}>{description}</Text>}
    <textarea
      className="textarea__input spark-input spark-input-outline spark-focus spark-focus-within spark-focus-snap"
      placeholder={placeholder}
      rows={rows}
      onChange={onChange}
      value={value}
    />
    {!validationState && (
      <span className="spark-font-100 spark-text-field-error-message">
        <Icon icon="cross-circle" />
        {errorMessage}
      </span>
    )}
  </div>
);
