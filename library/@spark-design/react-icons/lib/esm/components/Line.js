import { jsx as _jsx } from "react/jsx-runtime";
import { IconWrapper } from '../IconWrapper';
const Line = ({ svgProps: props, ...restProps }) => {
    return (_jsx(IconWrapper, { icon: _jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: _jsx("path", { d: "M58.104.15c-.239.074-.657.301-.93.503-.273.203-13.15 13.031-28.617 28.507C1.416 56.318.429 57.319.218 57.896c-.425 1.167-.219 2.197.625 3.121.862.943 2.024 1.215 3.261.765.577-.21 1.571-1.191 29.029-28.649C60.591 5.675 61.572 4.681 61.782 4.104c.26-.715.275-1.287.054-2.044-.129-.441-.294-.688-.764-1.148-.864-.847-1.871-1.105-2.968-.762", fill: "#2B2C30", fillRule: "evenodd" }) }), ...restProps }));
};
export default Line;
