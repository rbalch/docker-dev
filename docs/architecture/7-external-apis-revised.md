# 7. External APIs (Revised)

This project interacts with the following external services to function.

## 1. GitHub Enterprise

*   **Purpose:** To host both the executable `npx` package for the scaffolding tool **and** the template files that the tool copies. It is the single source for distribution and content.
*   **Documentation:** The documentation for our internal GitHub Enterprise instance.
*   **Authentication:** Via `git+ssh`. The user's local machine must have an SSH key configured with access to the repository.
*   **Integration Notes:** The tool is invoked via `npx github:user/repo`. The script will then use `git` commands internally to clone its own repository's `template` directory.

## 2. Google & Anthropic Large Language Model (LLM) APIs

*   **Purpose:** These are the backend services that power the AI agents within the `gemini-cli`. All agentic reasoning, code generation, and interactive chat will be processed by these external models.
*   **Documentation:** `https://ai.google.dev/docs` and `https://docs.anthropic.com/`
*   **Authentication:** Via API Keys. The user will need to acquire their own API keys and configure them as environment variables for the `dev` container.
*   **Integration Notes:** The `gemini-cli` tool will handle all the direct communication with these APIs.

---
