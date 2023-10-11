-- migrate:up
SET foreign_key_checks = 0;
ALTER TABLE gender CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE gender CHANGE name name varchar(6) NOT NULL;
SET foreign_key_checks = 1;

-- migrate:down
SET foreign_key_checks = 0;
ALTER TABLE gender CHANGE id id int NOT NULL;
ALTER TABLE gender CHANGE name name varchar(5) NOT NULL;
SET foreign_key_checks = 1;
