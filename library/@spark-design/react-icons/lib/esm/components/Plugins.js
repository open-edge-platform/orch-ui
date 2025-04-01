import { jsx as _jsx } from "react/jsx-runtime";
import { IconWrapper } from '../IconWrapper';
const Plugins = ({ svgProps: props, ...restProps }) => {
    return (_jsx(IconWrapper, { icon: _jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: _jsx("path", { d: "M8.346.316l-.319.319v7.392H.635l-.318.318-.319.318.025 15.401.024 15.401.226.241.226.241h55.002l.226-.241.226-.241.024-15.401.025-15.401-.319-.318-.318-.318h-7.392V.635l-.319-.319-.319-.319-7.388.025-7.389.025-.272.304-.273.305v7.371h-8.026V.656l-.273-.305-.272-.304-7.389-.025-7.388-.025-.319.319m41.681 23.717v10.034H5.973V14h44.054v10.033", fill: "#2B2C30", fillRule: "evenodd" }) }), ...restProps }));
};
export default Plugins;
