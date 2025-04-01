import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { focusVisible as focus, tag, TagRounding, TagSize, TagTheme, TagVariant } from '@spark-design/tokens';
import { cl } from '@spark-design/utils';
import { Icon } from '../icon';
import '@spark-design/css/components/tag/index.css';
export const Tag = ({ as = 'button', label, variant = 'regular', theme = 'classic', size = 'small', rounding = 'SemiRound', toggleShadow, toggleDisabled, icon, iconPosition, iconVariant, className = '', removable, onRemove, ...rest }) => {
    const fcs = focus.component;
    const ButtonWrapperClass = cl({
        [tag.component.buttonWrapper.$]: true,
        [fcs.$]: true,
        [fcs.self.$]: true,
        [fcs.snap.$]: true,
        [className || '']: !!className
    });
    const ButtonWrapper = as;
    const beforeIcon = iconPosition == 'before' ? (removable ? (_jsx(ButtonWrapper, { className: ButtonWrapperClass, children: _jsx(Icon, { onClick: () => onRemove?.(), icon: 'cross', artworkStyle: iconVariant }) })) : (_jsx(Icon, { icon: icon, artworkStyle: iconVariant }))) : null;
    const afterIcon = iconPosition == 'after' ? (removable ? (_jsx(ButtonWrapper, { className: ButtonWrapperClass, children: _jsx(Icon, { onClick: () => onRemove?.(), icon: 'cross', artworkStyle: iconVariant }) })) : (_jsx(Icon, { icon: icon, artworkStyle: iconVariant }))) : null;
    const radiobuttonClass = cl({
        [tag.component.$]: true,
        [tag.component[variant]?.$]: variant,
        [tag.component.rounding[rounding]?.$]: rounding,
        [tag.component.theme[theme]?.$]: theme,
        [tag.component.size[size]?.$]: size,
        [tag.component.shadow.$]: toggleShadow,
        'is-disabled': toggleDisabled,
        [fcs.$]: true,
        [fcs.self.$]: true,
        [fcs.snap.$]: true,
        [className]: !!className
    });
    return (_jsx(_Fragment, { children: _jsxs("span", { ...rest, tabIndex: 0, className: radiobuttonClass, children: [beforeIcon, label, afterIcon] }) }));
};
Tag.defaultProps = {
    theme: TagTheme.Classic,
    variant: TagVariant.Action,
    size: TagSize.Large,
    rounding: TagRounding.None
};
