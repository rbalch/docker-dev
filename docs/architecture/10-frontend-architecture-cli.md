# 10. Frontend Architecture (CLI)

## Code Organization

To keep the CLI logic clean and maintainable, the code will be organized into distinct modules, each with a single responsibility.

```
src/
├── index.ts          # Main entry point, orchestrates the workflow
├── prompts.ts        # Defines all interactive prompts using Inquirer.js
├── config.ts         # Logic for building the ScaffoldingConfig object
├── generator.ts      # Handles all file creation and template copying
└── installer.ts      # Logic for running external commands like 'npx'
```

## State Management Architecture

The "state" of our application is the `ScaffoldingConfig` object. The management of this state is simple and follows a unidirectional flow:

1.  The `prompts.ts` module gathers input from the user.
2.  The `config.ts` module uses this input to create a single, immutable `ScaffoldingConfig` object.
3.  This `config` object is then passed as an argument to the `generator.ts` and `installer.ts` modules, which use it to perform their tasks.

There is no complex, shared global state.

## Routing Architecture

Not applicable. As a command-line tool, the application follows a single, linear execution path defined in `index.ts`, not a complex routing system like a web application.

## Services Layer (System Interaction)

The "services" for our CLI are the modules that interact directly with the host machine's filesystem and shell. This logic will be abstracted into specific functions.

*   **Filesystem Service:** A wrapper around Node.js's `fs` and `path` modules to handle creating directories, copying template files, and moving the user's existing code for brownfield projects.
*   **Shell Service:** A wrapper around Node.js's `child_process` module used to execute external commands, specifically `npx bmad-method install`. This service will also be responsible for capturing and displaying output from that command.

---
