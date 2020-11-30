#!/bin/sh

# Exit on error
set -e

VERSION=$1;

if [ -z "$VERSION" ]; then
    echo "Usage: ./deploy.sh [VERSION]"
    exit 1
fi;

# (Re-)generate templates for all registered models
wq maketemplates \
     --django-dir db \
     --input-dir master_templates \
     --template-dir templates

# Regenerate JSON fixtures
./update_json.sh $VERSION;

cd app;
wq icons;


wq init;
wq scss;

# Build using react-scripts (Webpack/Babel)
npm run build;

# Update existing htdocs with new version
cd ..;
mkdir -p htdocs/
cp -a app/build/* htdocs/


# Restart Django
touch db/casemgmtproject/wsgi.py


# Build PhoneGap application
cd app;
wq phonegap $1
cd ../;

