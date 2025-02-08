/// <reference types="react" />
declare const Plugins: ({ svgProps: props, ...restProps }: {
    [x: string]: any;
    svgProps: any;
}) => JSX.Element;
export default Plugins;
