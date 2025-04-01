import { token } from '../../setup';
export const prefix = 'spark-pagination';
export const properties = token({
    base: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    control: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        gap: '20px',
        dropdown: {
            marginInlineStart: '7px',
            width: 'auto'
        },
        button: {
            marginInlineStart: '7px',
            outline: 'none',
            marginInlineEnd: '27px'
        },
        itemPerPage: {
            display: 'flex',
            gap: '0'
        }
    },
    list: {
        display: 'flex',
        button: {
            marginInline: '3px',
            outline: 'none'
        }
    }
}, {
    prefix: prefix
});
