-- table
CREATE TABLE IF NOT EXISTS reports (
    "id" SERIAL PRIMARY KEY,
    "uuid" VARCHAR(255) NOT NULL UNIQUE,
    "user_uuid" VARCHAR(255) NOT NULL,
    "keyword_uuid" VARCHAR(255) NOT NULL,

    "ads" INTEGER,
    "links" INTEGER,
    "total_result" INTEGER,
    "process_time" REAL, -- float32
    "html" TEXT,

    "is_deleted" BOOLEAN DEFAULT FALSE NOT NULL,
    
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()::TIMESTAMPTZ,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()::TIMESTAMPTZ
);

-- trigger (updated_at)
CREATE TRIGGER tg_reports_updated_at
    BEFORE UPDATE
    ON reports
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
