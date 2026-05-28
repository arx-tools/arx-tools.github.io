import type { Logger } from './Logger.js';
export declare class Exception extends Error {
    constructor(message: string, logger?: Logger);
}
