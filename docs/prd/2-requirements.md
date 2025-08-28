# 2. Requirements

## Functional

1.  **FR1:** The system must provide a command-line scaffolding tool, executable directly from a GitHub repository via `npx github:user/repo`, to initialize the development environment.
2.  **FR2:** The scaffolding tool must initiate an interactive setup session that prompts the user to specify the installation directory (defaulting to `./ai-dev-environment`) and whether the project is greenfield (new) or brownfield (existing). If the chosen directory already exists, the tool must append a number (e.g., `-1`, `-2`) until a unique directory name is found.
3.  **FR3:** If the project is "Brownfield", the tool must prompt the user for the path to their existing project code and ask whether to **move** or **copy** the code into the new environment structure.
4.  **FR4:** Based on the user's input, the tool must generate a complete project structure including a `docker-compose.yaml`, a `dev` container definition, a `Makefile`, and placeholder documentation files tailored for the selected project type.
5.  **FR5:** Upon completion of scaffolding, the tool must output a clear message instructing the user on how to build and start the containerized environment (e.g., `docker-compose up --build`).
6.  **FR6:** The resulting environment must include an Automated Context Generation tool that can scan an existing codebase to create baseline documentation.
7.  **FR7:** The resulting environment must include an "Interviewer Agent" that can be launched to interactively create more complex context documents (e.g., architecture, glossary).
8.  **FR8:** The scaffolding process must run `npx bmad-method install` to configure the core agentic framework for both Gemini and Claude CLIs.

## Non-Functional

1.  **NFR1:** The solution must primarily target developers on Linux and macOS.
2.  **NFR2:** Windows users must be supported via the Windows Subsystem for Linux (WSL2).
3.  **NFR3:** The developer's host machine must have Docker, Docker Compose, and Node.js installed as prerequisites.
4.  **NFR4:** The scaffolding script will be developed using Node.js.
5.  **NFR5:** The core agentic tools provided within the dev container will be Python-based, leveraging the BMAD Method framework.
6.  **NFR6:** The environment will use a decoupled, multi-container Docker architecture.

---
