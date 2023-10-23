-- migrate:up
ALTER TABLE foods ADD information VARCHAR(40) NOT NULL;

-- migrate:down
ALTER TABLE foods DROP information;
