# Brainstorming Session Results

**Session Date:** 2025-08-27
**Facilitator:** Business Analyst Mary
**Participant:** User

---

## Executive Summary

**Topic:** Templatize how to contextualize projects from an existing codebase to prep for AI development.

**Session Goals:** Brainstorm the structure and components of a portable, Docker-based "AI Dev Starter Kit" that can be used for new or existing projects.

**Techniques Used:** 
- Mind Mapping

**Total Ideas Generated:** TBD

### Key Themes Identified:
- TBD

---

## Technique Sessions

### Mind Mapping - TBD

**Description:** Starting with a central concept and suggesting branches to build a map of ideas.

**Ideas Generated:**

*   **Core Goal: Environment Consistency & Portability**
    *   Solves "it works on my machine."
    *   Handles all dependencies (node, python, etc.).
    *   Enables easy context switching and long-term stability.
*   **Centralized Practices & Tooling**
    *   A single source of truth for best practices.
    *   Centrally updatable docs and tools.
*   **Greenfield Project Workflow**
    *   A defined process for starting new projects with this kit.
*   **Brownfield Project Workflow**
    *   A strategy for integrating the kit with large, existing codebases.
    *   **Integration Method Exploration:**
        *   **Method 1: Make Starter Kit the Primary Repo**
            *   *Pros:* Easy to pull updates from the template; conceptually "wraps" the user's code (e.g., in an `/app` dir); allows for unlimited customization.
            *   *Cons:* The update/customization conflict (customizations prevent easy updates); potential friction for devs new to Docker; devs might hate a "migration" commit.
            *   *Idea:* Could an agent help with the initial containerization?
        *   **Method 2: NPX-style Installer Script**
            *   An installer that injects the starter kit files into an existing project.
            *   *Pros:* Smartly complains about overlapping files; seamlessly injects itself into the repo.
            *   *Cons:* Still assumes Docker; writes a lot of files; the update problem is punted on (this is a design choice).
            *   **Scaffolding Script Workflow:**
                1. Ask if it's a greenfield or brownfield project.
                2. Check for file/folder collisions and fail gracefully if found.
                3. Ask for the location of existing docs, or create a `docs/` directory.
                *   **Handling `pyproject.toml` and Dependencies:**
                *   The script will NOT merge `pyproject.toml` files.
                *   **Greenfield:** The `dev/pyproject.toml` from the template is used as the project's primary dependency file.
                *   **Brownfield:** The user's application is treated as a separate Docker service (`app`). The script will ask for the path to their code and `Dockerfile`, then configure the `app` service in `docker-compose.yaml`. Our `dev` container and their `app` container remain decoupled, each with its own dependencies.
                5. Write the core environment files: `/dev`, `docker-compose.yaml`, `Makefile`, `.gemini/`, `.claude/`.
                6. Create or update a `.env` file for local configuration.
                7. Run `docker compose build` to assemble the final environment.
        *   **Method 3: Git Submodule/Subtree**
        *   **Method 4: `rsync` or copy-in script**
*   **Developer Experience (DevEx) & Integration**
    *   Meets devs where they are (autocomplete, agents, CLI).
    *   Encourages best practices without disrupting existing workflows.
    *   **Agent-Driven Development Workflow:**
        *   How do agents get context on existing code?
        *   How are tasks assigned (ticketing integration)?
        *   What is the day-to-day developer process?
        *   **Step 1: Automated Context Generation**
            *   A tool (like the BMAD code flattener) that runs and indexes the entire codebase.
            *   Outputs local markdown files for agents to easily access.
            *   **Required Context Documents:**
                1.  Project Name & History
                2.  Glossary (special terms, acronyms, user types)
                3.  Architecture Document
                4.  Code Style Guide
                5.  File/Code Outline (source tree map)
            *   **Handling Missing Docs: The Interviewer Agent**
                *   If a human-knowledge doc (e.g., architecture) is missing, the tool doesn't fail.
                *   Instead, it launches an interactive agent (based on BMAD method) that interviews the developer.
                *   This agent asks targeted questions to build the missing document from scratch.

**Notable Connections:**

---

### Reverse Brainstorming - TBD

**Description:** Identifying potential problems and failures to proactively design more robust solutions.

**Ideas Generated (Failure Points):**

*   It's unreliable and doesn't do its job well.
*   **It's hard to update and get new features/best practices.**
    *   *The Core Problem:* Anything other than a single, non-destructive command to update is considered too hard. The process should feel like a simple package upgrade, not a manual migration.
*   It's too rigid and developers find themselves constantly fighting it or working around it because it doesn't support their preferred style/flow.
*   From the company's perspective, it fails if it doesn't actually encourage adoption of the new AI agents and tooling, losing the promised benefits of quality and speed.

**Notable Connections:**

---
