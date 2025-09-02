#!/usr/bin/env bats

PROJECT_NAME="test-project"

setup() {
    # Create a temporary directory for the test
    TEST_DIR=$(mktemp -d -p /tmp)
    cd ${TEST_DIR}

    # Copy necessary files
    cp /workspace/template/Makefile.template ./Makefile
    cp /workspace/template/docker-compose.template.yaml ./docker-compose.yaml
    cp -r /workspace/dev ./dev

    # Prepend all docker compose commands in Makefile with the project name override
    sed -i "s/docker compose/COMPOSE_PROJECT_NAME=${PROJECT_NAME} docker compose/g" ./Makefile

    # Comment out the ports section in the Dockerfile to avoid conflicts
    sed -i '/ports:/,/debugger/ s/^\(.*\)/#\1/' ./docker-compose.yaml

    # Create an empty .env file
    touch .env

    # Make sure no containers are running from previous tests
    sudo COMPOSE_PROJECT_NAME=${PROJECT_NAME} docker compose down --volumes
}

teardown() {
    # Clean up
    sudo COMPOSE_PROJECT_NAME=${PROJECT_NAME} docker compose down --volumes
    cd /workspace
    rm -rf ${TEST_DIR}
}

@test "make up builds and starts the dev container" {
    run sudo make up
    [ "$status" -eq 0 ]

    # Check that the container is running
    run sudo COMPOSE_PROJECT_NAME=${PROJECT_NAME} docker compose ps --status=running --services
    [ "$status" -eq 0 ]
    [ "$output" = "dev" ]
}

@test "make shell command can execute zsh" {
    # First, ensure the container is up
    run sudo make up
    [ "$status" -eq 0 ]

    # Add a new make target to test the shell non-interactively
    echo -e "\n.PHONY: test-shell\ntest-shell:\n\t@COMPOSE_PROJECT_NAME=${PROJECT_NAME} docker compose exec dev which zsh\n" >> ./Makefile
    run sudo make test-shell
    [ "$status" -eq 0 ]
    [[ "$output" == *zsh* ]]
}