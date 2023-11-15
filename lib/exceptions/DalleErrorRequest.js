"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DalleErrorRequestImage = void 0;
class DalleErrorRequestImage extends Error {
    constructor(message) {
        super(message);
        this.message;
    }
}
exports.DalleErrorRequestImage = DalleErrorRequestImage;
