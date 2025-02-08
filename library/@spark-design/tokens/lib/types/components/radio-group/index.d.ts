import { radioGroup, RadioGroupOrientation } from './component';
export { radioGroup, RadioGroupOrientation };
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        gap: string;
        borderWidth: string;
        borderRadius: string;
        boxShadowSpreadRadiusOne: string;
        boxShadowSpreadRadiusTwo: string;
        boxShadowSpreadRadiusThree: string;
        insetBlockStart: string;
        boxShadowX: string;
        boxShadowY: string;
        boxShadowBlurRadius: string;
    }>;
    component: import("@spark-design/core").ComponentOutput<{
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
    modes: {
        light: import("@spark-design/core").TokenData<{
            invalidInputBg: string;
            invalidInputBgBorderColor: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            invalidInputBg: string;
            invalidInputBgBorderColor: string;
        } & {
            invalidInputBg: string;
            invalidInputBgBorderColor: string;
        }>;
    };
};
