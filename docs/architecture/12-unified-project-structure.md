# 12. Unified Project Structure

This directory structure organizes the source code for the scaffolding tool and the template files it deploys.

```
ai-dev-starter-kit/
├── src/                      # Node.js source for the scaffolding CLI
│   ├── index.ts              # Main entry point, orchestrates the workflow
│   ├── prompts.ts            # Defines all interactive prompts
│   ├── config.ts             # Builds the ScaffoldingConfig object
│   ├── generator.ts          # Handles file creation and template copying
│   └── installer.ts          # Runs external commands like 'npx'
│
├── template/                 # All assets to be copied to the user's machine
│   ├── dev/                  # The complete dev container environment
│   │   ├── Dockerfile
│   │   └── ...               # Other dev environment assets (e.g., p10k.zsh)
│   ├── docs/                 # Placeholder docs for the user's project
│   │   ├── architecture.md
│   │   └── prd.md
│   ├── docker-compose.template.yaml # Template for docker-compose
│   └── Makefile.template          # Template for the Makefile
│
├── tests/                    # Automated tests for the scaffolding CLI
│   ├── e2e/                  # End-to-end tests for the CLI workflow
│   └── unit/                 # Unit tests for individual modules
│
├── .github/                  # CI/CD workflows
│   └── workflows/
│       └── ci.yaml           # GitHub Actions workflow for running tests
│
├── package.json              # Defines the Node.js project and its dependencies
├── tsconfig.json             # TypeScript compiler configuration
└── README.md                 # Project README
```

---
