# Project Brief: AI Dev Starter Kit

---

### Executive Summary

The AI Dev Starter Kit is a comprehensive, container-based development environment designed to standardize and accelerate the adoption of agentic coding practices. It addresses the primary problem of inconsistent, time-consuming setups for both new and existing codebases by providing a replicable, Docker-native environment. The target market is any software development team looking to effectively leverage AI agents in their workflow. The key value proposition is a significant reduction in setup time, enforcement of best practices, and a consistent, high-quality development experience that allows developers and AI agents to become productive immediately.

---

### Problem Statement

In today's development landscape, setting up a robust, consistent, and efficient environment for a new project is a significant source of friction. The problem is magnified when attempting to integrate AI-driven "agentic" coding practices, which have their own unique tooling and context requirements. This friction manifests in several ways:

*   **Technical Friction:** Developers piece together environments manually, leading to the classic "it works on my machine" problem, which complicates debugging and slows collaboration. Onboarding to new or existing projects becomes a bespoke, time-consuming process.
*   **Procedural Friction:** Even with the right tools, developers often don't know *how* to effectively use them. They lack a clear, repeatable process for tasks like providing an AI agent with the right context or managing its workflow. This leads to inconsistent results and a failure to realize the promised gains in speed and quality.
*   **Educational Friction:** Without clear guidance and guardrails, developers are left to discover best practices through trial and error, a slow and often frustrating experience.

Existing solutions like simple boilerplate templates (`git clone`) solve the initial setup but fail to provide a path for updates or procedural guidance. This lack of a standardized, easy-to-use starter kit directly impacts developer velocity and represents a critical blocker to the widespread, effective use of AI in the development lifecycle.

---

### Proposed Solution

We propose the creation of an **AI Dev Starter Kit**, a comprehensive solution delivered via a command-line scaffolding tool. The core concept is to provide a one-command setup (`npx create-ai-project`) that generates a project-specific, containerized development environment, tailored for agentic coding workflows. This approach provides the consistency and power of a standardized environment while maintaining the flexibility for project-specific customization.

Our key differentiators are:
*   **Intelligent Onboarding:** Unlike static templates, our starter kit includes an "Interviewer Agent" that interactively helps developers create the essential context documents (e.g., architecture, glossary) required for effective AI collaboration.
*   **Process-Oriented Design:** The kit doesn't just provide tools; it provides a workflow. By establishing clear guardrails and processes for tasks like context generation, it lowers the educational barrier and helps developers adopt best practices naturally.
*   **Decoupled Brownfield Integration:** For existing projects, we use a service-based Docker architecture. This keeps the starter kit's tooling environment cleanly separated from the application's environment, avoiding dependency conflicts and complex file merging.

This solution will succeed because it directly addresses the procedural and educational friction that other solutions ignore. By making the "hard parts"—context generation and process definition—an automated and guided experience, we can significantly accelerate the adoption and effectiveness of AI-driven development. The high-level vision is for this starter kit to become the default, trusted foundation for any team looking to build, or onboard, a project in the modern AI development landscape.

---

### Target Users

#### Primary User Segment: The Hands-On Developer

*   **Profile:** A mid-to-senior level software developer working as part of a team within a larger organization. They are pragmatic, busy, and focused on shipping code. They are likely working on one or more complex, existing (brownfield) applications.
*   **Current Behaviors:** They currently spend a non-trivial amount of time configuring their local development environment for each new project or task. They are accustomed to a certain set of tools and workflows but are open to new technologies if the value proposition is clear and the adoption cost is low. They are curious about using AI agents but are skeptical and don't have a clear process for it.
*   **Needs and Pain Points:** Their primary need is to reduce setup friction and get to the "real work" of coding faster. They are frustrated by environment inconsistencies ("works on my machine") and the ambiguity of new, complex workflows like agentic coding. They fear that a new standard will be overly rigid and break their preferred way of working.
*   **Goals:** Their goal is to leverage new AI tools to increase their productivity and the quality of their work, without adding significant overhead or a steep learning curve to their process.

#### Secondary User Segment: The Team Lead / Architect

*   **Profile:** A technical leader (e.g., Team Lead, Principal Engineer, Software Architect) responsible for the technical strategy, productivity, and overall quality of a development team.
*   **Current Behaviors:** They spend time evaluating new tools, defining best practices, and looking for ways to reduce friction and standardize processes across their team. They are often the go-to person for solving complex environment or integration issues.
*   **Needs and Pain Points:** They are frustrated by the lack of consistency across their team's local development environments, which leads to increased support load and unpredictable issues. They are concerned that the unguided adoption of AI tools will lead to a "Wild West" of inconsistent practices, creating long-term technical debt. They need solutions that scale and improve the team's collective velocity, not just individual output.
*   **Goals:** Their primary goal is to improve their team's overall productivity and predictability. They want to reduce the time it takes to onboard new developers and ensure that the team adopts new technologies in a way that is consistent, scalable, and aligns with architectural best practices.

---

### Goals & Success Metrics

#### Business Objectives
*   Significantly reduce the time required for a developer to set up a fully functional, containerized development environment for any project.
*   Increase the adoption and effective use of approved agentic coding tools and best practices across all development teams.

#### User Success Metrics
*   **For the Developer:** A developer can successfully initialize the starter kit on a complex brownfield project and have it running quickly and with minimal friction. They report, via qualitative feedback, that the tool provides clear guidance and reduces the cognitive load of starting a new task.
*   **For the Team Lead:** Team leads report a noticeable decrease in time spent debugging environment-specific issues. They can confidently onboard new team members to any project, knowing the setup process is standardized and repeatable.

#### Key Performance Indicators (KPIs)
*   **Time-to-First-Commit (TTFC):** A reduction in the time from a developer starting a new project/task to their first meaningful code commit.
*   **Adoption Rate:** A high percentage of new projects within the organization being initiated using the AI Dev Starter Kit.
*   **Support Ticket Reduction:** A drastic reduction in the number of internal support tickets related to local environment configuration and dependency issues.

---

### MVP Scope

The goal of the Minimum Viable Product (MVP) is to provide a complete onboarding experience for a developer with an existing brownfield project. The MVP must deliver a ready-to-use environment that contains all the necessary tools for AI-driven development.

#### Core Features (Must Have)
*   A command-line scaffolding tool (`npx ...`) that sets up the project structure and copies all necessary template files.
*   As part of the setup, the script will run `npx bmad-method install` to configure the core agentic framework.
*   The script will correctly configure `docker-compose.yaml` for brownfield projects, treating the user's application as a decoupled service.
*   The final step of the script is to build the initial Docker environment.
*   **A suite of Agentic Tools:** The resulting environment must include a set of command-line tools for the developer to use, including:
    *   An **Automated Context Generation** tool that can scan the codebase to create baseline documentation.
    *   An **Interviewer Agent** that a developer can launch to interactively create the more complex context documents.

#### Out of Scope for MVP
*   **Automated Update Mechanism:** A mechanism for automatically updating a project after it has been created is explicitly out of scope.
*   **Support for non-Docker Environments:** The MVP will focus exclusively on the Docker-based workflow.

#### MVP Success Criteria
The MVP will be considered a success if a developer can:
1.  Run the single `npx` command to successfully initialize a containerized environment for their brownfield project.
2.  Immediately after, run a command within the new environment (e.g., `gemini run interview-agent`) to successfully generate a complete set of core context documents.

---

### Post-MVP Vision

While the MVP is focused on delivering a complete and powerful initial onboarding experience, the long-term vision is to evolve this starter kit into a comprehensive platform for AI-assisted development.

#### Phase 2 Features
*   **Deeper IDE Integration:** Move beyond command-line agents to provide a rich user interface within VS Code. This could include buttons or context menu actions to "Generate docs for this file" or "Refactor this function with an AI agent."
*   **Advanced Configuration:** Allow for more granular control over the environment, such as easily switching between multiple LLM providers (e.g., Gemini, Claude, OpenAI) for different tasks.
*   **Automated Dependency Analysis:** Revisit the dependency merging problem with a more sophisticated tool that can suggest changes to a user's `pyproject.toml` or other dependency files, rather than just keeping them separate.

#### Long-term Vision
The starter kit will become the central, standardized platform for the entire AI-driven development lifecycle at our organization. It will not only onboard projects but also provide tools for ongoing maintenance, testing, and deployment. The vision is to create a system where human developers and AI agents collaborate seamlessly, with our platform providing the essential infrastructure and guardrails for that collaboration.

#### Expansion Opportunities
*   **CI/CD Integration:** Provide templates and tools for creating AI-aware CI/CD pipelines, where agents can be tasked with running tests, analyzing build failures, or even performing automated deployments.
*   **Enterprise Dashboard:** A web-based dashboard for Team Leads and managers to view the health, status, and AI activity across all projects that have been onboarded with the starter kit.

---

### Technical Considerations

This section outlines the initial technical plan and assumptions for the MVP. These are not final decisions but represent our current thinking.

#### Platform Requirements
*   **Target Platforms:** The primary target is developers on Linux or macOS. Windows users will be supported via the Windows Subsystem for Linux (WSL2).
*   **Core Dependencies:** The developer's host machine must have Docker, Docker Compose, and Node.js (for `npx`) installed.

#### Technology Preferences
*   **Scaffolding Script:** The `npx` script will be developed using Node.js for maximum portability across developer machines.
*   **Agentic Framework:** The core agent tools provided within the dev container will be Python-based, leveraging the BMAD Method framework.
*   **Template Hosting:** The source-of-truth for the starter kit template will be a private repository on the company's GitHub Enterprise instance.

#### Architecture Considerations
*   **Service Architecture:** The environment will use a decoupled, multi-container Docker architecture. A `dev` service will house the standardized tooling, and an `app` service will run the user's specific application, allowing them to coexist without conflict.
*   **Integration & Authentication:** The scaffolding script will use the `git+ssh` protocol to securely pull the template from the private GitHub Enterprise repository, relying on the user's pre-configured SSH keys for authentication.

---

### Constraints & Assumptions

#### Constraints
*   **Budget & Timeline:** To be determined. The initial MVP will be developed with existing team resources.
*   **Technical:** The solution is fundamentally dependent on Docker. It will not support non-containerized workflows. It also requires developers to have Docker, Docker Compose, and Node.js installed on their host machines.

#### Key Assumptions
*   **Developer Environment:** We assume developers have, or can set up, SSH keys that are authorized to access our internal GitHub Enterprise instance.
*   **Value Proposition:** We assume the long-term productivity gains and standardization benefits for teams will justify the initial investment in building and maintaining this tool.
*   **User Adoption:** We assume developers will be willing to adopt a command-line-driven workflow for the MVP, provided the value is clear.
*   **AI Viability:** We assume that the "Interviewer Agent" can be developed to a point where it generates genuinely useful, high-quality drafts of the required context documents.
*   **Architectural Fit:** We assume the decoupled, service-based Docker architecture is a viable and acceptable pattern for the majority of our existing and future projects.

---

### Risks & Open Questions

#### Key Risks
*   **Adoption Risk:** Developers may resist a new, standardized workflow, viewing it as overly restrictive or disruptive to their personal habits. If the tool isn't perceived as a massive improvement, it won't be adopted.
*   **Technical Risk:** The AI-powered "Interviewer Agent" may prove difficult to implement effectively. If it produces low-quality, generic documentation, it will erode trust and create more work for developers, not less.
*   **Maintenance Risk:** The starter kit itself could become a complex internal product that requires significant time to maintain and support, pulling resources away from other priorities.

#### Open Questions
*   What are the current, real-world baseline metrics for things like "time to first commit" or "time to set up a new project"?
*   What is the best way to gather and measure qualitative feedback on developer satisfaction with the tool?
*   Who will be the long-term owner of this starter kit, responsible for its maintenance and future evolution?

#### Areas Needing Further Research
*   Best practices for building enterprise-grade scaffolding tools with Node.js, particularly regarding authentication with private repositories.
*   Advanced prompting techniques for guiding LLMs to conduct effective, structured interviews for the purpose of technical documentation generation.

---

### Appendices

#### A. Research Summary

Initial research was conducted to determine the best pattern for distributing and maintaining a project starter kit. Three primary models were identified:
1.  **Git Clone / Template Repo:** Simple to start, but offers no path for future updates.
2.  **Scaffolding Tool (e.g., `npx`):** Provides a better, more configurable setup experience. Updates are not part of the model, which aligns with our philosophy of providing a clean start that developers can own.
3.  **Boilerplate-as-a-Library:** Solves the update problem but introduces significant complexity, especially given our reliance on Docker Compose.

Based on this research, the **Scaffolding Tool** approach was selected as the best fit for our goals, balancing ease of use with architectural pragmatism.

#### B. Stakeholder Input
No formal stakeholder feedback has been gathered at this stage of the project.

#### C. References
*   [Detailed Brainstorming Notes](brainstorming-session-results.md)

---

### Next Steps

#### Immediate Actions
1.  Circulate this Project Brief to key stakeholders for initial feedback and buy-in.
2.  Begin technical design and development of the MVP, starting with the `npx` scaffolding script.
3.  Concurrently, begin development of the Python-based "Interviewer Agent" and "Context Generation" tools that will be included in the environment.
4.  Identify a pilot team and a suitable brownfield project to act as the first users of the MVP.

#### PM Handoff
This Project Brief provides the full context for the AI Dev Starter Kit. Please start in 'PRD Generation Mode', review the brief thoroughly to work with the user to create the PRD section by section as the template indicates, asking for any necessary clarification or suggesting improvements.
