-- migrate:up
SET foreign_key_checks = 0;
ALTER TABLE `feed_images` ADD FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`) ON DELETE CASCADE;
SET foreign_key_checks = 1;

-- migrate:down
SET foreign_key_checks = 0;
ALTER TABLE `feed_images` ADD FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`);
SET foreign_key_checks = 1;