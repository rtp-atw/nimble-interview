-- trigger (updated_at)
CREATE TRIGGER tg_users_updated_at
    BEFORE UPDATE
    ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
