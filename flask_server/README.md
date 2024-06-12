# Deployment Guide

## Overview

This project uses the Serverless Framework and GitHub Actions to automate the deployment of the backend service.

### serverless.yml

- **Purpose**: Defines the configuration for deploying the backend service to AWS.
- **Key Features**:
    - Specifies the service name, provider, and runtime.
    - Configures environment variables and stages.
    - Packages the application, including and excluding specific files.
    - Define functions and their events (API Gateway endpoints).
    - Lists required plugins.

### backend.yml

- **Purpose**: Automates the deployment process using GitHub Actions.
- **Key Features**:
    - Triggers deployment on push to `main` branch or `latest` tag.
    - Sets up the environment on the GitHub Actions runner (Python, Docker, dependencies).
    - Caches Python dependencies to speed up workflow.
    - Executes the Serverless deployment command.

### How They Work Together

- **serverless.yml** provides the detailed deployment configuration.
- **backend.yml** ensures the environment is set up correctly before invoking `serverless deploy`, automating the
  deployment process.

### Manual Deployment

- This can be achieved by running the command `serverless deploy --stage prod` directly on the `flask_server` directory
