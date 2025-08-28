#!/usr/bin/env bats

setup() {
  # Clean up any previous runs
  rm -rf ai-dev-environment*
  # Volumes are expected to persist, so no cleanup here.
}

teardown() {
  # Clean up after the test
  rm -rf ai-dev-environment*
  # Volumes are expected to persist, so no cleanup here.
}

@test "Greenfield scaffolding with default prompts" {
  # Run the compiled script and pipe "Enter" for the two prompts
  # The script expects answers for project name and project type.
  {
    echo "" # Accept default project name
    sleep 1
    echo "" # Accept default project type (greenfield)
  } | node dist/index.js

  # Check if the directory was created
  [ -d "ai-dev-environment" ]

  # Check if key files exist
  [ -f "ai-dev-environment/Makefile" ]
  [ -f "ai-dev-environment/docker-compose.yaml" ]
  [ -d "ai-dev-environment/dev" ]

  # Check if the required Docker volumes were created
  run sudo docker volume ls --format '{{.Name}}'
  # Assert that each required volume name is present in the output
  [[ "$output" =~ "root-history" ]]
  [[ "$output" =~ "vscode-server" ]]
  [[ "$output" =~ "huggingface-cache" ]]
  [[ "$output" =~ "google-vscode-extension-cache" ]]
}
