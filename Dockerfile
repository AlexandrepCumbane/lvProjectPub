# Pull the image container from docker repository
FROM python:3.7-slim-buster

# Prevents python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# Add dependencies nescessary to run postgres library for the project
RUN apt-get update \
&& apt-get install gcc libpq-dev nodejs -y \
&& apt-get clean

# Install project dependencies
COPY ./requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Create a directory in the container for the code
RUN mkdir /code
WORKDIR /code

# Add our Application code to container
COPY . .

# Expose the running port for the container
EXPOSE 8000
EXPOSE 3000

CMD ["./deploy.sh", "0.0.2"]
# Run container code
# CMD ["gunicorn", "-w 4", "-b 0.0.0.0:8000", "callcenter.wsgi:application"]
