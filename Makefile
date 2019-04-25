.DEFAULT_GOAL := dev

build-dev: # Build container as development
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache app

dev: # Run application as development with nodemon and hot reload
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d app

build: # Build container
	docker-compose build --no-cache app

start: # Start container
	docker-compose up -d app

init: # Start container with building force
	docker-compose up --build -d app

stop: # Stop container
	docker-compose stop app

remove: # Remove container
	docker-compose rm app

logs: # Show container logs
	docker-compose logs app

tests: # Run applications tests with Mocha (also force development environment)
	make dev && docker-compose exec app npm run test