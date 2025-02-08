import { jsx as _jsx } from "react/jsx-runtime";
import { IconWrapper } from '../IconWrapper';
const Document = ({ svgProps: props, ...restProps }) => {
    return (_jsx(IconWrapper, { icon: _jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: _jsx("path", { d: "M.55.136a2.036 2.036 0 00-.367.301C.037.601.037.719.018 26.523c-.021 28.738-.061 26.379.466 27.38.364.694 1.093 1.384 1.838 1.739l.575.275h38.206l.575-.275c.744-.355 1.474-1.046 1.838-1.738.52-.99.482.739.483-21.674L44 11.99l-5.995-5.995L32.01 0H16.39C1.311.001.762.005.55.136m27.463 9.1c0 2.054.03 3.364.081 3.612.292 1.41 1.49 2.659 2.9 3.022.378.098.975.117 3.722.117h3.271v34.026H6.013v-44h22v3.223", fill: "#2B2C30", fillRule: "evenodd" }) }), ...restProps }));
};
export default Document;
