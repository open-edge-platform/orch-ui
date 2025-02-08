export declare enum RadioGroupOrientation {
    vertical = "vertical",
    horizontal = "horizontal"
}
export declare const radioGroup: import("@spark-design/core").ComponentOutput<{
    display: string;
    flexDirection: string;
    gap: string;
    buttonsContainer: {};
    isDisabled: {};
    isInvalid: {};
    orientation: {
        vertical: {};
        horizontal: {};
    };
} & {
    [x: string]: {
        [x: string]: "flex" | {
            flexDirection: "column";
            gap?: undefined;
        } | {
            flexDirection: "row";
            gap: string;
        };
        display: "flex";
        backgroundColor?: undefined;
        borderStyle?: undefined;
        borderColor?: undefined;
        borderWidth?: undefined;
        borderRadius?: undefined;
        boxShadow?: undefined;
    } | {
        backgroundColor: string;
        borderStyle: "solid";
        borderColor: string;
        borderWidth: string;
        borderRadius: string;
        display?: undefined;
        boxShadow?: undefined;
    } | {
        backgroundColor: string;
        borderStyle: "solid";
        borderColor: string;
        borderWidth: string;
        borderRadius: string;
        boxShadow: `${string} transparent,\n        inset ${string} ${string},\n        inset ${string} ${string}`;
        display?: undefined;
    };
}>;
