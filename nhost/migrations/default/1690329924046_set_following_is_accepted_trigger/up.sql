CREATE OR REPLACE FUNCTION set_following_is_accepted()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_accepted = false AND
       (SELECT is_private FROM profiles WHERE id = NEW.following_profile_id) = false THEN
        NEW.is_accepted := true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER trigger_set_following_is_accepted
BEFORE INSERT ON following
FOR EACH ROW
EXECUTE FUNCTION set_following_is_accepted();
