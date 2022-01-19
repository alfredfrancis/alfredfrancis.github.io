build: ## Build docker image
	docker-compose build

start:build ## Build and start docker containers
	docker-compose up --force-recreate

stop: ## Stop docker containers
	docker-compose stop

rebuild:
	docker-compose exec jekyll jekyll build --incremental --watch

# ref - https://kleinfelter.com/moving-jekyll-to-docker