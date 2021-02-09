#!/bin/bash

echo "docker hub username?"
read DOCKER_USERNAME
echo "app name (timestamped-notes-server)?"
read APP_NAME
echo "version?"
read VERSION
echo "ssh address?"
read SSH_ADDRESS

# Set default value for APP_NAME
APP_NAME="${APP_NAME:=timestamped-notes-server}"

# Terminate script if any variables are null. The -z flag checks if string is null
if [ -z "$DOCKER_USERNAME" ] || [ -z "$APP_NAME" ] || [ -z "$VERSION" ] || [ -z "$SSH_ADDRESS" ]
  then
    echo "Parameters supplied cannot be empty, aborting script"
    exit 1
fi

# Build Docker container
docker build -t $DOCKER_USERNAME/$APP_NAME:$VERSION .

# Push container to Docker Hub
docker push $DOCKER_USERNAME/$APP_NAME:$VERSION

# SSH into VPS, pull container from Docker Hub, tag it and deploy it on Dokku
ssh root@$SSH_ADDRESS "docker pull $DOCKER_USERNAME/$APP_NAME:$VERSION && docker tag $DOCKER_USERNAME/$APP_NAME:$VERSION dokku/$APP_NAME:$VERSION && dokku deploy $APP_NAME $VERSION"