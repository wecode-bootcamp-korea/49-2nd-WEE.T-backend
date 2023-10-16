-- migrate:up
ALTER TABLE feed_images CHANGE id id int NOT NULL AUTO_INCREMENT;

-- migrate:down
ALTER TABLE feed_images CHANGE id id int NOT NULL;
