---
title: 'Traefik: Opensource Service Discovery and Reverse Proxy for Docker-based Microservices'
tags:
- microservices
- docker
- traefik
- loadbalancer
---

Traefik is a modern HTTP reverse proxy and load balancer. It lets you easily set up a service discovery and reverse proxy mechanism for your docker based microservices.

Today we'll see how we can set up a simple load balancer and service discovery mechanism using Traefik.

Lets cut to the chase. In order to follow this tutorial, you are gonna need a VM with a docker instance running on it. The following docker-compose file contains configuration to set up our Traefik instance and a whoami instance. We'll use the whoami instance to test the service discovery and load balancing.

Traefik configuration is passed under the command in the docker-compose file. For the docker instances to load-balanced by Traefik, we need to add a few labels. Please refer to the docker-compose file for the basic setup. I've added few comments for your reference.

{% gist 14f60b4c3edd7707230c8005035bd151 %}

First, let's start the Traefik instance

`docker-compose up -d reverse-proxy`

Visit [http://localhost:8080/](http://localhost:8080/) for Traefik dashboard


Now lets fire-up a whoami instance

`docker-compose up -d whoami`

Head to the dashboard, you can see that Traefik has discovered our new service

![Traefik Dashbord](/images/trafik_dashboard.png)

Now you can scale up the whoami service to 2 and see Traefik load balancing between newly created instances

`docker-compose up --scale whoami=2`

Now head over to Traefik dashbord and you can see the number of instances has increased to 2 and Traefik already identified it.

![Traefik Dashbord 2](/images/trafik_dashbord_2.png)

There you go! You have an easy service discovery setup in less than 10 mins.

Visit Traefik documentation for more details
