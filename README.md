# AI Dev Starter Kit

A CLI tool to scaffold containerized AI development environments with integrated agentic framework support. Supports both greenfield (new) and brownfield (existing application) project setups.

## Quick Start

Generate a new AI development environment:

```bash
npx github:rbalch/docker-dev
```

Or use with command-line arguments:

```bash
# Greenfield project
npx github:rbalch/docker-dev --projectType greenfield --installPath my-new-project

# Brownfield project (existing application)
npx github:rbalch/docker-dev --projectType brownfield --installPath my-project --appPath /path/to/existing/app
```

This launches an interactive setup or uses provided arguments to create a containerized project with integrated AI agent capabilities.

---

## Features

### Core Development Environment
- **Multi-stage Docker build** for optimized image size
- **Poetry-based dependency management** for Python projects
- **VS Code Remote - Containers** preconfigured for seamless IDE integration
- **Persistent volumes** for history, VS Code server, HuggingFace cache, etc.
- **Zsh + Oh My Zsh + Powerlevel10k** prompt preconfigured
- **Node.js 20** and common development tooling
- **Makefile** for simplified Docker operations

### AI Integration
- **Gemini CLI** and **Claude Code** preinstalled
- **BMAD (Be More Agentic Development) Framework** integration
- **Automated codebase analysis** for brownfield projects
- **AI agent workspace setup** with proper tooling and configuration

### Project Types
- **Greenfield**: Start fresh with a clean AI development environment
- **Brownfield**: Integrate with existing applications, includes automatic codebase XML generation

## Prerequisites

- Docker and Docker Compose
- Make (for using the Makefile commands)
- Node.js (for running the CLI)
- For GPU support: NVIDIA Container Toolkit

## Project Setup Workflow

### 1. Generate Your Project

```bash
npx github:rbalch/docker-dev
```

The CLI will:
1. Ask about project type (greenfield vs brownfield)
2. Prompt for installation path
3. For brownfield: request path to existing application
4. Generate Docker configuration and project files
5. Install the BMAD agentic framework
6. For brownfield: Generate XML codebase map for AI agents

### 2. Start Your Environment

Navigate to your project directory and start:

```bash
cd your-project-name
make up
```

### 3. Access Your Development Environment

Open a shell in the container:

```bash
make shell
```

Or use VS Code Remote - Containers to attach to the running container.

## Project Structure

After scaffolding, your project will have:

```
your-project/
├── docker-compose.yaml    # Container orchestration
├── Makefile              # Development commands
├── docs/                 # Project documentation
│   ├── architecture.md   # System architecture
│   ├── prd.md           # Product requirements
│   └── codebase.xml     # Generated for brownfield (AI agent reference)
├── dev/                  # Development environment
│   ├── Dockerfile        # Container definition
│   └── ...              # Dev tooling and configuration
└── .bmad-core/          # AI agent framework
    ├── agents/          # AI agent definitions  
    ├── tasks/           # Automated task definitions
    └── templates/       # Code and document templates
```

## AI Agent Integration

### Available Agents
The BMAD framework includes specialized AI agents:
- **Development agents** for coding tasks
- **QA agents** for testing and quality assurance  
- **Documentation agents** for maintaining project docs

### Brownfield Codebase Integration
For existing applications, the tool automatically:
1. Analyzes your existing codebase
2. Generates an XML representation at `docs/codebase.xml`
3. Configures AI agents to understand your project structure
4. Mounts your application code for development

## Make Commands

### Essential Commands
- `make up` — Start the development environment
- `make shell` — Open shell in the container  
- `make down` — Stop the environment
- `make build` — Rebuild the Docker image

### Development Commands  
- `make extract-lock` — Copy Poetry lockfile from container
- `make prune-containers` — Clean up stopped containers
- `make verify-proxy` — Test development proxy (if configured)

## AI Tooling

### Pre-installed CLIs
- `@google/gemini-cli` — Google Gemini integration
- `@anthropic-ai/claude-code` — Anthropic Claude integration
- `bmad-method` — BMAD framework tools

### Gemini CLI Commands
Once inside the development environment, three commands are available:
- `gemini` — Default Gemini model
- `coder` — Gemini 2.5 Flash (optimized for coding tasks)
- `thinker` — Gemini 2.5 Pro (for planning, tickets, reviews, and difficult coding tasks)

Use `coder` for most development work to optimize token usage. Reserve `thinker` for complex analysis and planning tasks.

### Credential Management
AI credentials are mounted from your host:
- `~/.gemini` — Gemini CLI configuration
- `~/.claude` — Claude configuration  
- `~/.claude.json` — Claude Code settings

## Development Workflow

### For New Projects (Greenfield)
1. Generate project with `npx github:rbalch/docker-dev`
2. Choose greenfield option
3. Start with `make up` 
4. Begin development with AI agent assistance

### For Existing Projects (Brownfield)
1. Generate project with `npx github:rbalch/docker-dev`  
2. Choose brownfield and provide your app path
3. Start with `make up` (your app is mounted at `/app`)
4. AI agents have access to your codebase XML for context

### Python Development
- Use Poetry inside the container for dependency management:
  ```bash
  poetry add <package>
  poetry install
  ```
- VS Code debugger support on port 5678 (set `DEBUG=1` in `.env`)

## Developing the CLI Tool

To contribute to or modify the scaffolding CLI itself:

### Setup
```bash
npm install
```

### Development
```bash
npm start          # Build and run interactively
npm test           # Run unit tests
npm run e2e        # Run end-to-end tests
npm run build      # Compile TypeScript
```

### Testing
The project includes comprehensive testing:
- **Unit tests** for individual components
- **E2E tests** using BATS for full workflow validation
- **Brownfield integration tests** for codebase XML generation

## Troubleshooting

### Volume Permissions
If you encounter volume permission issues:
```bash
docker volume create root-history
docker volume create vscode-server  
docker volume create huggingface-cache
docker volume create google-vscode-extension-cache
```

### Environment Variables
Create a project-specific `.env` file for custom configuration:
```bash
touch .env
```

### Git Configuration
Set up Git inside the container:
```bash
git config user.name "Your Name"
git config user.email "you@example.com"
```

---

## License

ISC

## Contributing

Issues and pull requests welcome at the [GitHub repository](https://github.com/rbalch/docker-dev).