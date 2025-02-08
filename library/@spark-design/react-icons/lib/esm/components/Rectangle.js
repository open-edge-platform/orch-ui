import { jsx as _jsx } from "react/jsx-runtime";
import { IconWrapper } from '../IconWrapper';
const Rectangle = ({ svgProps: props, ...restProps }) => {
    return (_jsx(IconWrapper, { icon: _jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: _jsx("path", { d: "M3.01.144a3.764 3.764 0 00-1.724.958c-.55.514-.872 1.037-1.11 1.803C.006 3.449 0 4.072 0 20.02c0 15.948.006 16.571.176 17.115.097.311.282.746.412.968.332.567 1.096 1.252 1.725 1.547l.534.25h50.306l.534-.25c.629-.295 1.393-.98 1.725-1.547.13-.222.315-.657.412-.968.17-.544.176-1.167.176-17.115 0-15.948-.006-16.571-.176-17.115-.238-.766-.56-1.289-1.11-1.803-.54-.506-1.024-.77-1.764-.962-.786-.205-49.18-.201-49.94.004M50.027 20.02v14.047H5.973V5.973h44.054V20.02", fill: "#2B2C30", fillRule: "evenodd" }) }), ...restProps }));
};
export default Rectangle;
