-- migrate:up
ALTER TABLE foods DROP FOREIGN KEY foods_ibfk_1;
ALTER TABLE nutrition CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE `foods` ADD FOREIGN KEY (`nutrition_id`) REFERENCES `nutrition` (`id`);

-- migrate:down
ALTER TABLE nutrition CHANGE id id int NOT NULL;
