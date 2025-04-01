import { jsx as _jsx } from "react/jsx-runtime";
import { IconWrapper } from '../IconWrapper';
const FlameChart = ({ svgProps: props, ...restProps }) => {
    return (_jsx(IconWrapper, { icon: _jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: _jsx("path", { d: "M31.991 8.003l-.024 8.004-1.984.025-1.983.025V12.04H11.947v12.04H0v15.867h56V24.084l-1.983-.025-1.984-.026-.024-5.996-.024-5.997h-4.012V0H32.014l-.023 8.003M12.04 6.02v2.007h7.933V4.013H12.04V6.02M42 11.993v6.02h4.013v12.04h4.014v4.014H5.973v-4.014h12.04v-12.04h4.014v4.014h15.96V5.973H42v6.02m-42 6.02v1.96H8.027v-3.92H0v1.96", fill: "#2B2C30", fillRule: "evenodd" }) }), ...restProps }));
};
export default FlameChart;
