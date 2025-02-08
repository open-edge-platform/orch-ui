import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { ButtonSize, toast, ToastPosition, ToastState, ToastVisibility } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Button, Icon } from '../';
import '@spark-design/css/components/toast/index.css';
export const Toast = ({ position = ToastPosition.BottomRight, state = ToastState.Default, visibility = ToastVisibility.Hide, message = 'Add your message', duration = 3000, canClose = false, onHide, className = '', ...rest }) => {
    const [currentVisibility, setCurrentVisibility] = useState(visibility);
    const timeoutRef = useRef();
    useEffect(() => {
        setCurrentVisibility(visibility);
    }, [visibility]);
    useEffect(() => {
        if (visibility === ToastVisibility.Show) {
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setCurrentVisibility(ToastVisibility.Hide);
                if (onHide)
                    onHide();
            }, duration);
            return;
        }
    }, [currentVisibility]);
    const tst = toast.component;
    const toastClass = cl({
        [tst.$]: true,
        [tst.placement[position].$]: position,
        [className]: !!className
    });
    const toastContentClass = cl({
        [tst.content.$]: true,
        [tst.content.state[state]?.$]: true,
        [tst.content.visibility[currentVisibility]?.$]: true
    });
    return (_jsx("div", { className: toastClass, ...rest, children: _jsxs("div", { className: toastContentClass, children: [_jsx("p", { className: tst.content.message.$, children: message }), canClose && (_jsx(Button, { className: tst.content.action.$, onPress: () => setCurrentVisibility(ToastVisibility.Hide), variant: "ghost", size: ButtonSize.Small, iconOnly: true, children: _jsx(Icon, { altText: "Close", icon: "cross" }) }))] }) }));
};
