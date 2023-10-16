-- migrate:up
ALTER TABLE users DROP FOREIGN KEY users_ibfk_2;
ALTER TABLE gender CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE gender CHANGE name name varchar(6) NOT NULL;
ALTER TABLE `users` ADD FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`);

-- migrate:down
ALTER TABLE gender CHANGE id id int NOT NULL;
ALTER TABLE gender CHANGE name name varchar(5) NOT NULL;
