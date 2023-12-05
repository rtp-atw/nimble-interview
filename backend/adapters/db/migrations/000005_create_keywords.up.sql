-- table
CREATE TABLE IF NOT EXISTS keywords (
    "id" SERIAL PRIMARY KEY,
    "uuid" VARCHAR(255) NOT NULL UNIQUE,
    "keyword" VARCHAR(255) NOT NULL UNIQUE,

    "is_deleted" BOOLEAN DEFAULT FALSE NOT NULL,
    
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()::TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()::TIMESTAMPTZ
);


-- trigger (updated_at)
CREATE TRIGGER tg_keywords_updated_at
    BEFORE UPDATE
    ON keywords
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

