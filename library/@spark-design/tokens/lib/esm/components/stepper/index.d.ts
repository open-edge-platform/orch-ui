export * from './types';
export declare const config: {
    properties: import("@spark-design/core").TokenData<{
        animationSpeed: string;
        textContainerPaddingInline: string;
        elementGap: string;
        borderWidth: string;
        step: {
            size: string;
            textPadding: string;
        };
        connector: {
            gapFactor: string;
            size: string;
        };
        l: {
            minimunInlineSize: string;
            horizontalGap: string;
            verticalGap: string;
            icon: {
                size: string;
                gapFactor: string;
                activeSize: string;
                activeGapFactor: string;
            };
        };
        m: {
            minimunInlineSize: string;
            horizontalGap: string;
            verticalGap: string;
            icon: {
                size: string;
                gapFactor: string;
                activeSize: string;
                activeGapFactor: string;
            };
        };
        s: {
            minimunInlineSize: string;
            horizontalGap: string;
            verticalGap: string;
            icon: {
                size: string;
                gapFactor: string;
                activeSize: string;
                activeGapFactor: string;
            };
        };
        horizontal: {
            flexDirection: string;
        };
        vertical: {
            flexDirection: string;
        };
    }>;
    component: import("@spark-design/core").ComponentOutput<{
        step: {};
        stepVisited: {};
        stepActive: {};
        stepInvalid: {};
        stepContainer: {};
        stepButton: {};
        stepTextContainer: {};
        stepText: {};
        stepTitle: {};
        orientation: {
            vertical: {};
            horizontal: {};
        };
        size: {
            l: {};
            m: {};
            s: {};
        };
    }>;
    modes: {
        light: import("@spark-design/core").TokenData<{
            textColor: string;
            titleColor: string;
            unvisitedBackgroundColor: string;
            unvisitedHoverBackgroundColor: string;
            unvisitedPressBackgroundColor: string;
            unvisitedColor: string;
            activeBackgroundColor: string;
            activeHoverBackgroundColor: string;
            activePressedBackgroundColor: string;
            activeColor: string;
            invalidColor: string;
            invalidHoverColor: string;
            invalidPressColor: string;
            transparent: string;
        }>;
        dark: import("@spark-design/core").TokenData<{
            textColor: string;
            titleColor: string;
            unvisitedBackgroundColor: string;
            unvisitedHoverBackgroundColor: string;
            unvisitedPressBackgroundColor: string;
            unvisitedColor: string;
            activeBackgroundColor: string;
            activeHoverBackgroundColor: string;
            activePressedBackgroundColor: string;
            activeColor: string;
            invalidColor: string;
            invalidHoverColor: string;
            invalidPressColor: string;
            transparent: string;
        } & {
            textColor: string;
            titleColor: string;
            unvisitedBackgroundColor: string;
            unvisitedHoverBackgroundColor: string;
            unvisitedPressBackgroundColor: string;
            unvisitedColor: string;
            activeBackgroundColor: string;
            activeHoverBackgroundColor: string;
            activePressedBackgroundColor: string;
            activeColor: string;
            invalidColor: string;
            invalidHoverColor: string;
            invalidPressColor: string;
            transparent: string;
        }>;
    };
};
