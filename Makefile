PROJECT_NAME := $(notdir $(CURDIR))
IMAGE_NAME := ${PROJECT_NAME}-dev

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
	docker compose build

up:
	docker compose up --build -d

down:
	docker compose down

# Uses the service name to connect to the container
shell:
	docker compose exec dev zsh

logs:
	docker compose logs -f

extract-lock:
	@echo "Extracting poetry.lock from container..."
	@docker create --name temp-extract ${IMAGE_NAME}
	@docker cp temp-extract:/home/dev/poetry.lock ./dev/poetry.lock
	@docker rm temp-extract
	@echo "Lock file updated locally."

verify-proxy:
	curl -sS -o /dev/null -w "%{http_code}" http://0.0.0.0:3000
