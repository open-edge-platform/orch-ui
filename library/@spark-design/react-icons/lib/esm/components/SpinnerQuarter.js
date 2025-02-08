import { jsx as _jsx } from "react/jsx-runtime";
import { IconWrapper } from '../IconWrapper';
const SpinnerQuarter = ({ svgProps: props, ...restProps }) => {
    return (_jsx(IconWrapper, { icon: _jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: _jsx("path", { d: "M.575.091a.945.945 0 00-.498.521C.011.769 0 1.121.001 2.986.002 5.01.009 5.19.095 5.375c.204.441.506.6 1.23.648 3.931.259 7.36 1.276 10.624 3.151 5.876 3.377 10.112 9.166 11.501 15.717.27 1.275.5 2.994.5 3.739 0 .504.09.772.344 1.027.143.144.307.253.431.287.134.037 1.039.056 2.745.056h2.546l-.032-.987a29.56 29.56 0 00-3.208-12.538c-1.251-2.473-2.616-4.474-4.433-6.5-2.632-2.934-5.678-5.228-9.263-6.978A29.603 29.603 0 001.4.025C.85-.001.751.007.575.091", fill: "#2B2C30", fillRule: "evenodd" }) }), ...restProps }));
};
export default SpinnerQuarter;
