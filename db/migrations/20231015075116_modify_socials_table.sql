-- migrate:up
ALTER TABLE socials CHANGE id id int NOT NULL AUTO_INCREMENT;

-- migrate:down
ALTER TABLE socials CHANGE id id int NOT NULL;
