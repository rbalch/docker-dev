# 19. Monitoring and Support

## Monitoring and Feedback

Direct, real-time monitoring of a local CLI tool is not feasible. Instead, our "monitoring" will be a user-driven feedback loop.

*   **Feedback Mechanism:** We will include a `--feedback` flag on the CLI tool. When run (e.g., `npx github:user/repo --feedback`), it will open the user's default browser to a pre-filled GitHub Issue template in our project repository.
*   **Prompting for Feedback:** The final success message will include a line encouraging users to provide feedback on their experience.

## Observability and Debugging

Our ability to observe and debug issues relies on the quality of our logging.

*   **Error Logging:** As defined in the Error Handling Strategy, any failure will generate a structured `scaffold-error.log` file. This file is the single most important artifact for debugging.
*   **Issue Template:** The GitHub Issue template will explicitly ask the user to paste the contents of their `scaffold-error.log` file when reporting a bug.

## Support Plan

We will provide a tiered support process.

*   **Level 1: Self-Serve:** The CLI itself is the first line of support. Clear, actionable error messages will guide the user to solve common problems on their own (e.g., "Permission denied. Please check your folder permissions.").
*   **Level 2: Asynchronous Support (GitHub Issues):** For any other issues, users will be directed to create a GitHub Issue. The development team will monitor this repository and respond to issues.
*   **Level 3: Direct Support:** For urgent or critical issues, a dedicated Slack channel (e.g., `#ai-starter-kit-support`) will be the point of contact.
