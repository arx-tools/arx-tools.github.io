import { explode } from 'node-pkware/simple';
import { getHeaderSize } from 'arx-header-size';
import { FTS } from 'arx-convert';
try {
    const response = await fetch('/levels/level11/fast.fts');
    if (!response.ok) {
        const data = await response.text();
        throw new Error(`Failed to load level 11: ${data}`);
    }
    const packedFts = await response.arrayBuffer();
    const headerSize = getHeaderSize(packedFts, 'fts');
    const header = packedFts.slice(0, headerSize.total);
    const headerView = new Uint8Array(header);
    const body = packedFts.slice(headerSize.total);
    const unpackedBody = explode(body);
    const unpackedBodyView = new Uint8Array(unpackedBody);
    const unpackedFts = new ArrayBuffer(headerSize.total + unpackedBody.byteLength);
    const unpackedFtsView = new Uint8Array(unpackedFts);
    unpackedFtsView.set(headerView, 0);
    unpackedFtsView.set(unpackedBodyView, headerSize.total);
    const fts = FTS.load(unpackedFts);
    console.log(`Level 11 has ${fts.polygons.length} polygons`);
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=index.js.map