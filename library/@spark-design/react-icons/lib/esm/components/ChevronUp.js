import { jsx as _jsx } from "react/jsx-runtime";
import { IconWrapper } from '../IconWrapper';
const ChevronUp = ({ svgProps: props, ...restProps }) => {
    return (_jsx(IconWrapper, { icon: _jsx("svg", { width: "100%", height: "100%", viewBox: "0 0 56 56", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: _jsx("path", { d: "M23.56.092C23.311.227.244 23.293.115 23.536c-.183.345-.143.722.115 1.072.126.172.874.948 1.662 1.725 1.496 1.476 1.703 1.614 2.201 1.467.103-.031 4.624-4.489 10.047-9.908L24 8.041l9.86 9.852c5.423 5.418 9.944 9.877 10.047 9.907.505.149.699.017 2.319-1.587.851-.843 1.599-1.63 1.661-1.749.151-.288.143-.703-.018-.946C47.682 23.234 24.982.51 24.608.232c-.332-.247-.749-.303-1.048-.14", fill: "#2B2C30", fillRule: "evenodd" }) }), ...restProps }));
};
export default ChevronUp;
