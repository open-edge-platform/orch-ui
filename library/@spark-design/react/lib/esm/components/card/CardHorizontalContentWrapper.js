import { jsx as _jsx } from "react/jsx-runtime";
import { card } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { useCardProvider } from './Card';
import '@spark-design/css/components/card/index.css';
export const CardHorizontalContentWrapper = ({ style, className = '', children, ...rest }) => {
    const { orientation } = useCardProvider();
    const crd = card.component;
    const cardOrientation = crd[orientation ? orientation : 'vertical']?.$;
    const CardContentClass = cl({
        [`${cardOrientation}-wrapper`]: orientation,
        [className]: !!className
    });
    return (_jsx("div", { className: CardContentClass, style: style, ...rest, children: children }));
};
