# Pull the image container from docker repository
FROM python:3.7-slim-buster

# Prevents python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# Add yarn 
RUN apt-get update \
    && apt-get install curl gnupg2 apt-utils -y
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Add dependencies nescessary to run postgres library for the project
RUN apt-get update \
    && apt-get install gcc libpq-dev nodejs python3-venv npm yarn -y \
    && apt-get clean

RUN npm install -g npm@latest

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
WORKDIR /code/app
RUN yarn install

# Permission to correct user
RUN groupadd --gid 1000 appuser && \
    adduser --uid 1000 --gid appuser appuser

RUN chown -R appuser:appuser /code

WORKDIR /code

# Expose the running port for the container
EXPOSE 8000
EXPOSE 3000

# RUN ./deploy.sh 0.0.2

# Run container code
#CMD ["gunicorn", "-w 4", "-b 0.0.0.0:8000", "--chdir db", "caseproject.wsgi:application", "&", "sleep 10", "cd app", "yarn start"]
CMD gunicorn -w 4 -b 0.0.0.0:8000 --chdir db caseproject.wsgi:application
