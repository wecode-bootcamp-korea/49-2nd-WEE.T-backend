-- migrate:up
SET foreign_key_checks = 0;
ALTER TABLE badges CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE badges CHANGE image_url image_url VARCHAR(300) NOT NULL;
SET foreign_key_checks = 1;

-- migrate:down
SET foreign_key_checks = 0;
ALTER TABLE badges CHANGE id id int NOT NULL;
ALTER TABLE badges CHANGE image_url image_url INT NOT NULL;
SET foreign_key_checks = 1;