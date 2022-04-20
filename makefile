tag=latest
organization=Robobo
image=linhaverde

build:
    docker build --force-rm $(options) -t lv-app:latest .

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
	docker-compose run web python db/manage.py loaddata seed_group_data.json

compose-bash:
	docker-compose exec web sh

start-server:
	python db/manage.py runserver 0.0.0.0:8000