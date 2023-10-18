-- migrate:up
ALTER TABLE health_infos CHANGE bmi bmi decimal(9,2) NOT NULL;

-- migrate:down
ALTER TABLE health_infos CHANGE bmi bmi decimal(5,2) NOT NULL;
