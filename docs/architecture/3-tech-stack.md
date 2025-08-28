# 3. Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **CLI Language** | TypeScript | latest | Language for the scaffolding script | Provides type safety and modern features for a robust Node.js application. |
| **CLI Framework** | Inquirer.js | latest | Interactive command-line prompts | A robust and popular library for creating the interactive Q&A experience. |
| **Agent Language** | Python | 3.11+ | Language for the agentic tools | The standard for AI/ML development and the language of the BMAD framework. |
| **Agent Framework**| gemini-cli | latest | Core framework for agent interaction | The chosen tool for defining and running agentic workflows. |
| **Authentication** | Git over SSH | N/A | Securely pulling the template | Uses the developer's existing SSH keys for seamless, secure access to the private repo. |
| **CLI Testing** | Jest | latest | Testing the Node.js scaffolding script | A popular, all-in-one testing framework for JavaScript and TypeScript. |
| **Agent Testing** | pytest | latest | Testing the Python-based agents | The standard, powerful testing framework for Python applications. |
| **E2E Testing** | bats-core | latest | End-to-end testing of the `npx` command | A lightweight shell script testing framework ideal for testing CLI behavior. |
| **IaC Tool** | Docker Compose | v2+ | Defining the multi-container environment | The standard tool for local container orchestration, as defined in the PRD. |
| **CI/CD** | GitHub Actions | N/A | Automated testing and releases | Native to our source control and powerful enough for our needs. |
| **Logging** | pino | latest | Structured logging for the CLI tool | Provides fast, structured logging, which is useful for debugging the scaffolding process. |

---
