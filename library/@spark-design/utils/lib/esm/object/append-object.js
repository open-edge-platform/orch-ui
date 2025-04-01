export const appendToObject = (existingObject, newObject) => {
    if (typeof existingObject === 'object' && typeof newObject === 'object') {
        const result = Object.assign({}, existingObject, newObject);
        return result;
    }
    else {
        throw new Error('Both arguments must be objects.');
    }
};
