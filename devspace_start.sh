#!/bin/bash
set +e  # Continue on errors

export NODE_ENV=development
if [ -f "yarn.lock" ]; then
   echo "Installing Yarn Dependencies"
   yarn
else 
   if [ -f "package.json" ]; then
      echo "Installing NPM Dependencies"
      npm install
   fi
fi

COLOR_CYAN="\033[0;36m"
COLOR_RESET="\033[0m"

echo -e "${COLOR_CYAN}
   ____              ____
  |  _ \  _____   __/ ___| _ __   __ _  ___ ___
  | | | |/ _ \ \ / /\___ \| '_ \ / _\` |/ __/ _ \\
  | |_| |  __/\ V /  ___) | |_) | (_| | (_|  __/
  |____/ \___| \_/  |____/| .__/ \__,_|\___\___|
                          |_|
${COLOR_RESET}
Welcome to your development container!

This is how you can work with it:
- Run \`${COLOR_CYAN}npm start${COLOR_RESET}\` to start the application
- Run \`${COLOR_CYAN}npm run dev${COLOR_RESET}\` to start hot reloading
- ${COLOR_CYAN}Files will be synchronized${COLOR_RESET} between your local machine and this container
- Some ports will be forwarded, so you can access this container on your local machine via ${COLOR_CYAN}http://localhost:3000${COLOR_RESET}
"
# Set terminal prompt
export PS1="\[${COLOR_BLUE}\]devspace\[${COLOR_RESET}\] ./\W \[${COLOR_BLUE}\]\\$\[${COLOR_RESET}\] "
if [ -z "$BASH" ]; then export PS1="$ "; fi

# Include project's bin/ folder in PATH
export PATH="./bin:$PATH"

# Setup python project in development environment to include all relevant dependancies:
pip install --upgrade pip
apk add --no-cache python3 postgresql-libs && \
apk add --no-cache --virtual .build-deps gcc python3-dev musl-dev postgresql-dev && \
apk add build-base jpeg-dev zlib-dev libffi-dev && \
python3 -m pip install -r requirements.txt --no-cache-dir && \
apk --purge del .build-deps

python db/manage.py migrate

# Open shell
bash --norc

