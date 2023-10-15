-- migrate:up
ALTER TABLE foods CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE foods ADD nutrient_content int NOT NULL;
ALTER TABLE foods CHANGE image_url image_url VARCHAR(300) NOT NULL;

-- migrate:down
ALTER TABLE foods CHANGE id id int NOT NULL;
ALTER TABLE foods DROP nutrient_content;
ALTER TABLE foods CHANGE image_url image_url INT NOT NULL;
