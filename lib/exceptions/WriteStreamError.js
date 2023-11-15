"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStreamError = void 0;
class WriteStreamError extends Error {
    constructor(message) {
        super(message);
        this.name;
    }
}
exports.WriteStreamError = WriteStreamError;
