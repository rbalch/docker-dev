#!/usr/bin/env bats

setup() {
  # Clean up any previous runs
  rm -rf /tmp/ai-dev-environment*
  # Volumes are expected to persist, so no cleanup here.
}

teardown() {
  # Clean up after the test
  rm -rf /tmp/ai-dev-environment*
  # Volumes are expected to persist, so no cleanup here.
}

@test "Greenfield scaffolding with command-line arguments" {
  # Run the compiled script with command-line arguments
  node dist/index.js --projectType greenfield --installPath /tmp/ai-dev-environment

  # Check if the directory was created
  [ -d "/tmp/ai-dev-environment" ]

  # Check if key files exist
  [ -f "/tmp/ai-dev-environment/Makefile" ]
  [ -f "/tmp/ai-dev-environment/docker-compose.yaml" ]
  [ -d "/tmp/ai-dev-environment/dev" ]

  # Check if the required Docker volumes were created
  run sudo docker volume ls --format '{{.Name}}'
  # Assert that each required volume name is present in the output
  [[ "$output" =~ "root-history" ]]
  [[ "$output" =~ "vscode-server" ]]
  [[ "$output" =~ "huggingface-cache" ]]
  [[ "$output" =~ "google-vscode-extension-cache" ]]
}

@test "Greenfield scaffolding with --adk-setup flag" {
  # Run the compiled script with command-line arguments
  node dist/index.js --projectType greenfield --installPath /tmp/ai-dev-environment-adk --adk-setup

  # Check if the directory was created
  [ -d "/tmp/ai-dev-environment-adk" ]

  # Check if key files exist
  [ -f "/tmp/ai-dev-environment-adk/Makefile" ]
  [ -f "/tmp/ai-dev-environment-adk/docker-compose.yaml" ]
  [ -d "/tmp/ai-dev-environment-adk/dev" ]

  # Check if the adk directory exists
  [ -d "/tmp/ai-dev-environment-adk/adk" ]
}