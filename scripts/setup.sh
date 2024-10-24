#!/bin/bash

echo "🚀 Starting Docker image pull process..."

# Function to extract images from TOML
parse_toml() {
    # Read the file line by line
    while IFS= read -r line; do
        # Skip comments and empty lines
        if [[ $line =~ ^[[:space:]]*# || -z $line ]]; then
            continue
        fi
        # Look for lines with image definitions
        if [[ $line =~ \"(.+)\" ]]; then
            echo "${BASH_REMATCH[1]}"
        fi
    done < "$1"
}

# Check if config file exists
if [ ! -f "config.toml" ]; then
    echo "❌ Error: config.toml not found"
    exit 1
fi

# Get list of images
echo "📋 Reading config file..."
images=($(parse_toml "config.toml"))

if [ ${#images[@]} -eq 0 ]; then
    echo "ℹ️  No images found to pull in config file"
    exit 0
fi

echo "Found ${#images[@]} images to pull:"
for image in "${images[@]}"; do
    echo "  - $image"
done

# Counter variables
successful=0
failed=0

# Pull each image
for image in "${images[@]}"; do
    echo -e "\n📥 Starting to pull image: $image"
    echo "=================================================="
    
    if docker pull "$image"; then
        echo "✅ Successfully pulled: $image"
        ((successful++))
    else
        echo "❌ Failed to pull: $image"
        ((failed++))
    fi
done

# Print summary
echo -e "\n📥 Pull Summary"
echo "=================================================="
echo "✅ Successfully pulled: $successful images"
echo "❌ Failed to pull: $failed images"
echo "📝 Total processed: ${#images[@]} images"
