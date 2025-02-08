/// <reference types="react" />
import { FileError } from 'react-dropzone';
import { ButtonSize } from '@spark-design/tokens';
export interface UploadFileProps {
    file: File;
    deleteFile: (file: File) => void;
    onUpload: (file: File, url: string | undefined, apiErrors: FileError[]) => void;
    errors: FileError[];
    size?: `${ButtonSize}` | ButtonSize;
    apiURL: string;
}
export declare const FileItem: ({ file, deleteFile, onUpload, errors, size, apiURL }: UploadFileProps) => JSX.Element;
