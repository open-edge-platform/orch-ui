/// <reference types="react" />
import { LedgeFlexConfigs, LedgeFlexRowColTotal } from './LedgeFlex';
export interface LedgeFlexChildProps {
    index: number;
    showItemBorder: boolean;
    child: React.ReactChild;
    configs: LedgeFlexConfigs;
    colTotal: LedgeFlexRowColTotal;
    nextColSize: LedgeFlexRowColTotal;
    spacerCol: LedgeFlexRowColTotal;
    lastIndex: number;
}
declare const LedgeFlexChild: ({ index, lastIndex, showItemBorder, child, colTotal, nextColSize, spacerCol, configs }: LedgeFlexChildProps) => JSX.Element;
export default LedgeFlexChild;
