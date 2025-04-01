export const toDashCase = (str, options) => {
    let lowerStr = str.replace(/[A-Z]/gm, (m) => ` ${m.toLowerCase()}`).replace(/-/gm, ' ');
    if (options?.dashNumbers) {
        lowerStr = lowerStr.replace(/[0-9]/gm, (m) => ` ${m}`);
    }
    return lowerStr.replace(/ {1,}/gm, (_, i) => `${i ? '-' : ''}`);
};
