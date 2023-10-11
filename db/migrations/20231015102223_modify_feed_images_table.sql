-- migrate:up
SET foreign_key_checks = 0;
ALTER TABLE feed_images CHANGE id id int NOT NULL AUTO_INCREMENT;
SET foreign_key_checks = 1;

-- migrate:down
SET foreign_key_checks = 0;
ALTER TABLE feed_images CHANGE id id int NOT NULL;
SET foreign_key_checks = 1;
