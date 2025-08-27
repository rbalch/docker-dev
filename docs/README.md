# AI Development Environment & Starter Kit

## 1. Overview

This project provides a comprehensive, container-based development environment designed to supercharge your workflow for both new and existing projects. It offers a guided process to get the most out of agentic coding, ensuring you can leverage AI developers effectively and safely. Fully integrated with VS Code and supporting multiple LLM models, it gives you maximum flexibility. By using a Docker-native approach, each project gets its own isolated environment, allowing you to switch between contexts seamlessly without cluttering your host machine or worrying about conflicting dependencies.

## 2. Getting Started

This project is initialized using a scaffolding script. The first command you'll run is:

```bash
npx @your-org/create-ai-project
```

**Note for Enterprise Users:** To use this command with a private repository on GitHub Enterprise, you must have your SSH keys configured correctly in your local environment. The script uses `git+ssh` to securely fetch the template. For example:

```bash
# Example for a private repo on a corporate GitHub instance
npx git+ssh://git@github.your-corp.com/your-org/create-ai-project.git
```

The script will then guide you through the following setup process:
1.  It will ask if you are starting a **new (greenfield)** project or integrating with an **existing (brownfield)** one.
2.  It will check for file collisions to avoid overwriting your work.
3.  It will create a `docs/` directory with placeholder documents for essential context (e.g., `architecture.md`, `glossary.md`).
4.  Based on your project type, it will configure your Docker environment, treating your application as a separate service for maximum compatibility.
5.  Finally, it will build your containerized development environment, leaving you ready to code.

## 3. Our Philosophy: A Great Starting Point, Not a Subscription

After much consideration, we have adopted a "scaffolding" approach rather than a "library" approach. This means we provide you with the best possible starting template, but we do not support automated updates after initialization. 

**Why?** We believe that every project is unique and that you will, and should, heavily customize this environment to fit your needs. Providing automated updates would be incredibly complex and would likely break your custom work. We would rather give you a fantastic, clean starting point that you can own and adapt freely.

## 4. Core Concepts

### The Containerized Environment

This starter kit provides a fully containerized development environment using Docker. This means all dependencies, tooling, and configurations are isolated from your host machine, allowing you to switch between projects without worrying about version conflicts or clutter. The environment is defined in the `docker-compose.yaml` and the `dev/` directory.

### Automated Context Generation

Before an AI agent can work effectively on a codebase, it needs context. The scaffolding script will create a `docs/` directory and populate it with placeholder files for the essential context documents. Your first task is to fill these in. The five key documents are:

1.  **Project Name & History:** A brief overview of the project's purpose and past.
2.  **Glossary:** Definitions for special terms, acronyms, or user types specific to your domain.
3.  **Architecture Document:** A high-level description of the system's design.
4.  **Code Style Guide:** Any project-specific coding conventions.
5.  **File/Code Outline:** A map of the source tree, explaining where key functionality is located.

Don't worry if you don't have these. The **Interviewer Agent** (described below) is designed to help you create them.

### The Interviewer Agent

What if you don't have an `architecture.md` file for your project? Our tooling helps you create it. If the Automated Context Generation tool finds that a critical document is missing, it will launch an interactive "Interviewer Agent." This agent will ask you a series of targeted questions about your project and generate the missing document for you, turning a potential blocker into a simple, guided process.

## 4. How-To Guides

*   [How to Assign Your First Task to an Agent](guides/assigning-tasks.md)
*   [How to Update the Starter Kit](guides/updating.md)

## 5. Reference

*   [Configuration](reference/config.md)
*   [Commands](reference/commands.md)
