"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInstaller = runInstaller;
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
function runInstaller(installPath) {
    return new Promise((resolve, reject) => {
        const destPath = path.resolve(process.cwd(), installPath);
        console.log(`✅ Installing core agentic framework with 'npx bmad-method install'...`);
        console.log(`   (This might take a moment, grabbing the latest and greatest for you.)`);
        const child = (0, child_process_1.spawn)('npx', ['bmad-method', 'install', '--directory', '.', '--ide', 'gemini', '--ide', 'claude-code', '--full'], {
            cwd: destPath,
            stdio: 'inherit', // This pipes the output directly to the parent process
            shell: true // Use shell to handle `npx` correctly, especially on Windows
        });
        child.on('close', (code) => {
            if (code === 0) {
                console.log('✅ Framework installation complete.');
                resolve();
            }
            else {
                reject(new Error(`Installer failed with exit code: ${code}`));
            }
        });
        child.on('error', (err) => {
            reject(err);
        });
    });
}
