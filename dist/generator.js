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
exports.generateProject = generateProject;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
// Note: __dirname is not available in ES modules by default. 
// This will work with our current tsconfig.json (module: commonjs)
const TEMPLATE_DIR = path.resolve(__dirname, '../template');
async function copyTemplateDir(dirName, destPath) {
    const sourceDir = path.join(TEMPLATE_DIR, dirName);
    const destDir = path.join(destPath, dirName);
    await fs.cp(sourceDir, destDir, { recursive: true });
}
async function copyTemplateFile(fileName, destName, destPath) {
    const sourceFile = path.join(TEMPLATE_DIR, fileName);
    const destFile = path.join(destPath, destName);
    await fs.copyFile(sourceFile, destFile);
}
async function processDockerCompose(config, destPath) {
    const sourceFile = path.join(TEMPLATE_DIR, 'docker-compose.template.yaml');
    const destFile = path.join(destPath, 'docker-compose.yaml');
    let fileContents = await fs.readFile(sourceFile, 'utf8');
    if (config.projectType === 'greenfield') {
        // For greenfield projects, remove the commented-out 'app' service to keep the file clean.
        const appServiceRegex = /\n  # The \'app\' service is for brownfield projects.[\s\S]*/;
        fileContents = fileContents.replace(appServiceRegex, '');
    }
    // For brownfield projects, a future story will handle uncommenting and configuring the app service.
    await fs.writeFile(destFile, fileContents);
}
async function generateProject(config) {
    const destPath = path.resolve(process.cwd(), config.installPath);
    // Create the root project directory
    console.log(`✅ Creating project directory at ${destPath}...`);
    await fs.mkdir(destPath, { recursive: true });
    // Copy template files and directories
    console.log('✅ Generating Docker and Makefile configurations...');
    await copyTemplateDir('dev', destPath);
    await copyTemplateFile('Makefile.template', 'Makefile', destPath);
    // Process and create the docker-compose.yaml
    await processDockerCompose(config, destPath);
    console.log('✅ Project files generated.');
}
