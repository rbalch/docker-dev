# 6. Epic Details

## Epic 1: Foundational Scaffolding & Interactive Setup

**Goal:** Establish the core `npx` command and the interactive setup flow (asking for directory, project type, etc.) to generate a correct, project-specific file structure on the user's local machine.

**Story 1.1: Initialize Project Scaffolding via NPX**

*   As a developer,
*   I want to run a single `npx` command pointing to a GitHub repository,
*   so that I can kick off the creation of my AI-powered development environment from anywhere on my machine.

**Acceptance Criteria:**
1.  Running `npx <github-repo-url>` successfully executes the scaffolding script without cloning the repo manually.
2.  The script displays a welcome message and a brief, clear explanation of its purpose.
3.  If a prerequisite (Node.js, Docker) is missing, the script must exit gracefully and inform the user what is needed.

**Story 1.2: Interactively Configure Project Settings**

*   As a developer,
*   I want the scaffolding tool to ask me key questions about my project,
*   so that the generated environment is tailored to my specific needs.

**Acceptance Criteria:**
1.  The script prompts for the target installation directory, offering the current directory as a default.
2.  The script uses a radio-button style selection to ask if the project is "Greenfield" (new) or "Brownfield" (existing).
3.  The user's selections for directory and project type are correctly captured and used in subsequent steps.

**Story 1.3: Generate Tailored File Structure**

*   As a developer,
*   I want the tool to generate a complete file and directory structure based on my configuration,
*   so that I have a clean, organized, and appropriate starting point for my project.

**Acceptance Criteria:**
1.  The tool creates the specified target directory.
2.  A `docker-compose.yaml` file is generated in the root.
3.  The entire `dev/` directory from the template repository is copied into the target directory.
4.  A `Makefile` with common commands is created in the root.
5.  If the project is "Brownfield" and a `Makefile` already exists, the script must prompt the user for a new filename, suggesting a descriptive default like `Makefile.bmad`.
6.  A `docs` directory with placeholder documents is created.
7.  The generated `docker-compose.yaml` is appropriately configured for a "Greenfield" or "Brownfield" project based on the user's choice.

## Epic 2: Containerization & Environment Bootstrapping

**Status: Done**
*(This epic was completed as part of the initial implementation of the CLI tool.)*

**Goal:** Take the generated file structure and enable the creation of a fully containerized development environment, including the installation of the BMAD agentic framework via `npx bmad-method install`.

**Story 2.1: Install Core Agentic Framework**

*   As a developer,
*   I want the scaffolding tool to automatically run the `npx bmad-method install` command,
*   so that the core framework and agent personas are installed and configured without manual intervention.

**Acceptance Criteria:**
1.  The script executes `npx bmad-method install` within the newly created project directory.
2.  The command successfully creates the `.bmad-core` directory and populates it with the necessary agent and task definitions.
3.  The script verifies that the installation was successful (e.g., by checking for a key file like `.bmad-core/core-config.yaml`).
4.  Output from the installation command is displayed to the user for transparency.

**Story 2.2: Provide Final Instructions to Launch Environment**

*   As a developer,
*   I want the tool to give me a clear, final instruction after it's finished,
*   so that I know exactly how to build and enter my new development environment.

**Acceptance Criteria:**
1.  After all file generation and installation steps are complete, the script displays a prominent success message.
2.  The message includes the exact command needed to build and start the containers (e.g., `docker-compose up --build`).
3.  The message also includes the command to enter the running development container (e.g., `docker-compose exec dev bash`).
4.  The script then exits cleanly with a status code of 0.

## Epic 3: Core Agentic Tooling Integration (Revised)

**Goal:** Integrate and expose the core AI-powered tools (Automated Context Generation and the Interviewer Agent) via the `gemini-cli` within the running containerized environment.

**Story 3.1: Access Automated Context Generation Tool**

*   As a developer,
*   I want a `gemini-cli` command inside the dev container to automatically scan my application code,
*   so that I can generate baseline documentation and context for the AI agents.

**Acceptance Criteria:**
1.  A clear `gemini-cli` command (e.g., `gemini context generate`) is available in the `dev` container's PATH.
2.  For brownfield projects, running the command successfully scans the code in the user's application directory.
3.  The tool generates initial drafts of key documents (e.g., `architecture.md`, `glossary.md`) based on the code scan.
4.  The command provides clear feedback on which files were scanned and which documents were created or updated.

**Story 3.2: Access Interactive Interviewer Agent**

*   As a developer,
*   I want a `gemini-cli` command inside the dev container to launch an interactive "Interviewer Agent",
*   so that I can be guided through creating the more complex context documents required for effective AI collaboration.

**Acceptance Criteria:**
1.  A clear `gemini-cli` command (e.g., `gemini agent run interviewer`) is available in the `dev` container's PATH.
2.  Running the command starts an interactive Q&A session in the terminal.
3.  The agent asks targeted questions to help the user fill out sections of the PRD, Architecture, or other key documents.
4.  The user's answers are used to update the corresponding documentation files in the `docs` directory.
