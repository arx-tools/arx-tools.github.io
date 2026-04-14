import { ArxPolygonFlags } from 'arx-convert/types';
import { Vector3 } from 'three';
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
export function arxVector3toVector3({ x, y, z }) {
    return new Vector3(x, y, z);
}
export function isTransparent(flags) {
    return (flags & ArxPolygonFlags.Transparent) !== 0;
}
export function isDoubleSided(flags) {
    return (flags & ArxPolygonFlags.DoubleSided) !== 0;
}
export function isNoDraw(flags) {
    return (flags & ArxPolygonFlags.NoDraw) !== 0;
}
//# sourceMappingURL=functions.js.map