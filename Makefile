build:
	docker compose build \
		--build-arg UNAME=$$(whoami) \
		--build-arg UID=$$(id -u) \
		--build-arg GID=$$(id -g) \
		--build-arg GIT_USER_NAME=$$(git config --global user.name) \
		--build-arg GIT_USER_EMAIL=$$(git config --global user.email) \
		app.node

run:
	docker run \
		-t \
		-d \
		--rm \
		--name app.node \
		-v .:/app  \
		-p 3000:3000 \
		app/node

up: build run

shell:
	docker exec --user node -i -t app.node bash

down:
	docker stop app.node

rm:
	docker rmi app/node