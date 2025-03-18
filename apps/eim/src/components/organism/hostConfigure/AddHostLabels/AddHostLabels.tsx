/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataForm, MetadataPair } from "@orch-ui/components";
import { MessageBanner } from "@spark-design/react";
import { useMemo } from "react";
import {
  selectFirstHost,
  setMetadata,
  setValidationError,
} from "../../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

const dataCy = "addHostLabels";

export const AddHostLabels = () => {
  const cy = { "data-cy": dataCy };

  const { metadata } = useAppSelector(selectFirstHost);
  const dispatch = useAppDispatch();

  const metadataContent = useMemo(
    () => (
      <MetadataForm
        buttonText="+"
        pairs={metadata}
        onUpdate={(kv: MetadataPair[]) =>
          dispatch(setMetadata({ metadata: kv }))
        }
        hasError={(error) => {
          dispatch(setValidationError(error));
        }}
      />
    ),
    [metadata],
  );

  return (
    <div {...cy} className="add-host-labels">
      <MessageBanner
        messageTitle=""
        variant="info"
        size="m"
        messageBody={
          "This is a optional step, you can also proceed without adding host label."
        }
        showIcon
        outlined
      />
      <br />
      {metadataContent}
    </div>
  );
};
