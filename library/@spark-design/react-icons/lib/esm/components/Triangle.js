import { jsx as _jsx } from "react/jsx-runtime";
import { IconWrapper } from '../IconWrapper';
const Triangle = ({ svgProps: props, ...restProps }) => {
    return (_jsx(IconWrapper, { icon: _jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: _jsx("path", { d: "M29.827.135a2.723 2.723 0 00-.629.373c-.202.166-5.304 8.68-14.613 24.388C6.72 38.169.22 49.182.142 49.369c-.401.96.099 2.108 1.102 2.527.336.141 3.419.157 29.256.157s28.92-.016 29.256-.157c.503-.21.825-.52 1.052-1.012.251-.543.238-1.119-.038-1.694C60.249 48.103 32.15.856 31.848.56a1.952 1.952 0 00-2.021-.425m11.439 27.874l10.669 17.995-10.717.026c-5.895.014-15.541.014-21.436 0l-10.718-.026 10.685-18.023c5.878-9.912 10.723-18.01 10.767-17.995.045.016 4.882 8.126 10.75 18.023", fill: "#2B2C30", fillRule: "evenodd" }) }), ...restProps }));
};
export default Triangle;
