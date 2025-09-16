# 17. Coding Standards (Revised)

## TypeScript Standards (Scaffolding CLI)

*   **Single Responsibility Principle:** Each file in the `src/` directory must have a single, clear responsibility.
*   **Immutable Config:** The `ScaffoldingConfig` object, once created, should be treated as immutable.
*   **Service Abstraction:** All direct interactions with the host system must be wrapped in our "Service Layer" modules.
*   **Centralized Strings:** User-facing strings should be centralized in a `constants.ts` file.

### Naming Conventions

| Element | Convention | Example |
| :--- | :--- | :--- |
| Files & Directories | `kebab-case` | `src/file-generator.ts` |
| TypeScript Interfaces | `PascalCase` | `interface ScaffoldingConfig { ... }` |
| Functions & Variables | `camelCase` | `function generateProject(config) { ... }` |
| Constants | `UPPER_SNAKE_CASE` | `const DEFAULT_PROJECT_NAME = 'my-ai-project';` |

## Python Standards (Agentic Framework)

The Python code for the agentic framework will be linted and formatted using `ruff`. A `ruff.toml` or `pyproject.toml` file will be configured in the `dev/` template to enforce these standards.

*   **Formatting:** The `ruff format` command is the absolute source of truth. Key style choices include a max line length of 120 characters and using single quotes (`'`) for strings.
*   **Linting:** `ruff check` will be used with a comprehensive set of rules (including pycodestyle, Pyflakes, and isort).
*   **Mandatory Type Hinting:** All function and method signatures **must** include type hints. This is non-negotiable, as it is critical for both human and AI understanding of the code.
*   **Docstrings:** Every public module, class, and function must have a Google-style docstring explaining its purpose, arguments, and return value.
*   **Modularity:** Agent tools should be small, single-purpose functions. Complex logic should be broken down into helper functions, each with clear inputs and outputs.

---
