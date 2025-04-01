export declare enum ThemeMode {
    Light = "light",
    Dark = "dark"
}
export declare const spark: {
    token: <T>(data: T, conf?: import("@spark-design/core").TokenConfig | undefined) => import("@spark-design/core").TokenData<T>;
    component: import("@spark-design/core").Creator;
    keyframe: import("@spark-design/core/lib/types/keyframe").Creator;
    media: import("@spark-design/core/lib/types/media").Creator;
    container: import("@spark-design/core/lib/types/container").Creator;
    supports: import("@spark-design/core/lib/types/supports").Creator;
    global: import("@spark-design/core/lib/types/global").Creator;
    setConfig: import("@spark-design/core").SetConfigFn<Partial<import("@spark-design/core").BaseSparkConfig>>;
};
export declare const token: <T>(data: T, conf?: import("@spark-design/core").TokenConfig | undefined) => import("@spark-design/core").TokenData<T>, component: import("@spark-design/core").Creator, keyframe: import("@spark-design/core/lib/types/keyframe").Creator, media: import("@spark-design/core/lib/types/media").Creator, supports: import("@spark-design/core/lib/types/supports").Creator, global: import("@spark-design/core/lib/types/global").Creator;
