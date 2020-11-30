#!/bin/sh

set -e
. venv/bin/activate
echo "Starting Django..."
db/manage.py runserver &

sleep 10;
cd app
echo "Starting NPM..."
npm start

