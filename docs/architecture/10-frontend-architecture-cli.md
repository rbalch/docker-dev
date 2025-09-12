# 10. Frontend Architecture (CLI)

## Code Organization

To keep the CLI logic clean and maintainable, the code is organized into distinct modules, each with a single responsibility.

```
src/
├── index.ts          # Main entry point, orchestrates the workflow
├── prompts.ts        # Defines all interactive prompts using Inquirer.js
├── config.ts         # Logic for building the ScaffoldingConfig object
├── generator.ts      # Handles all file creation and template copying
├── installer.ts      # Logic for running external commands (installers, flatteners)
└── docker.ts         # Logic for interacting with the Docker daemon (e.g., volume checks)
```

## State Management Architecture

The "state" of our application is the `ScaffoldingConfig` object. The management of this state is simple and follows a unidirectional flow:

1.  The `prompts.ts` module gathers input from the user.
2.  The `config.ts` module uses this input to create a single, immutable `ScaffoldingConfig` object.
3.  This `config` object is then passed as an argument to the `generator.ts`, `installer.ts`, and `docker.ts` modules, which use it to perform their tasks.

There is no complex, shared global state.

## Routing Architecture

Not applicable. As a command-line tool, the application follows a single, linear execution path defined in `index.ts`, not a complex routing system like a web application.

## Services Layer (System Interaction)

The "services" for our CLI are modules that interact directly with the host machine's filesystem and shell. Rather than being abstracted into generic services (e.g., "Filesystem Service"), this logic is organized by feature into the following files:

*   **`generator.ts`:** Contains all logic for creating directories and creating/copying/modifying files (e.g., `Makefile`, `docker-compose.yaml`) using libraries like `fs/promises` and `fs-extra`.
*   **`installer.ts`:** Wraps `child_process` to execute external shell commands, such as running the `npx bmad-method install` and `npx bmad-method flatten` commands. It is responsible for orchestrating these external processes.
*   **`docker.ts`:** Wraps `child_process` to execute `docker` commands, specifically to check for and create required Docker volumes before the main environment is built.

---
