# 4. Technical Assumptions

## Repository Structure: Monorepo

I'm assuming a **Monorepo** for the starter kit's own source code. This keeps all the scaffolding logic, agent definitions, and templates in a single, easy-to-manage repository, which seems appropriate for a tool that is itself a self-contained product.

## Service Architecture: Decoupled Services

The project brief specifies a **decoupled, multi-container Docker architecture**. This is a critical decision that allows the starter kit's tooling to run in its own `dev` container without interfering with the user's `app` container, which is essential for brownfield projects.

## Testing Requirements: Unit + Integration

For the starter kit tool itself, we'll need both **Unit tests** for the scaffolding logic (e.g., "does it generate the correct file structure?") and **Integration tests** to ensure the generated project builds and runs correctly (e.g., "does `docker-compose up` succeed on a freshly scaffolded project?").

## Additional Technical Assumptions and Requests

*   **Scaffolding Script:** The `npx` script will be developed using **Node.js**.
*   **Agentic Framework:** The core agent tools within the dev container will be **Python-based**, leveraging the BMAD Method framework.
*   **Platform Targets:** The primary targets are **Linux and macOS**. Windows will be supported via **WSL2**.
*   **Prerequisites:** The user's host machine must have **Docker, Docker Compose, and Node.js** installed.
*   **Source Hosting:** The starter kit template will be hosted in a **private GitHub Enterprise repository**.

---
