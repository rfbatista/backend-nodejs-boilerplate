usecase:
	npx hygen usecase new --name $(name) --module $(module)
module:
	npx hygen module new --module $(module)
entity:
	npx hygen entity new --name $(name) --module $(module)
clean-volumes:
	docker-compose -f down --volumes
databases:
	docker-compose -f --profile db up --build
api:
	docker-compose -f --profile api up --build
migrate:
	docker-compose -f exec backend npx sequelize-cli db:migrate
seed:
	docker-compose -f exec backend npx sequelize-cli db:seed:all
load-test:
	docker-compose -f docker-compose.test.yaml up -d influxdb grafana
	docker-compose -f docker-compose.test.yaml run k6 run /scripts/ewoks.js
