import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { card } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { useCardProvider } from './Card';
import '@spark-design/css/components/card/index.css';
export const CardFooter = ({ style, children, className = '', ...rest }) => {
    const { orientation } = useCardProvider();
    const crd = card.component;
    const cardOrientation = crd[orientation ? orientation : 'vertical']?.$;
    const CardFooterClass = cl({
        [`${cardOrientation}-footer-container`]: true,
        [className]: !!className
    });
    return (_jsxs("div", { className: CardFooterClass, style: style, ...rest, children: [_jsx("div", { className: crd.horizontalLine.$ }), _jsx("div", { className: `${cardOrientation}-buttons-container`, children: children })] }));
};
