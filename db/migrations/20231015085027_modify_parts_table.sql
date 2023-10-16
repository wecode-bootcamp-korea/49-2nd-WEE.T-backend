-- migrate:up
ALTER TABLE exercises DROP FOREIGN KEY exercises_ibfk_1;
ALTER TABLE parts CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE `exercises` ADD FOREIGN KEY (`part_id`) REFERENCES `parts` (`id`);

-- migrate:down
ALTER TABLE parts CHANGE id id int NOT NULL;
