-- migrate:up
ALTER TABLE `feed_images` DROP FOREIGN KEY `feed_images_ibfk_1`;

-- migrate:down