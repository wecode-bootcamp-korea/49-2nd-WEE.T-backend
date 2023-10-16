-- migrate:up
ALTER TABLE orders CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE orders CHANGE created_at created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE orders CHANGE updated_at updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP;

-- migrate:down
ALTER TABLE orders CHANGE id id int NOT NULL;
ALTER TABLE orders CHANGE created_at created_at timestamp NOT NULL;
ALTER TABLE orders CHANGE updated_at updated_at timestamp NULL;
