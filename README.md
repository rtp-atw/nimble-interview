# README

## How to run

- Using `docker-compose up --build`
  > **Note:** Don't forgot to set environment

## Environments

### Backend

Using docker services

    APP_STAGE="staging"
    JWT_SECRET_KEY="c594Q03tCQd6zUIuNRf7LpgKbuJq9cuuXyPWpJwHiL1XxAEAFbJKMrwyLEGj4Mma" # Example
    POSTGRESQL_URL="postgresql://postgres:postgres@postgres/nimble?sslmode=disable"
    POSTGRESQL_GORM_URL="host=postgres user=postgres password=postgres dbname=nimble port=5432 sslmode=disable TimeZone=Asia/Bangkok"
    MQ_CONNECTION="amqp://guest:guest@rabbitmq/"

### Frontend

Set inside frontend folder

> **Note:** Can be .env or .env.local

    NEXT_PUBLIC_APP_STAGE="local"
    NEXT_PUBLIC_COOKIE_HOST=localhost
    NEXT_PUBLIC_BACKEND_HOST="http://localhost:8000"

## Future Plans

### Backend

1.  Create a user profile API for the frontend to check JWT.
2.  Implement WebSocket or gRPC to stream the results of web extraction to users in real-time.
3.  Develop pagination for the report API.
4.  Implement full-text search in the report API, instead of doing it on the frontend.
5.  Separate vhost in RabbitMQ
6.  Write test cases.

### Frontend

1.  Validate authentication through the user profile API instead of relying on cookie checking.
2.  Make the Antd table responsive.
3.  Use streaming to fetch the latest results of reports instead of employing the polling method.
