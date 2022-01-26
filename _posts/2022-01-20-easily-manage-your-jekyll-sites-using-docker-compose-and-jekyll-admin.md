---
title: Easily manage your Jekyll sites using docker-compose and jekyll-admin
tags:
- jekyll
---

Eventhough Jekyll is the simplest blog-aware, static site generator out there, it's not easy to run it locally. You need to install the correct ruby version and all these other plugins.  I with the help of some coolest bloggers, came up with a docker-compose based solution this problem. I belive it'll make blogging with Jekyll easy and portable.

Let's get started!

## Step 1
Clone your jekyll theme / use your existing jekyll repo. [Here](https://github.com/alfredfrancis/alfredfrancis.github.io) is mine.



## Step 2

Add a Dockerfile to your project. Install jekyll-admin gem in the image.  I found Jekyll-admin to be very useful since you get somewhat of a CMS feel from it. 

Dockerfile
``` docker
FROM jekyll/jekyll:pages
RUN gem install jekyll-admin # Install jekyll-admin gem
```

## Step 3
Add a docker-compose file. The docker-compose file will start your jekyll container and mount the jekyll site to the container. By two-way mounting the jekyll site code, your updates are always synced with your code in the host machine.

docker-compose.yml
```yaml
version: "3"
services:
    jekyll:
        build: .
        command: jekyll serve --watch --incremental
        ports:
            - 4000:4000
        volumes:
            - ./:/srv/jekyll

```

## Step 4

Add a make file to make your lives easy

Makefile
```make
build: ## Build docker image
	docker-compose build

start:build
	docker-compose up --force-recreate

stop: 
	docker-compose stop

rebuild: # run jekyll build inside container to update on the go
	docker-compose exec jekyll jekyll build --incremental --watch
```

## Step 5

Thats it! Your easy jekyll setup is ready.  Type **make start** command to start container. Then head to http://localhost:4000/ for your jekyll site and http://localhost:4000/admin/ for your admin panel.

Happy blogging!
