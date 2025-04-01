import { jsx as _jsx } from "react/jsx-runtime";
import { upload } from '@spark-design/tokens';
import { FileItem } from './FileItem';
export const FileList = ({ files, deleteFile, onUpload, size, apiURL }) => {
    const upld = upload.component;
    return (_jsx("div", { className: upld.files.$, children: files &&
            files.map((fileWrapper, idx) => (_jsx(FileItem, { file: fileWrapper.file, deleteFile: deleteFile, onUpload: onUpload, errors: fileWrapper.errors, size: size, apiURL: apiURL }, idx))) }));
};
