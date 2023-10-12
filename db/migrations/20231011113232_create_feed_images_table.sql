-- migrate:up
CREATE TABLE `feed_images` (
  `id` int PRIMARY KEY NOT NULL,
  `url` varchar(300) NOT NULL,
  `feed_id` int NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `feed_images` ADD FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`);

-- migrate:down
DROP TABLE feed_images;