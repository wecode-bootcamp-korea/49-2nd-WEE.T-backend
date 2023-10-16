-- migrate:up
ALTER TABLE exercises CHANGE id id int NOT NULL AUTO_INCREMENT;

-- migrate:down
ALTER TABLE exercises CHANGE id id int NOT NULL;
