-- migrate:up
SET foreign_key_checks = 0;
ALTER TABLE users CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE users CHANGE birth_date birth_year varchar(4);
ALTER TABLE users CHANGE created_at created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE users CHANGE updated_at updated_at timestamp NULL ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE users ADD goal_body_fat int NULL;
ALTER TABLE users ADD goal_skeletal_muscle_mass int NULL;
SET foreign_key_checks = 1;

-- migrate:down
SET foreign_key_checks = 0;
ALTER TABLE users CHANGE id id int NOT NULL;
ALTER TABLE users CHANGE birth_year birth_date birth_year varchar(10);
ALTER TABLE users CHANGE created_at created_at timestamp NOT NULL;
ALTER TABLE users CHANGE updated_at updated_at timestamp NULL;
ALTER TABLE users DROP goal_body_fat;
ALTER TABLE users DROP goal_skeletal_muscle_mass;
SET foreign_key_checks = 1;