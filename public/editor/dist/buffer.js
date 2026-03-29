export function splitArrayBufferAt(buffer, at) {
    const a = buffer.slice(0, at);
    const b = buffer.slice(at);
    return [a, b];
}
export function concatArrayBuffers(a, b) {
    const buffer = new ArrayBuffer(a.byteLength + b.byteLength);
    const bufferView = new Uint8Array(buffer);
    const aView = new Uint8Array(a);
    const bView = new Uint8Array(b);
    bufferView.set(aView, 0);
    bufferView.set(bView, a.byteLength);
    return buffer;
}
//# sourceMappingURL=buffer.js.map