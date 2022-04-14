# Pull the image container from docker repository
FROM python:3.7-slim-buster

# Prevents python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# Add yarn 
# RUN apt-get update \
#     && apt-get install curl gnupg2 apt-utils -y
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Add dependencies nescessary to run postgres library for the project
# RUN apt-get update \
#     && apt-get install gcc libpq-dev nodejs python3-venv npm yarn -y \
#     && apt-get clean
RUN apt-get update \
    && apt-get install gcc libpq-dev python3-venv -y \
    && apt-get clean

# setup dependencies
# RUN apt-get update
# RUN apt-get install xz-utils
# RUN apt-get -y install curl

# # Download latest nodejs binary
# RUN curl https://nodejs.org/dist/v14.15.4/node-v14.15.4-linux-x64.tar.xz -O

# # Extract & install
# RUN tar -xf node-v14.15.4-linux-x64.tar.xz
# RUN ln -s /node-v14.15.4-linux-x64/bin/node /usr/local/bin/node
# RUN ln -s /node-v14.15.4-linux-x64/bin/npm /usr/local/bin/npm

# RUN npm install -g npm@latest

# Create a directory in the container for the code
RUN mkdir /code
WORKDIR /code

# Add our Application code to container
COPY . .

# Install project dependencies
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Migrate database
# WORKDIR /code/db
# RUN ./manage.py migrate

# Install npm dependencies
# WORKDIR /code/app
# RUN yarn install

# Permission to correct user
RUN chown -R 1000:1000 /code

WORKDIR /code

# Expose the running port for the container
EXPOSE 8000
# EXPOSE 3000

# RUN ./deploy.sh 0.0.2

# Run container code
#CMD ["gunicorn", "-w 4", "-b 0.0.0.0:8000", "--chdir db", "caseproject.wsgi:application", "&", "sleep 10", "cd app", "yarn start"]
# CMD gunicorn -w 4 -b 0.0.0.0:8000 --chdir db caseproject.asgi:application
