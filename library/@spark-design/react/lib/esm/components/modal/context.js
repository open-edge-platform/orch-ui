import React from 'react';
export const DialogContext = React.createContext({
    type: 'modal',
    onClose: () => {
        return;
    }
});
