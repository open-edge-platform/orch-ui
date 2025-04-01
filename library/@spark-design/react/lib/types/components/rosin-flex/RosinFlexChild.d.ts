/// <reference types="react" />
import { RosinFlexConfigs, RosinFlexRowColTotal } from './RosinFlex';
export interface RosinFlexChildProps {
    index: number;
    showItemBorder: boolean;
    child: React.ReactChild;
    configs: RosinFlexConfigs;
    colTotal: RosinFlexRowColTotal;
    nextColSize: RosinFlexRowColTotal;
    spacerCol: RosinFlexRowColTotal;
    lastIndex: number;
}
declare const RosinFlexChild: ({ index, lastIndex, showItemBorder, child, colTotal, nextColSize, spacerCol, configs }: RosinFlexChildProps) => JSX.Element;
export default RosinFlexChild;
