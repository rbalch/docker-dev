# Docker Dev 

Template + fully loaded dev environment for Python projects. Run everything inside the container (Docker or VS Code Remote) for an isolated, reproducible setup per project.

## Features

- Multi-stage Docker build for optimized image size
- Poetry-based dependency management
- *optional* NVIDIA GPU support for machine learning workloads
- Persistent volumes for history, VS Code server, and HuggingFace cache, etc
- Zsh + Oh My Zsh + Powerlevel10k prompt preconfigured
- Node.js 20 and common dev tooling
- Gemini CLI and Claude Code preinstalled
- Makefile for simplified Docker operations

## Prerequisites

- Docker and Docker Compose
- Make (for using the Makefile commands)
- For GPU support: NVIDIA Container Toolkit

## Getting Started

### Basic Setup

1. Couple startup tips:

- You may need to create the volumes before running the containers:

```bash
docker volume create root-history
docker volume create vscode-server
docker volume create huggingface-cache
docker volume create google-vscode-extension-cache
```

- If your project needs environment variables, create a project-specific `.env` (this repo does not ship a default)

```bash
touch .env
```

- Install pre-commit hooks:

```bash
pre-commit install
```

- Set the git config:

```bash
git config user.name "Your Name"
git config user.email "you@example.com"
```

2. Clone this repository
3. Update the `pyproject.toml` with your project details and dependencies
4. Build the Docker image:

```bash
make build
```

5. Extract the lockfile from the container:

```bash
make extract-lock
```

You should now have a `poetry.lock` file in the `dev` directory.

### Run and Use the Dev Environment

- Bring up the dev container (detach in another terminal if preferred):

```bash
make up
```

- Open a shell inside the dev container (Zsh with Powerlevel10k):

```bash
make command
```

- Use with VS Code Remote:
  - Open this folder in VS Code and attach to the running `dev` container via Remote - Containers.

### AI Tooling

- Preinstalled CLIs inside the container:
  - `@google/gemini-cli`
  - `@anthropic-ai/claude-code`
- Credentials are mounted from your host by `docker-compose.yaml` if present (e.g., `~/.gemini`, `~/.claude`, `~/.claude.json`).

### Python Inside the Container

- Poetry is preinstalled and configured to use a shared virtualenv.
- Always install dependencies inside the container:

```bash
poetry add <package>
```

### Debugging

- Set `DEBUG=1` in your `.env` to enable `debugpy` on port `5678` (see `app/server.py`).
- Attach VS Code debugger to port 5678.

### Dev Proxy (optional)

- Use `/usr/local/bin/dev-proxy.sh` to forward a local port to another service.
- Configure with envs: `PROXY_PORT`, `TARGET_HOST`, `TARGET_PORT`, `PROXY_BIND`, `PROXY_LOG_FILE`.
- Verify with:

```bash
make verify-proxy
```

### Make Commands Cheat Sheet

- `make build` — build dev image
- `make up` — start dev service
- `make command` — shell into dev container
- `make extract-lock` — copy `poetry.lock` from image to `dev/`
- `make prune-containers` — prune stopped containers

---

## Developing the Scaffolding Tool

This project is not only a template, but also the CLI tool that generates the template. To work on the CLI tool itself, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run for Testing:**
    To build the TypeScript code and run the CLI interactively, use the `start` script:
    ```bash
    npm start
    ```

3.  **Run Tests:**
    To run the unit and end-to-end tests:
    ```bash
    npm test
    ```