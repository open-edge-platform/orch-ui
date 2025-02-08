import React, { CSSProperties } from 'react';
import { FileError } from 'react-dropzone';
import { UploadSize } from '@spark-design/tokens';
import '@spark-design/css/components/upload/index.css';
export declare const DEFAULT_MAX_FILE_SIZE = 1024;
export declare const DEFAULT_MIN_FILE_SIZE = 0;
export declare const DEFAULT_MAX_FILES = 3;
export declare const ACCEPT_ALL_FILES = "*";
export interface UploadableFile {
    id?: string;
    file?: File;
    errors?: FileError[];
    apiURL?: string;
    size?: `${UploadSize}` | UploadSize;
    dragAndDrop?: boolean;
    multiple?: boolean;
    maxFileSize?: number;
    minFileSize?: number;
    accept?: string;
    maxFileCount?: number;
    onChange?: () => void;
    className?: string;
    style?: CSSProperties;
}
export declare const Upload: React.FC<UploadableFile>;
