tag=1.0.3
tag_staging=1.0.1
organization=roboboinc
image=linhaverde
helm_dir=callcenter-helm-chart
helm_app=linhaverde
helm_app_staging=lv

build:
    docker build --force-rm $(options) -t $(image):$(tag) .

# Build and push the image
buildx:
	docker buildx install
	docker buildx build \
	--platform linux/amd64,linux/arm64,linux/arm/v7 \
	-t $(organization)/$(image):$(tag) \
	--push \
	.
	docker buildx uninstall
	
build-prod:
	$(MAKE) build options="--target production"

push:
	docker build --force-rm $(options) -t $(image):$(tag) .
	docker tag $(image):$(tag) $(organization)/$(image):$(tag)
	docker push $(organization)/$(image):$(tag)

push-staging:
	docker build --force-rm $(options) -t $(image):$(tag_staging) .
	docker tag $(image):$(tag_staging) $(organization)/$(image):$(tag_staging)
	docker push $(organization)/$(image):$(tag_staging)

helmx:
	cd $(helm_dir) && \
	echo  "Running Helm command from " $(helm_dir) && \
	helm upgrade --install --force --set=image.tag=$(tag) $(image)-production-chart . 

helmx-staging:
	cd $(helm_dir) && \
	echo  "Running Helm command from " $(helm_dir) && \
	helm upgrade --install --force --set=image.tag=$(tag_staging) --values=./staging-values.yaml $(helm_app_staging)-staging-chart . 

helmx-staging-dryrun:
	cd $(helm_dir) && \
	echo  "Running Helm command from " $(helm_dir) && \
	helm upgrade --install --dry-run --debug --set=image.tag=$(tag) --values=./staging-values.yaml $(helm_app_staging)-staging-chart . 

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

aws-kubeconfig:
	aws eks update-kubeconfig --name linhaverde --region eu-west-1 --profile wfp
