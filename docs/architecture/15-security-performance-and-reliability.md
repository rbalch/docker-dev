# 15. Security, Performance, and Reliability

## Security Requirements

*   **Dependency Scanning:** The project's Node.js dependencies must be regularly scanned for vulnerabilities using `npm audit` and GitHub Dependabot alerts.
*   **Secure Template Access:** The use of `git+ssh` to access the private GitHub Enterprise repository ensures that only authorized users can download the source template.
*   **API Key Security:** LLM API keys must **never** be hardcoded. The generated project will load them from a `.env` file, which will be explicitly listed in the `.gitignore` to prevent accidental commits.
*   **Filesystem Sandboxing:** The scaffolding script must confine all its file operations (read, write, copy, move) to the user-specified installation directory and the user-provided brownfield directory. It must not access any other part of the user's filesystem.
*   **Input Sanitization:** All user input that might be used in shell commands or file paths must be rigorously sanitized to prevent command injection or path traversal vulnerabilities.

## Performance Requirements

*   **Scaffolding Time:** The end-to-end scaffolding process, from the first prompt to the final success message, should complete in **under 60 seconds**, assuming a standard developer laptop and a high-speed internet connection. (This excludes the one-time `npx` package download).
*   **Interactive Responsiveness:** Each interactive prompt should appear within **500ms** of the user answering the previous one. The tool should feel snappy and responsive.
*   **Resource Usage:** The Node.js script should be lightweight and not cause significant spikes in CPU or memory usage on the host machine.

## Reliability Requirements

*   **Graceful Failure:** If any step of the process fails (e.g., a directory is not writable, a network command fails), the script must exit gracefully with a clear, user-friendly error message that suggests a solution.
*   **Cleanup on Failure:** If the script fails mid-way, it should attempt to clean up any directories or files it created to avoid leaving the user's system in a partially-scaffolded state.
*   **Prerequisite Checks:** The script must perform an upfront check for the presence of `git`, `docker`, and `node` on the host machine. If a dependency is missing, it must exit immediately with a helpful message.

---
