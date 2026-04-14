export declare const originalArxLevelIds: readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
/**
 * Levels go as: 0..8, 10..23, there is no level 9
 */
export type OriginalArxLevelIds = (typeof originalArxLevelIds)[number];
export declare function isValidOriginalArxLevelId(level: number): level is OriginalArxLevelIds;
