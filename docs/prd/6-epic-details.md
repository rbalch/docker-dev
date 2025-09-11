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

**Story 1.5: Feedback Cleanup**

*   As a developer,
*   I want to address feedback and cleanup tasks after initial tool usage,
*   so that the developer experience is improved and the tool is more robust.

**Acceptance Criteria:**
1.  `rsync` is added for brownfield projects and a check is in place to ensure it is installed.
2.  When a brownfield project is detected, the user is asked if they are using Vercel and the container is configured accordingly.
3.  The proxy is correctly configured in `docker-compose.yaml`.
4.  Post-installation notes are clearer and provide more detail.
5.  An empty `.env` file is created.
6.  The `.bmad-flattenignore` file is copied from the templates.

## Epic 2 (Revised): Foundational ADK Integration & Deployment

**Goal:** Empower developers to build and deploy Google ADK-based agents by integrating foundational ADK tooling and a sample agent into the project scaffolding.

**Story 2.1: Integrate ADK Library and "Hello Agent" Sample**
*   **As a developer,** I want the Google ADK library installed in my dev environment and a runnable "hello world" agent provided,
*   **so that** I can immediately start experimenting with the ADK's core functionality.
*   **Acceptance Criteria:**
    1.  The `google-adk` pip package is included in the `dev` container's dependencies.
    2.  A new directory `adk/agents` is created containing a runnable `hello_agent.py`.
    3.  A `Makefile` command (`make run-hello-agent`) is available to execute the sample agent locally.

**Story 2.2: Implement ADK Scaffolding in Installer**
*   **As a developer,** I want the project installer to ask if I want to include ADK support, and have a flag for non-interactive setup,
*   **so that** the necessary ADK files and configurations are automatically and easily generated for me.
*   **Acceptance Criteria:**
    1.  The interactive installer includes a prompt asking the user if they want to add Google ADK support.
    2.  The `npx` command accepts an `--adk-setup` flag to enable this non-interactively.
    3.  If yes (or if the flag is present), the tool creates the `/adk` directory structure, including the sample agent and a default `adk/config.yaml`.

**Story 2.3: Create Basic Agent Engine Deployment Script**
*   **As a developer,** I want a simple script to deploy the sample agent to the Google Agent Engine,
*   **so that** I can quickly test the path from local development to a cloud-hosted agent.
*   **Acceptance Criteria:**
    1.  The sample `hello_agent.py` is appropriately wrapped in an `AdkApp` object for deployment.
    2.  A `Makefile` command (`make deploy-agent-engine`) is created.
    3.  The command uses the `adk` CLI or the Vertex AI SDK to deploy the `AdkApp` to Agent Engine.
    4.  The script prompts for necessary GCP configuration (Project ID, Region) if not already set.

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
