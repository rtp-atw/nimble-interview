-- table
CREATE TABLE IF NOT EXISTS keyword_users (
    "id" SERIAL PRIMARY KEY,
    "user_uuid" VARCHAR(255) NOT NULL UNIQUE,
    "keyword_uuid" VARCHAR(255) NOT NULL UNIQUE,

    "is_deleted" BOOLEAN DEFAULT FALSE NOT NULL,
    
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()::TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()::TIMESTAMPTZ
);

-- trigger (updated_at)
CREATE TRIGGER tg_keyword_users_updated_at
    BEFORE UPDATE
    ON keyword_users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
