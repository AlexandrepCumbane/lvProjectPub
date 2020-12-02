#!/bin/sh

set -e

VERSION=$1;

# Dump wq configuration object to file
db/manage.py dump_config --format esm > app/src/data/config.js

# Update version.txt and package.json
if [ "$VERSION" ]; then
    wq setversion $VERSION
fi;
