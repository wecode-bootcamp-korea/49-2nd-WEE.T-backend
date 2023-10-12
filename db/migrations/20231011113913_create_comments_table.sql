-- migrate:up
CREATE TABLE `comments` (
  `id` int PRIMARY KEY NOT NULL,
  `content` varchar(30) NOT NULL,
  `user_id` int NOT NULL,
  `feed_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `comments` ADD FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`);

-- migrate:down
DROP TABLE comments;