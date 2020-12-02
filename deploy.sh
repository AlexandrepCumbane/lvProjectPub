#!/bin/sh

# Exit on error
set -e

VERSION=$1;

if [ -z "$VERSION" ]; then
    echo "Usage: ./deploy.sh [VERSION]"
    exit 1
fi;

# Regenerate JSON fixtures
./update_json.sh $VERSION;

wq icons;

# Build using react-scripts (Webpack/Babel)
cd app;
npm run build;

# Update existing htdocs with new version
cd ..;
mkdir -p htdocs/
cp -a app/build/* htdocs/


# Restart Django
touch db/caseproject/wsgi.py
