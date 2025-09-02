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

@test "Brownfield scaffolding with command-line arguments" {
  export SKIP_INSTALLER=true
  # Run the compiled script with command-line arguments
  node dist/index.js --projectType brownfield --installPath /tmp/ai-dev-environment --appPath /tmp/dummy-app

  # Check if the directory was created
  [ -d "/tmp/ai-dev-environment" ]

  # Check if key files exist
  [ -f "/tmp/ai-dev-environment/Makefile" ]
  [ -f "/tmp/ai-dev-environment/docker-compose.yaml" ]
  [ -d "/tmp/ai-dev-environment/dev" ]

  # Check that the docker-compose.yaml file contains the app service
  run grep "app:" /tmp/ai-dev-environment/docker-compose.yaml
  [ "$status" -eq 0 ]

  # Check that the docker-compose.yaml file contains the correct volume mount
  run grep "    - /tmp/dummy-app:/app" /tmp/ai-dev-environment/docker-compose.yaml
  [ "$status" -eq 0 ]
}