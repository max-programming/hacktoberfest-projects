build-dev:
	docker-compose -f docker/docker-compose.dev.yml build --no-cache

run-dev:
	docker-compose -f docker/docker-compose.dev.yml up -d

stop-dev:
	docker-compose -f docker/docker-compose.dev.yml down

rm-dev:
	docker-compose -f docker/docker-compose.dev.yml down -v

build-prod:
	docker-compose -f docker/docker-compose.prod.yml build --no-cache

run-prod:
	docker-compose -f docker/docker-compose.prod.yml up -d

stop-prod:
	docker-compose -f docker/docker-compose.prod.yml down

rm-prod:
	docker-compose -f docker/docker-compose.prod.yml down -v
