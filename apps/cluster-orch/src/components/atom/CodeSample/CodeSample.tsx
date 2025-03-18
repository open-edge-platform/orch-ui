/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import Prism from "prismjs";
import { useEffect } from "react";

import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/themes/prism.css";

const dataCy = "codeSample";
interface CodeSampleProps {
  code: string;
  language: string;
  lineNumbers?: boolean;
}
const CodeSample = ({
  code,
  language,
  lineNumbers = false,
}: CodeSampleProps) => {
  const cy = { "data-cy": dataCy };

  useEffect(() => {
    Prism.highlightAll();
  }, [lineNumbers]);

  const lineNumbersStyle = lineNumbers ? "line-numbers" : "";

  return (
    <div {...cy}>
      <pre className={lineNumbersStyle}>
        <code data-cy="code" className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeSample;
