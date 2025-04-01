import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useRef, useState } from 'react';
import { ErrorCode, useDropzone } from 'react-dropzone';
import { upload, UploadSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Button, FieldLabel, Icon, Text } from '../';
import { FileList } from './FileList';
import '@spark-design/css/components/upload/index.css';
export const DEFAULT_MAX_FILE_SIZE = 1024;
export const DEFAULT_MIN_FILE_SIZE = 0;
export const DEFAULT_MAX_FILES = 3;
export const ACCEPT_ALL_FILES = '*';
let currentId = 0;
function getNewId() {
    return ++currentId;
}
export const Upload = ({ size = UploadSize.Medium, dragAndDrop = false, multiple = false, apiURL = '', accept = '', maxFileSize = DEFAULT_MAX_FILE_SIZE, minFileSize = DEFAULT_MIN_FILE_SIZE, maxFileCount = DEFAULT_MAX_FILES, className = '', style, ...rest }) => {
    const DndID = getNewId();
    const fileInputRef = useRef({});
    const [files, setFiles] = useState([]);
    const onDrop = useCallback((accFiles, rejFiles) => {
        const mappedAcc = accFiles.map((file) => ({ file, errors: [], id: getNewId() }));
        const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
        setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            [accept]: [ACCEPT_ALL_FILES]
        },
        multiple: multiple,
        maxFiles: maxFileCount,
        maxSize: maxFileSize * 1024,
        minSize: minFileSize * 1024
    });
    const deleteFile = (file) => {
        setFiles((curr) => curr.filter((fw) => fw.file !== file));
    };
    const onUpload = (file, url, errors) => {
        setFiles((curr) => curr.map((fw) => {
            if (fw.file === file) {
                return { ...fw, url, errors };
            }
            return fw;
        }));
    };
    const uploadHandler = async (event) => {
        const accFiles = Array.from(event?.target?.files);
        let mappedAcc;
        accFiles.forEach((file) => {
            if (accFiles.length > maxFileCount) {
                mappedAcc = {
                    file,
                    errors: [{ code: ErrorCode.TooManyFiles, message: 'Too many files' }],
                    id: getNewId()
                };
            }
            else if (file.size / 1024 < minFileSize) {
                mappedAcc = {
                    file,
                    errors: [
                        {
                            code: ErrorCode.FileTooSmall,
                            message: `File is smaller than ${minFileSize} KB`
                        }
                    ],
                    id: getNewId()
                };
            }
            else if (file.size / 1024 > maxFileSize) {
                mappedAcc = {
                    file,
                    errors: [
                        {
                            code: ErrorCode.FileTooLarge,
                            message: `File is larger than ${maxFileSize} KB`
                        }
                    ],
                    id: getNewId()
                };
            }
            else {
                mappedAcc = { file, errors: [], id: getNewId() };
            }
            setFiles((curr) => [...curr, mappedAcc]);
        });
    };
    const upld = upload.component;
    const uploadMainClass = cl({
        [upld.$]: true,
        [upld.size[size]?.$]: size,
        [className]: !!className
    });
    const uploadCanDrop = cl({
        [upld.dragAndDrop.$]: true,
        'can-drop': true
    });
    return (_jsxs("div", { className: uploadMainClass, style: style, children: [_jsxs("div", { className: upld.header.$, children: [_jsx(FieldLabel, { size: "l", htmlFor: `spark-upload-${DndID}`, children: "Upload files" }), _jsx(Text, { id: `spark-upload-help-${DndID}`, size: "s", children: "File restrictions info" })] }), dragAndDrop && (_jsxs("div", { ...getRootProps(), className: upld.dragAndDrop.$, children: [isDragActive && _jsx("div", { className: uploadCanDrop }), _jsxs("div", { className: upld.dragAndDropBody.$, children: [_jsx(Icon, { altText: "Upload", artworkStyle: "light", icon: "upload", style: {
                                    color: '#B2B3B9',
                                    fontSize: '16px'
                                } }), _jsx("span", { className: upld.dragAndDropText.$, children: _jsx(Text, { id: `spark-upload-dnd-help-${DndID}`, size: size, children: "Drag and drop files here or" }) }), _jsx(Button, { className: upld.button.$, size: size, children: "Add File" }), _jsx("input", { ...getInputProps(), type: "file", hidden: true, id: `spark-upload-${DndID}`, "aria-describedby": `spark-upload-help-${DndID} spark-upload-dnd-help-${DndID}`, ...rest })] })] })), !dragAndDrop && (_jsxs(Button, { className: upld.button.$, size: size, onPress: () => fileInputRef.current.click(), children: ["Add File", _jsx("input", { id: `spark-upload-${DndID}`, "aria-describedby": `spark-upload-help-${DndID}`, multiple: multiple, type: "file", hidden: true, ref: fileInputRef, onChange: uploadHandler, accept: accept, ...rest })] })), _jsx(FileList, { files: files, deleteFile: deleteFile, onUpload: onUpload, size: size, apiURL: apiURL })] }));
};
