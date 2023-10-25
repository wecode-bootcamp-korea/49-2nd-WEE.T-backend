-- SQLBook: Code
-- migrate:up
CREATE TABLE `feeds` (
  `id` int PRIMARY KEY NOT NULL,
  `content` varchar(100) NULL,
  `is_challenge` tinyint NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `feeds` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- migrate:down
DROP TABLE feeds;