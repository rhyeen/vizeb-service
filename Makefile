IMG_NAME=vizeb-service
PORT=6250
TAG=latest
SET_NODE_ENV=development
MOUNT_SRC_FROM=$(shell pwd)/src
MOUNT_SRC_TO=/home/default/src
MOUNT_PKG_FROM=$(shell pwd)/package.json
MOUNT_PKG_TO=/home/default/package.json
MOUNT_LOCKFILE_FROM=$(shell pwd)/package-lock.json
MOUNT_LOCKFILE_TO=/home/default/package-lock.json

IMG=rhyeen/$(IMG_NAME)
CONTAINER=$(IMG_NAME)
RUNOPTS=-p $(PORT):80
RUNOPTS_DEBUG=-p $(PORT):80 -p 6255:6255

define msg
    @echo "\033[36m# $(1)\033[0m"
    @echo "\033[36m# DOCKER COMMAND:\033[0m"
endef


build:
	$(call msg,"Building the docker image")
	docker build --pull -t \
	$(IMG):$(TAG) ./.

run-enter: rm
	$(call msg,"Entering the container without starting the server")
	docker run -it $(RUNOPTS) \
	--name $(CONTAINER) \
	-v $(MOUNT_SRC_FROM):$(MOUNT_SRC_TO) \
	-v $(MOUNT_PKG_FROM):$(MOUNT_PKG_TO) \
	-v $(MOUNT_LOCKFILE_FROM):$(MOUNT_LOCKFILE_TO) \
	-e ENVIRONMENT=local \
	-e DEBUG_PORT=6255 \
	$(IMG):$(TAG) /bin/bash

run-local: rm
	$(call msg,"Running the local container")
	docker run -d $(RUNOPTS_DEBUG) \
	--name $(CONTAINER) \
	-v $(MOUNT_SRC_FROM):$(MOUNT_SRC_TO) \
	-v $(MOUNT_PKG_FROM):$(MOUNT_PKG_TO) \
	-v $(MOUNT_LOCKFILE_FROM):$(MOUNT_LOCKFILE_TO) \
	-e ENVIRONMENT=local \
	-e DEBUG_PORT=6255 \
	$(IMG):$(TAG) npm run local

run-prod: rm
	$(call msg,"Running the prod container")
	docker run -d $(RUNOPTS) \
	--name $(CONTAINER) \
	-e ENVIRONMENT=prod \
	$(IMG):$(TAG) npm start

log:
	$(call msg,"Tailing the container logs")
	docker logs -f $(CONTAINER)

push:
	$(call msg,"Pushing the image to the repository")
	docker push $(IMG):$(TAG)

rm:
	$(call msg,"Removing the container")
	docker rm -f $(CONTAINER) || true

enter:
	$(call msg,"Entering the container")
	docker exec -it $(CONTAINER) /bin/bash

lint:
	$(call msg,"Linting the js files")
	docker exec -it $(CONTAINER) /bin/bash -c "npm run lint"

lint-fix:
	$(call msg,"Linting and fixing the js files")
	docker exec -it $(CONTAINER) /bin/bash -c "npm run lint-fix"

test: rm
	$(call msg,"Running all the tests")
	docker run $(RUNOPTS) \
	--name $(CONTAINER) \
	--rm \
	-e ENVIRONMENT=local \
	$(IMG):$(TAG) npm test

test-coverage: rm
	$(call msg,"Running all the tests with coverage")
	docker run $(RUNOPTS) \
	--name $(CONTAINER) \
	--rm \
	-e ENVIRONMENT=local \
	$(IMG):$(TAG) npm run test-coverage