tag=latest
organization=Robobo
image=linhaverde

build:
    docker build --force-rm $(options) -t $(image):$(tag) .

# Build and push the image
buildx:
	docker buildx build \
	--platform linux/amd64,linux/arm64,linux/arm/v7 \
	-t $(organization)/$(image):$(tag) \
	--push \
	.
	
build-prod:
	$(MAKE) build options="--target production"

push:
	docker tag $(image):latest $(organization)/$(image):$(tag)
	docker push $(organization)/$(image):$(tag)

compose-start:
	docker-compose up --remove-orphans $(options)

compose-stop:
	docker-compose down --remove-orphans $(options)

compose-manage-py:
	docker-compose run --rm $(options) web python db/manage.py $(cmd)

compose-loadfixtures:
	docker-compose run web python db/manage.py loaddata db_seed.json

compose-bash:
	docker-compose exec web sh

compose-bash-frontend:
	docker-compose exec frontend sh

start-server:
	python db/manage.py runserver 0.0.0.0:8000

devspace-prod:
	devspace deploy -p production

devspace-dev:
	devspace dev