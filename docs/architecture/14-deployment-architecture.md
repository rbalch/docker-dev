# 14. Deployment Architecture

## Deployment Strategy

Since we are using `npx` with a direct GitHub repository link, our deployment strategy is centered around Git tagging and releases within our GitHub Enterprise instance.

*   **Platform:** GitHub Enterprise
*   **Deployment Method:** Publishing is achieved by pushing code and creating new version tags (e.g., `v1.0.0`, `v1.1.0`). There is no separate build artifact to publish. `npx` will fetch the code directly from the specified tag.

## CI/CD Pipeline

A GitHub Actions workflow will be set up to ensure code quality and automate testing on every push and pull request.

```yaml
# .github/workflows/ci.yaml
name: Build and Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build TypeScript
      run: npm run build

    - name: Run all tests
      run: npm test
```

## Environments

The different "environments" correspond to Git branches and tags, which users can target with `npx`.

| Environment | `npx` Target | Purpose |
| :--- | :--- | :--- |
| **Development** | `github:user/repo#my-feature-branch` | For testing a specific feature branch before merging. |
| **Staging** | `github:user/repo#main` | The latest, cutting-edge version. May be unstable. |
| **Production** | `github:user/repo@v1.0.0` | A stable, tagged release. The recommended version for most users. |

---
