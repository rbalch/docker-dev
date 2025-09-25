# Gemini Code Assistant Context

This document provides context for the Gemini Code Assistant to understand the project structure, development conventions, and key commands.

## Project Overview

This is a CLI tool for scaffolding containerized AI development environments. It supports both greenfield (new) and brownfield (existing application) project setups. The tool is built with TypeScript and uses Docker for containerization. It also integrates a framework called "BMAD" (Be More Agentic Development) for AI agent-based development.

The main functionality is in the `src` directory. The entry point is `src/index.ts`, which handles command-line argument parsing and orchestrates the project generation process. The `src/generator.ts` file is responsible for copying the template files from the `template` directory to the new project directory. The `src/prompts.ts` file handles the interactive prompts for the user.

## Building and Running

The following commands are used to build, run, and test the project:

*   **Build:** `npm run build` (compiles TypeScript to JavaScript)
*   **Run:** `npm start` (builds and runs the CLI tool)
*   **Test:** `npm test` (runs unit tests with Jest)
*   **End-to-end Test:** `npm run e2e` (runs end-to-end tests with BATS)

## Development Conventions

*   **Code Style:** The project uses Prettier for code formatting. The configuration is in the `.prettierrc` file.
*   **Linting:** The project uses ESLint for linting. The configuration is in the `.eslintrc.js` file.
*   **Testing:** The project uses Jest for unit tests and BATS for end-to-end tests. Test files are located in the `tests` directory.
*   **Dependency Management:** The project uses npm for dependency management. The dependencies are listed in the `package.json` file.
*   **Containerization:** The project uses Docker for containerization. The Docker configuration is in the `dev` directory. The `docker-compose.yaml` file defines the services.
*   **Makefile:** The project uses a `Makefile` to simplify Docker commands.
