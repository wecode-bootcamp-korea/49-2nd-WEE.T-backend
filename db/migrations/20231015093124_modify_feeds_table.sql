-- migrate:up
ALTER TABLE feed_images DROP FOREIGN KEY feed_images_ibfk_1;
ALTER TABLE comments DROP FOREIGN KEY comments_ibfk_2;
ALTER TABLE feeds CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE feeds CHANGE created_at created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE feeds CHANGE updated_at updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE `feed_images` ADD FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`);

-- migrate:down
ALTER TABLE feeds CHANGE id id int NOT NULL;
ALTER TABLE feeds CHANGE created_at created_at timestamp NOT NULL;
ALTER TABLE feeds CHANGE updated_at updated_at timestamp NULL;