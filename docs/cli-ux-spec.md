## CLI User Experience Specification

### **Phase 1: Initialization**

When the user runs `npx <github-repo-url>`, this is what they'll see.

```text
👋 Welcome to the AI Dev Starter Kit!

I'm going to ask you a couple of questions to set up your project.
Let's get you and your new AI coding partner up and running.

Press Enter to continue...
```

### **Phase 2: Configuration**

This phase covers the interactive questions.

**Prompt 1: Installation Directory**

```text
First, where should I set up your project?
(I'll create this folder if it doesn't exist.)

➡️  Enter path (default: ./ai-dev-environment): 
```
*   **Interaction:** The user can type a path or just hit Enter to accept the default.

**Prompt 2: Project Type**

```text
Got it. Now, what kind of project is this?
(Use arrow keys to select, Enter to confirm)

  ◯ Greenfield (A brand new project, starting from scratch)
❯ ◉ Brownfield (An existing project you want to bring into the environment)
```
*   **Interaction:** A classic radio button selection. "Brownfield" is the default.

**Prompt 3: Existing Project Path (Conditional)**

*This prompt only appears if the user selects "Brownfield".*
```text
Okay, a brownfield project. Where is the root folder of your existing application?

➡️  Enter path to your project: 
```
*   **Interaction:** The user must enter a valid path to their existing code.

**Prompt 4: Import Method (Conditional)**

*This prompt only appears if the user selects "Brownfield".*
```text
And how should I import that code? I can either copy it, which is safer, or move it, which is faster.

(Use arrow keys to select, Enter to confirm)

❯ ◉ Copy the code into the new environment (Safer, recommended)
  ◯ Move the code into the new environment (Faster, but modifies original location)
```
*   **Interaction:** A radio button selection to choose between copying and moving the project files.

### **Phase 3: Execution & Feedback**

This phase provides clear, step-by-step feedback while the tool works.

```text
Perfect. I've got everything I need. Sit back and relax while I work my magic...

✅ Creating project directory at ./ai-dev-environment
✅ Generating Docker and Makefile configurations...
✅ Copying dev environment assets...
✅ Creating placeholder docs...
✅ Installing core agentic framework with 'npx bmad-method install'...
   (This might take a moment, grabbing the latest and greatest for you.)

```

### **Phase 4: Completion & Handoff (Revised)**

```text
✨ All done! Your new AI development environment is ready to go.

Here's what to do next:

1.  **Navigate to your project directory:**
    `cd ./ai-dev-environment`

2.  **Build and start the environment:**
    `docker-compose up --build`

3.  **Open a new terminal and jump into the dev container:**
    `docker-compose exec dev zsh`

4.  **Once inside, launch the main CLI to start chatting with your new partner:**
    `gemini-cli`

For tips on the best way to connect VS Code to your new environment, check out the guide I've prepared for you at: `docs/vscode-integration.md`
```
