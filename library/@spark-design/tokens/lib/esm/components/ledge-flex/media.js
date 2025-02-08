import { media } from '../../setup';
import { ledgeFlex } from './component';
import { properties } from './properties';
import { LedgeFlexColumnSize, LedgeFlexItemSize } from './types';
const container = {
    sm: '690px',
    md: '1264px'
};
export const ledgeFlexMedia = media({
    [`@container spark-ledge-flex (width < ${container.sm})`]: {
        [`${ledgeFlex.$} .${ledgeFlex.item.$}`]: {
            [`&-spacer:is([class*='${LedgeFlexItemSize.Medium}'])`]: {
                display: 'none'
            },
            [`&-spacer:is([class*='${LedgeFlexItemSize.Large}'])`]: {
                display: 'none'
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C1].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['1']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C2].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['2']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C3].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['3']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C4].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['4']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C5].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['5']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C6].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['6']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C7].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['7']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C8].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['8']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C9].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['9']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C10].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['10']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C11].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['11']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C12].$}-${LedgeFlexItemSize.Small}`]: {
                flexBasis: properties.col['12']
            }
        }
    },
    [`@container spark-ledge-flex (width  >= ${container.sm})  and (width <= ${container.md})`]: {
        [`${ledgeFlex.$} .${ledgeFlex.item.$}`]: {
            [`&-spacer:is([class*='${LedgeFlexItemSize.Small}'])`]: {
                display: 'none'
            },
            [`&-spacer:is([class*='${LedgeFlexItemSize.Large}'])`]: {
                display: 'none'
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C1].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['1']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C2].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['2']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C3].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['3']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C4].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['4']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C5].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['5']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C6].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['6']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C7].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['7']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C8].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['8']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C9].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['9']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C10].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['10']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C11].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['11']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C12].$}-${LedgeFlexItemSize.Medium}`]: {
                flexBasis: properties.col['12']
            }
        }
    },
    [`@container spark-ledge-flex (width  > ${container.md})`]: {
        [`${ledgeFlex.$} .${ledgeFlex.item.$}`]: {
            [`&-spacer:is([class*='${LedgeFlexItemSize.Small}'])`]: {
                display: 'none'
            },
            [`&-spacer:is([class*='${LedgeFlexItemSize.Medium}'])`]: {
                display: 'none'
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C1].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['1']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C2].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['2']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C3].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['3']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C4].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['4']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C5].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['5']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C6].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['6']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C7].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['7']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C8].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['8']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C9].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['9']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C10].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['10']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C11].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['11']
            },
            [`&.${ledgeFlex.item[LedgeFlexColumnSize.C12].$}-${LedgeFlexItemSize.Large}`]: {
                flexBasis: properties.col['12']
            }
        }
    }
});
