PROJECT_NAME := $(notdir $(CURDIR))
IMAGE_NAME := ${PROJECT_NAME}-dev

# Use docker-compose.vercel.yaml if it exists, otherwise use docker-compose.yaml
DOCKER_COMPOSE_FILE := $(if $(wildcard docker-compose.vercel.yaml),docker-compose.vercel.yaml,docker-compose.yaml)

.PHONY: help build up down shell logs extract-lock verify-proxy

help:
	@echo "Usage: make [target]"
	@echo "Targets:"
	@echo "  build         Build the docker containers"
	@echo "  up            Build and start the docker containers in the background"
	@echo "  down          Stop the docker containers"
	@echo "  shell         Get a shell inside the running dev container"
	@echo "  logs          Follow the logs from all containers"
	@echo "  extract-lock  Extract poetry.lock from the container to the host"
	@echo "  verify-proxy  Verify that the dev proxy is running"

build:
	docker compose -f $(DOCKER_COMPOSE_FILE) build

up:
	docker compose -f $(DOCKER_COMPOSE_FILE) up --build -d

down:
	docker compose -f $(DOCKER_COMPOSE_FILE) down

# Uses the service name to connect to the container
shell:
	docker compose -f $(DOCKER_COMPOSE_FILE) exec dev zsh

# Alias for shell command
exec: shell

logs:
	docker compose -f $(DOCKER_COMPOSE_FILE) logs -f

extract-lock:
	@echo "Extracting poetry.lock from container..."
	@docker create --name temp-extract ${IMAGE_NAME}
	@docker cp temp-extract:/home/dev/poetry.lock ./dev/poetry.lock
	@docker rm temp-extract
	@echo "Lock file updated locally."

verify-proxy:
	curl -sS -o /dev/null -w "%{http_code}" http://0.0.0.0:3000
