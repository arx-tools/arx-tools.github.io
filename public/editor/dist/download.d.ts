export declare function downloadBinaryAs(filename: string, data: string | ArrayBuffer | Blob, mimeType?: string): void;
export declare function zipBuffers(buffers: Record<string, ArrayBuffer>): Promise<ArrayBuffer>;
