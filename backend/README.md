# README

## Environments

```
POSTGRESQL_URL='postgres://{username}:{password}@{host}:5432/{db_name}?sslmode=disable'

POSTGRESQL_GORM_URL="host={host} user={username} password={password} dbname={db_name} port={port} sslmode=disable TimeZone=Asia/Bangkok"
```

## Migration

- Create CMD: migrate create -ext sql -dir adapters/db/migrations -seq {file_name}
- Migrate CMD: migrate -database $POSTGRESQL_URL -path adapters/db/migrations {up|down}

### How to fix dirty

- CMD: migrate -path adapters/db/migrations -database $POSTGRESQL_URL force {version}
