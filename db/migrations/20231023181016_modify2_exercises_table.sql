-- migrate:up
ALTER TABLE exercises ADD COLUMN `content` VARCHAR(1000) NOT NULL;
ALTER TABLE exercises ADD COLUMN `weight` int NULL;

-- migrate:down
DROP TABLE exercises COLUMN `content` VARCHAR(1000) NOT NULL;
DROP TABLE exercises COLUMN `weight` int NULL;