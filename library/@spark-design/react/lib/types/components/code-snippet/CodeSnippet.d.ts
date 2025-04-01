import React, { ClipboardEvent, FC, ReactNode } from 'react';
import { CodeSnippetSize, CodeSnippetVariant } from '@spark-design/tokens';
import '@spark-design/css/components/code-snippet/index.css';
export interface CodeSnippetProps {
    size?: `${CodeSnippetSize}` | CodeSnippetSize;
    variant?: `${CodeSnippetVariant}` | CodeSnippetVariant;
    children: ReactNode;
    copyIcon?: React.ReactNode;
    hideNumbering?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onCopy?: (e: ClipboardEvent<HTMLInputElement>) => void;
}
export declare const CodeSnippet: FC<CodeSnippetProps>;
