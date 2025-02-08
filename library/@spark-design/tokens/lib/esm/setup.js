import { createSpark } from '@spark-design/core';
export var ThemeMode;
(function (ThemeMode) {
    ThemeMode["Light"] = "light";
    ThemeMode["Dark"] = "dark";
})(ThemeMode || (ThemeMode = {}));
export const spark = createSpark();
export const { token, component, keyframe, media, supports, global } = spark;
