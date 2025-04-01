import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { fieldlabel, FieldLabelSize } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import '@spark-design/css/components/fieldlabel/index.css';
export const FieldLabel = ({ size = FieldLabelSize.Medium, children, isDisabled, isRequired, className = '', style, ...rest }) => {
    const fieldlbl = fieldlabel.component;
    const fieldLabelClass = cl({
        [fieldlbl.$]: true,
        [fieldlbl.size[size]?.$]: size,
        [fieldlbl.isDisabled.$]: isDisabled,
        [fieldlbl.isRequired.$]: isRequired,
        [className]: !!className
    });
    return (_jsxs("label", { className: fieldLabelClass, style: style, ...rest, children: [children, isRequired && (_jsx("span", { className: fieldlbl.requiredIndicator.$, "aria-hidden": "true", children: _jsx("span", { className: fieldlbl.requiredAsterisk.$, children: "*" }) }))] }));
};
