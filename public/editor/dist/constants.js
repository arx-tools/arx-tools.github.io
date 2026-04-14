export const originalArxLevelIds = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
];
export function isValidOriginalArxLevelId(level) {
    if (Number.isNaN(level)) {
        return false;
    }
    return originalArxLevelIds.includes(level);
}
//# sourceMappingURL=constants.js.map