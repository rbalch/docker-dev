#!/usr/bin/env bats

setup_file() {
  # Create a dummy application for brownfield tests
  mkdir -p /tmp/dummy-app
  echo "dummy content" > /tmp/dummy-app/dummy-file.txt
  echo "package.json content" > /tmp/dummy-app/package.json
  
  # Create another dummy app for Vercel tests
  mkdir -p /tmp/dummy-vercel-app
  echo "vercel app content" > /tmp/dummy-vercel-app/app.js
  echo '{"name": "vercel-app"}' > /tmp/dummy-vercel-app/package.json
}

teardown_file() {
  # Clean up the dummy applications
  rm -rf /tmp/dummy-app
  rm -rf /tmp/dummy-vercel-app
  rm -rf /tmp/dummy-app-with-dockerfile
}

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
  # Run the compiled script with command-line arguments
  node dist/index.js --projectType brownfield --installPath /tmp/ai-dev-environment --appPath /tmp/dummy-app

  # Check if the directory was created
  [ -d "/tmp/ai-dev-environment" ]

  # Check if key files exist
  [ -f "/tmp/ai-dev-environment/Makefile" ]
  [ -f "/tmp/ai-dev-environment/docker-compose.yaml" ]
  [ -d "/tmp/ai-dev-environment/dev" ]

  # For regular brownfield (non-Vercel), there should NOT be a vercel override file
  [ ! -f "/tmp/ai-dev-environment/docker-compose.vercel.yaml" ]
  
  # Regular docker-compose.yaml should exist
  [ -f "/tmp/ai-dev-environment/docker-compose.yaml" ]
  
  # Check that app directory exists with copied files
  [ -d "/tmp/ai-dev-environment/app" ]
  [ -f "/tmp/ai-dev-environment/app/dummy-file.txt" ]
  [ -f "/tmp/ai-dev-environment/app/package.json" ]
  
  # Check for .env and .bmad-flattenignore files
  [ -f "/tmp/ai-dev-environment/.env" ]
  [ -f "/tmp/ai-dev-environment/.bmad-flattenignore" ]

  # Check for the existence of codebase.xml
  [ -f "/tmp/ai-dev-environment/docs/codebase.xml" ]

  # Check if codebase.xml contains the dummy file name
  run grep "dummy-file.txt" /tmp/ai-dev-environment/docs/codebase.xml
  [ "$status" -eq 0 ]
}

@test "Vercel Configuration Flow (Automated)" {
  # Run the script with --vercel flag
  node dist/index.js --projectType brownfield --installPath /tmp/ai-dev-environment-vercel --appPath /tmp/dummy-vercel-app --vercel

  # Check if the directory was created
  [ -d "/tmp/ai-dev-environment-vercel" ]

  # Check that docker-compose.vercel.yaml was created
  [ -f "/tmp/ai-dev-environment-vercel/docker-compose.vercel.yaml" ]

  # Check that Vercel-specific files were copied to app/
  [ -f "/tmp/ai-dev-environment-vercel/app/Dockerfile" ]
  [ -f "/tmp/ai-dev-environment-vercel/app/docker-entrypoint.sh" ]
  
  # Check that app files were copied
  [ -f "/tmp/ai-dev-environment-vercel/app/app.js" ]
  [ -f "/tmp/ai-dev-environment-vercel/app/package.json" ]
  
  # Clean up
  rm -rf /tmp/ai-dev-environment-vercel
}

@test "Non-Vercel Configuration Flow" {
  # Run the script without --vercel flag
  node dist/index.js --projectType brownfield --installPath /tmp/ai-dev-environment-no-vercel --appPath /tmp/dummy-app

  # Check if the directory was created
  [ -d "/tmp/ai-dev-environment-no-vercel" ]

  # Check that docker-compose.vercel.yaml was NOT created
  [ ! -f "/tmp/ai-dev-environment-no-vercel/docker-compose.vercel.yaml" ]
  
  # Check that regular docker-compose.yaml exists
  [ -f "/tmp/ai-dev-environment-no-vercel/docker-compose.yaml" ]
  
  # Check that Vercel-specific files were NOT copied to app/
  [ ! -f "/tmp/ai-dev-environment-no-vercel/app/Dockerfile" ]
  [ ! -f "/tmp/ai-dev-environment-no-vercel/app/docker-entrypoint.sh" ]
  
  # Clean up
  rm -rf /tmp/ai-dev-environment-no-vercel
}

@test "Dockerfile Conflict Detection" {
  # Create a dummy app with existing Dockerfile
  mkdir -p /tmp/dummy-app-with-dockerfile
  echo "existing dockerfile" > /tmp/dummy-app-with-dockerfile/Dockerfile
  echo "app content" > /tmp/dummy-app-with-dockerfile/app.js
  
  # Run the script with --vercel flag - this should fail
  run node dist/index.js --projectType brownfield --installPath /tmp/ai-dev-environment-conflict --appPath /tmp/dummy-app-with-dockerfile --vercel
  [ "$status" -ne 0 ]
  
  # Clean up
  rm -rf /tmp/dummy-app-with-dockerfile
  rm -rf /tmp/ai-dev-environment-conflict
}

@test "File Generation Verification" {
  # Run the script
  node dist/index.js --projectType brownfield --installPath /tmp/ai-dev-environment-files --appPath /tmp/dummy-app

  # Check that .env file is created and empty
  [ -f "/tmp/ai-dev-environment-files/.env" ]
  [ ! -s "/tmp/ai-dev-environment-files/.env" ]  # File should be empty
  
  # Check that .bmad-flattenignore file was copied
  [ -f "/tmp/ai-dev-environment-files/.bmad-flattenignore" ]
  
  # Clean up
  rm -rf /tmp/ai-dev-environment-files
}