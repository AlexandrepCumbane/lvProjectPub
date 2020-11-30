#!/bin/sh

set -e

VERSION=$1;

# Dump wq configuration object to file

mkdir -p app/src/tmpdata
db/manage.py dump_config > app/src/tmpdata/config.json


# Compile templates into fixture
cd app;
wq collectjson

# Update version.txt and package.json
if [ "$VERSION" ]; then
    wq setversion $VERSION
    
    echo "export default '$VERSION'" > src/tmpdata/version.js
    sed -i "s/\"version\":.*/\"version\": \"$VERSION\",/" package.json
    
fi;


# Move files at same time to trigger single react-scripts update
mv src/tmpdata/* src/data/;
rmdir src/tmpdata;

cd ..;
