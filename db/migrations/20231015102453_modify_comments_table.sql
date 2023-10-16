-- migrate:up
ALTER TABLE comments CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE comments CHANGE created_at created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE comments CHANGE updated_at updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP;

-- migrate:down
ALTER TABLE comments CHANGE id id int NOT NULL;
ALTER TABLE comments CHANGE created_at created_at timestamp NOT NULL;
ALTER TABLE comments CHANGE updated_at updated_at timestamp NULL;
