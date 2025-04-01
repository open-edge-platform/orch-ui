import React from 'react';
export const mapChildren = (children, mixProps = {}) => {
    return React.Children.map(children, (child, idx) => {
        return React.cloneElement(child, { ...child.props, ...mixProps, idx });
    });
};
