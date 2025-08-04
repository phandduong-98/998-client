#!/bin/bash

# Script to delete all :Zone.Identifier files recursively
# These files are created by Windows when downloading or transferring files
# and are safe to delete in Linux/WSL environments

echo "🔍 Searching for :Zone.Identifier files..."

# Find all files ending with :Zone.Identifier
files=$(find . -name "*:Zone.Identifier" -type f 2>/dev/null)

if [ -z "$files" ]; then
    echo "✅ No :Zone.Identifier files found."
    exit 0
fi

echo "📋 Found the following :Zone.Identifier files:"
echo "$files"
echo ""

# Count the files
count=$(echo "$files" | wc -l)
echo "📊 Total files to delete: $count"
echo ""

# Ask for confirmation
read -p "❓ Do you want to delete all these files? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Deleting :Zone.Identifier files..."
    
    # Delete the files
    find . -name "*:Zone.Identifier" -type f -delete 2>/dev/null
    
    echo "✅ All :Zone.Identifier files have been deleted!"
    
    # Verify deletion
    remaining=$(find . -name "*:Zone.Identifier" -type f 2>/dev/null | wc -l)
    if [ "$remaining" -eq 0 ]; then
        echo "✅ Cleanup completed successfully!"
    else
        echo "⚠️  Warning: $remaining files could not be deleted."
    fi
else
    echo "❌ Operation cancelled."
fi