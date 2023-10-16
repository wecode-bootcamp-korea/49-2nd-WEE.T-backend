-- migrate:up
ALTER TABLE subscribes CHANGE id id int NOT NULL AUTO_INCREMENT;

-- migrate:down
ALTER TABLE subscribes CHANGE id id int NOT NULL;
