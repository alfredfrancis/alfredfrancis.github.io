build: ## Build docker image
	docker-compose build

start:build ## Build and start docker containers
	docker-compose up --force-recreate

stop: ## Stop docker containers
	docker-compose stop

rebuild:
	docker exec -it alfredfrancisgithubio_jekyll_1 jekyll build

# ref - https://kleinfelter.com/moving-jekyll-to-docker