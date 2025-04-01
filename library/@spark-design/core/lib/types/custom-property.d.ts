import { BaseSparkConfig, SparkConfigInstance } from './spark-config';
export interface CSSCustomPropertyConfg extends BaseSparkConfig {
    key: string;
    value: string | number | CSSCustomProperty;
}
export type CSSCustomPropertyExtractConfg = Partial<CSSCustomPropertyConfg>;
export declare class CSSCustomProperty extends Function {
    config: SparkConfigInstance<CSSCustomPropertyConfg>;
    constructor(config: SparkConfigInstance<CSSCustomPropertyConfg>);
    getKey: (config?: CSSCustomPropertyExtractConfg) => string;
    getConfig: (opts?: Partial<CSSCustomPropertyConfg>) => SparkConfigInstance<CSSCustomPropertyConfg>;
    toVariable: (config?: CSSCustomPropertyExtractConfg) => string;
    toValue: (config?: CSSCustomPropertyExtractConfg) => string | number;
    toCSS: (config?: CSSCustomPropertyExtractConfg) => string;
    toString: (config?: CSSCustomPropertyExtractConfg) => string;
}
export declare const toExactValue: (val: string | number, config: CSSCustomPropertyConfg) => string | number;
export declare const normalizePrefix: (str?: string) => string;
export declare const createCustomProperty: (options: SparkConfigInstance<CSSCustomPropertyConfg>) => CSSCustomProperty;
export declare const isCustomProperty: (entity: unknown) => boolean;
