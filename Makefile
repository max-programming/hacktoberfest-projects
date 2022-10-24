build-development:
	docker-compose -f docker/docker-compose.dev.yml build --no-cache

run-development:
	docker-compose -f docker/docker-compose.dev.yml up -d

stop-development:
	docker-compose -f docker/docker-compose.dev.yml down

build-production:
	docker-compose -f docker/docker-compose.prod.yml build --no-cache

run-production:
	docker-compose -f docker/docker-compose.prod.yml up -d

stop-production:
	docker-compose -f docker/docker-compose.prod.yml down