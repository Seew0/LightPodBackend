#!/bin/bash

# List of Docker images to pull
images=(
  "kasmweb/chrome"
  "kasmweb/ubuntu-desktop"
  # Add other images as needed
)

echo "Pulling Docker images..."

for image in "${images[@]}"; do
  docker pull $image
done

echo "Docker images pulled successfully."
echo "Setup complete."
