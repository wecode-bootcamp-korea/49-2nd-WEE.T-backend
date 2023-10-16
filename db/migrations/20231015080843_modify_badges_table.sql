-- migrate:up
ALTER TABLE users DROP FOREIGN KEY users_ibfk_4;
ALTER TABLE badges CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE badges CHANGE image_url image_url VARCHAR(300) NOT NULL;
ALTER TABLE `users` ADD FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`);

-- migrate:down
ALTER TABLE badges CHANGE id id int NOT NULL;
ALTER TABLE badges CHANGE image_url image_url INT NOT NULL;
