export async function wait(delayInMs) {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delayInMs);
    });
}
export function randomIntBetween(a, b) {
    return a + Math.floor(Math.random() * (b - a));
}
export function percentOf(percentage, maxValue) {
    return (maxValue / 100) * percentage;
}
//# sourceMappingURL=functions.js.map