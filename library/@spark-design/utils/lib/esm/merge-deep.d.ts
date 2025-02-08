type TUnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare const mergeDeep: <T extends any[]>(...objects: T) => TUnionToIntersection<T[number]>;
export {};
