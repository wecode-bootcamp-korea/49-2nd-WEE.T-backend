-- migrate:up
SET foreign_key_checks = 0;
ALTER TABLE health_infos CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE health_infos CHANGE created_at created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE health_infos CHANGE bmi bmi DECIMAL(5, 2) NOT NULL;
ALTER TABLE health_infos CHANGE weight weight INT NOT NULL;
ALTER TABLE health_infos CHANGE skeletal_muscle_mass skeletal_muscle_mass INT NOT NULL;
ALTER TABLE health_infos CHANGE body_fat body_fat INT NOT NULL;
SET foreign_key_checks = 1;

-- migrate:down
SET foreign_key_checks = 0;
ALTER TABLE health_infos CHANGE id id int NOT NULL;
ALTER TABLE health_infos CHANGE created_at created_at timestamp NOT NULL;
ALTER TABLE health_infos CHANGE bmi bmi int NULL;
ALTER TABLE health_infos CHANGE weight weight INT NULL;
ALTER TABLE health_infos CHANGE skeletal_muscle_mass skeletal_muscle_mass INT NULL;
ALTER TABLE health_infos CHANGE body_fat body_fat INT NULL;
SET foreign_key_checks = 1;