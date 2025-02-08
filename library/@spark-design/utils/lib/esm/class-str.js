import { isObject } from './object';
export const cl = (...args) => {
    const classList = [];
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg)
            continue;
        const argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classList.push(arg);
        }
        else if (Object.prototype.toString.call(arg) === '[object Array]') {
            if (arg.length) {
                const inner = cl(...arg);
                if (inner) {
                    classList.push(inner);
                }
            }
        }
        else if (isObject(arg)) {
            if (arg.toString === Object.prototype.toString) {
                for (const key in arg) {
                    if (arg[key]) {
                        classList.push(key);
                    }
                }
            }
            else {
                classList.push(arg.toString());
            }
        }
    }
    return classList.join(' ');
};
