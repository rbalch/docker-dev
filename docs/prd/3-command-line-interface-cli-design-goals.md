# 3. Command-Line Interface (CLI) Design Goals

## Overall UX Vision

The command-line tool should provide a smooth, guided, and intuitive setup experience. It should feel less like a static script and more like a helpful assistant, making it easy for the user to make the right choices without feeling overwhelmed.

## Key Interaction Paradigms

*   **Interactive Q&A:** The tool will primarily use an interactive question-and-answer model to gather the necessary configuration details from the user.
*   **Sensible Defaults:** Every prompt requiring user input must provide a sensible, clearly indicated default value. The user should be able to accept the default by simply pressing the Enter key, streamlining the process for standard setups.
*   **Modern Input Controls:** Where appropriate, the tool should utilize modern CLI input primitives like radio buttons for single-choice selections (e.g., greenfield vs. brownfield) and select lists for options, rather than relying solely on text entry.

## Core Interaction Points

*   **Welcome & Introduction:** A brief introduction to the tool and what it does.
*   **Configuration:** The series of questions to determine directory, project type, etc.
*   **Execution & Feedback:** Clear status updates as it generates files, installs dependencies, etc.
*   **Completion:** A final summary of what was done and clear instructions on the next steps (as defined in FR4).

---
