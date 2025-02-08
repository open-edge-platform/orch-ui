import { jsx as _jsx } from "react/jsx-runtime";
import { IconWrapper } from '../IconWrapper';
const Comment = ({ svgProps: props, ...restProps }) => {
    return (_jsx(IconWrapper, { icon: _jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: _jsx("path", { d: "M3.161.094C1.719.369.399 1.697.088 3.184c-.125.599-.125 29.033 0 29.632.313 1.499 1.597 2.783 3.096 3.096.297.061 3.491.088 10.64.088H24.04l5.98 5.98L36 47.96V36h4.196c2.754 0 4.342-.03 4.62-.088 1.499-.313 2.783-1.597 3.096-3.096.125-.599.125-29.033 0-29.632-.318-1.525-1.635-2.821-3.147-3.097-.616-.113-41.013-.106-41.604.007M42 18v12H30v3.479l-1.741-1.74L26.519 30H6V6h36v12", fill: "#2B2C30", fillRule: "evenodd" }) }), ...restProps }));
};
export default Comment;
