# Development Workflow (Revised)

## Local Development Setup

To work on the AI Dev Starter Kit, a contributor will use the very same containerized environment that the tool itself creates.

### Prerequisites
A developer's host machine must have the following installed:
*   `git`
*   `Docker`
*   `Docker Compose`

### Initial Setup & Workflow
```bash
# 1. Clone the repository from GitHub Enterprise
git clone git@github.com:your-org/ai-dev-starter-kit.git

# 2. Navigate into the project directory
cd ai-dev-starter-kit

# 3. Build and start the containerized dev environment
# This project will have its own dev/ and docker-compose.yaml
docker-compose up --build

# 4. In a new terminal, exec into the running dev container
docker-compose exec dev zsh

# 5. Once inside the container, you have access to Node, npm, etc.
# and can run the development commands.
```

### Development Commands (run inside the `dev` container)
The `package.json` will be configured with the following scripts:
```bash
# The npm dependencies will be installed as part of the Docker build,
# but can be updated with:
npm install

# Compile the TypeScript source code
npm run build

# Run the CLI script locally for testing
npm run start

# Run all unit and end-to-end tests
npm run test

# Lint the codebase
npm run lint
```

## Environment Configuration

The environment configuration is managed via a `.env` file in the project root, which is loaded by Docker Compose into the `dev` container.

### Required Environment Variables
```bash
# .env

# A GitHub Personal Access Token may be required for the script
# to access the GitHub API, especially in CI/CD environments.
GITHUB_TOKEN=ghp_...
```

---
