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
exports.promptForAppPath = promptForAppPath;
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
function runInstaller(config) {
    return new Promise((resolve, reject) => {
        const destPath = path.resolve(process.cwd(), config.installPath);
        console.log(`✅ Installing core agentic framework with 'npx bmad-method install'...`);
        console.log(`   (This might take a moment, grabbing the latest and greatest for you.)`);
        const installChild = (0, child_process_1.spawn)('npx', ['bmad-method', 'install', '--directory', '.', '--ide', 'gemini', '--ide', 'claude-code', '--full'], {
            cwd: destPath,
            stdio: 'inherit', // This pipes the output directly to the parent process
            shell: true // Use shell to handle `npx` correctly, especially on Windows
        });
        installChild.on('close', (code) => {
            if (code === 0) {
                console.log('✅ Framework installation complete.');
                if (config.projectType === 'brownfield' && config.appPath) {
                    console.log(`✅ Generating codebase XML for brownfield project...`);
                    const outputPath = path.join(destPath, 'docs', 'codebase.xml');
                    const flattenChild = (0, child_process_1.spawn)('npx', ['bmad-method', 'flatten', '--input', config.appPath, '--output', outputPath], {
                        cwd: destPath,
                        stdio: 'inherit',
                        shell: true
                    });
                    flattenChild.on('close', (flattenCode) => {
                        if (flattenCode === 0) {
                            console.log('✅ Codebase XML generated successfully.');
                            resolve();
                        }
                        else {
                            reject(new Error(`Codebase flatten failed with exit code: ${flattenCode}`));
                        }
                    });
                    flattenChild.on('error', (err) => {
                        reject(err);
                    });
                }
                else {
                    resolve();
                }
            }
            else {
                reject(new Error(`Installer failed with exit code: ${code}`));
            }
        });
        installChild.on('error', (err) => {
            reject(err);
        });
    });
}
async function promptForAppPath() {
    return new Promise((resolve) => {
        process.stdout.write('Is this a brownfield project (existing application)? (y/N): ');
        process.stdin.once('data', (data) => {
            const answer = data.toString().trim().toLowerCase();
            if (answer === 'y') {
                process.stdout.write('Please provide the absolute path to your existing application: ');
                process.stdin.once('data', (appPathData) => {
                    resolve(appPathData.toString().trim());
                });
            }
            else {
                resolve(''); // Not a brownfield project
            }
        });
    });
}
