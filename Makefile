build: ## Build docker image
	docker-compose build --no-cache

start:build ## Build and start docker containers
	docker-compose up --force-recreate

stop: ## Stop docker containers
	docker-compose stop

rebuild:
	docker exec -it jekyll jekyll build

# ref - https://kleinfelter.com/moving-jekyll-to-docker