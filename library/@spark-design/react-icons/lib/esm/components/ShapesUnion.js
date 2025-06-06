import { jsx as _jsx } from "react/jsx-runtime";
import { IconWrapper } from '../IconWrapper';
const ShapesUnion = ({ svgProps: props, ...restProps }) => {
    return (_jsx(IconWrapper, { icon: _jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: _jsx("path", { d: "M3.161.094C1.719.369.399 1.697.088 3.184c-.124.598-.124 25.034 0 25.632.313 1.499 1.597 2.783 3.096 3.096.288.06 2.406.088 6.62.088H16v6.196c0 4.214.028 6.332.088 6.62.313 1.499 1.597 2.783 3.096 3.096.598.124 25.034.124 25.632 0 1.499-.313 2.783-1.597 3.096-3.096.124-.598.124-25.034 0-25.632-.318-1.525-1.635-2.821-3.147-3.097-.314-.058-2.551-.087-6.62-.087H32V9.804c0-4.214-.028-6.332-.088-6.62-.318-1.525-1.635-2.821-3.147-3.097-.612-.112-25.016-.105-25.604.007", fill: "#2B2C30", fillRule: "evenodd" }) }), ...restProps }));
};
export default ShapesUnion;
