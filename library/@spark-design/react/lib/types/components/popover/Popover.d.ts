import React, { FC, ReactChild } from 'react';
import { AriaPopoverProps } from 'react-aria';
import { OverlayTriggerState } from 'react-stately';
import '@spark-design/css/components/popover/index.css';
interface PopoverProps extends AriaPopoverProps {
    style?: React.CSSProperties;
    className?: string;
    children?: ReactChild;
    state: OverlayTriggerState;
    fitContent?: boolean;
}
declare const Popover: FC<PopoverProps>;
export default Popover;
