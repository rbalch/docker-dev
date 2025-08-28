"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueProjectName = getUniqueProjectName;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Finds a unique directory name by appending a number if the original name exists.
 * @param baseName The base name for the directory.
 * @returns A unique directory name.
 */
function getUniqueProjectName(baseName) {
    let newName = baseName;
    let counter = 1;
    while (fs_1.default.existsSync(path_1.default.resolve(process.cwd(), newName))) {
        newName = `${baseName}-${counter}`;
        counter++;
    }
    return newName;
}
