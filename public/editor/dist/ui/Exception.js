export class Exception extends Error {
    constructor(message, logger) {
        super(message);
        logger?.error(message);
    }
}
//# sourceMappingURL=Exception.js.map