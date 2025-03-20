import { media } from '../../setup';
import { rosinFlex } from './component';
import { properties } from './properties';
import { RosinFlexColumnSize, RosinFlexItemSize } from './types';
const container = {
    sm: '690px',
    md: '1264px'
};
export const rosinFlexMedia = media({
    [`@container spark-rosin-flex (width < ${container.sm})`]: {
        [`${rosinFlex.$} .${rosinFlex.item.$}`]: {
            [`&-spacer:is([class*='${RosinFlexItemSize.Medium}'])`]: {
                display: 'none'
            },
            [`&-spacer:is([class*='${RosinFlexItemSize.Large}'])`]: {
                display: 'none'
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C1].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['1']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C2].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['2']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C3].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['3']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C4].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['4']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C5].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['5']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C6].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['6']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C7].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['7']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C8].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['8']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C9].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['9']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C10].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['10']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C11].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['11']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C12].$}-${RosinFlexItemSize.Small}`]: {
                flexBasis: properties.col['12']
            }
        }
    },
    [`@container spark-rosin-flex (width  >= ${container.sm})  and (width <= ${container.md})`]: {
        [`${rosinFlex.$} .${rosinFlex.item.$}`]: {
            [`&-spacer:is([class*='${RosinFlexItemSize.Small}'])`]: {
                display: 'none'
            },
            [`&-spacer:is([class*='${RosinFlexItemSize.Large}'])`]: {
                display: 'none'
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C1].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['1']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C2].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['2']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C3].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['3']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C4].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['4']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C5].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['5']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C6].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['6']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C7].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['7']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C8].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['8']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C9].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['9']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C10].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['10']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C11].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['11']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C12].$}-${RosinFlexItemSize.Medium}`]: {
                flexBasis: properties.col['12']
            }
        }
    },
    [`@container spark-rosin-flex (width  > ${container.md})`]: {
        [`${rosinFlex.$} .${rosinFlex.item.$}`]: {
            [`&-spacer:is([class*='${RosinFlexItemSize.Small}'])`]: {
                display: 'none'
            },
            [`&-spacer:is([class*='${RosinFlexItemSize.Medium}'])`]: {
                display: 'none'
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C1].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['1']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C2].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['2']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C3].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['3']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C4].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['4']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C5].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['5']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C6].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['6']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C7].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['7']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C8].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['8']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C9].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['9']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C10].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['10']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C11].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['11']
            },
            [`&.${rosinFlex.item[RosinFlexColumnSize.C12].$}-${RosinFlexItemSize.Large}`]: {
                flexBasis: properties.col['12']
            }
        }
    }
});
