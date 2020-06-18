FROM python:3.8-slim-buster

# Allows docker to cache installed dependencies between builds
COPY ./requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Adds our application code to the image
RUN mkdir /code
WORKDIR /code
COPY . .

EXPOSE 8000

