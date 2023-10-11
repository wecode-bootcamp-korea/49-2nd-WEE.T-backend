-- migrate:up
SET foreign_key_checks = 0;
ALTER TABLE feeds CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE feeds CHANGE created_at created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE feeds CHANGE updated_at updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP;
SET foreign_key_checks = 1;

-- migrate:down
SET foreign_key_checks = 0;
ALTER TABLE feeds CHANGE id id int NOT NULL;
ALTER TABLE feeds CHANGE created_at created_at timestamp NOT NULL;
ALTER TABLE feeds CHANGE updated_at updated_at timestamp NULL;
SET foreign_key_checks = 1;