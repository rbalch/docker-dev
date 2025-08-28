# 11. Backend Architecture (Agentic Toolchain)

## Service Architecture

The backend is not a traditional, long-running server. Instead, it's a command-line application architecture centered around the `gemini-cli` and the BMAD framework.

The core components are:
*   **CLI Entry Point:** The `gemini-cli` command itself, which parses user commands like `agent run <agent_name>`.
*   **Agent Loader:** Responsible for reading an agent's definition file (e.g., from `.bmad-core/agents/`) and constructing the agent persona with its specific tools and instructions.
*   **Task Executor:** A component that reads and executes the steps defined in a task file (e.g., from `.bmad-core/tasks/`).
*   **Tool Registry:** Provides the active agent with access to its available tools (`read_file`, `write_file`, `run_shell_command`, etc.) and handles their execution.
*   **LLM Client:** A dedicated module that manages all communication with the external LLM APIs (Google, Anthropic), including formatting prompts and handling responses.

## Database Architecture

Not applicable. The agentic backend is stateless and does not use a database. It interacts with the local filesystem as directed by its tasks.

## Authentication and Authorization

Authentication is focused on securing access to the external LLM APIs.

*   **Method:** API Key Authentication.
*   **Implementation:** The `gemini-cli` will be configured to read API keys from environment variables within the `dev` container (e.g., `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`).
*   **User Setup:** A `.env.example` file will be included in the generated project, instructing the user on which environment variables they need to create in a `.env` file to grant the agents API access. The `docker-compose.yaml` will be configured to load this `.env` file automatically.

---
