db-migrate db:drop Hypertube --config ./config/database.json
db-migrate db:create Hypertube --config ./config/database.json
db-migrate up --config ./config/dev.json