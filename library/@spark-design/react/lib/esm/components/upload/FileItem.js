import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Icon, ProgressIndicator, Text } from '../';
export const FileItem = ({ file, deleteFile, onUpload, errors, size, apiURL }) => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        async function upload() {
            try {
                const res = await uploadFile(file, setProgress);
                onUpload(file, res, []);
            }
            catch (rej) {
                onUpload(file, undefined, [
                    {
                        code: rej.code,
                        message: rej.message
                    }
                ]);
            }
        }
        if (errors.length === 0)
            upload();
    }, []);
    const uploadFile = async (file, onProgress) => {
        const formData = new FormData();
        formData.append('file', file);
        return new Promise((resolve, reject) => {
            axios
                .post(apiURL, formData, {
                onUploadProgress: async (data) => {
                    if (data && data.total)
                        onProgress(Math.round((100 * data.loaded) / data.total));
                }
            })
                .then((res) => {
                if (res.data)
                    resolve(res.data.url);
            })
                .catch((error) => {
                reject(error);
            });
        });
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "spark-upload-files-item", children: [progress < 100 && errors.length === 0 && (_jsx("div", { className: "start-slot", children: _jsx(Button, { variant: "ghost", size: size, style: {
                                blockSize: `var(--spark-upload-${size}-files-block-size)`,
                                inlineSize: `var(--spark-upload-${size}-files-block-size)`
                            }, type: "button", onPress: () => deleteFile(file), children: _jsx(Icon, { altText: "Cancel file upload", icon: "cross-circle", artworkStyle: "regular" }) }) })), errors.length > 0 && (_jsx("div", { className: "start-slot", children: _jsx(Icon, { altText: "File upload failed", artworkStyle: "regular", icon: "alert-circle", style: {
                                color: 'var(--spark-upload-files-error-background-color)'
                            } }) })), errors.length === 0 && progress === 100 && (_jsx("div", { className: "start-slot", children: _jsx(Icon, { altText: "File upload succeeded", artworkStyle: "regular", icon: "check-circle", style: { color: 'var(--spark-upload-icon-success)' } }) })), _jsx(Text, { size: "s", className: "file-text", children: file.name })] }), errors.length === 0 && (_jsx(ProgressIndicator, { value: progress, variant: "minimum", style: {
                    inlineSize: `var(--spark-upload-${size}-files-inline-size)`
                } })), errors &&
                errors.length > 0 &&
                errors.map((error, idx) => (_jsx("div", { className: "spark-upload-files-error", children: _jsx(Text, { size: "s", children: error.message }, error.code) }, idx)))] }));
};
