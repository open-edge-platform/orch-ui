export const valueFormatOptions = (value, style, currency, maximumFractionDigits = 0) => {
    return new Intl.NumberFormat(currency, {
        style: style,
        currency,
        maximumFractionDigits: maximumFractionDigits
    })
        .format(value)
        .replace(/^(\d+)/, '$1 ')
        .replace(/\s+/, ' ');
};
