-- trigger (updated_at)
CREATE TRIGGER tg_insurance_options_updated_at
    BEFORE UPDATE
    ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
