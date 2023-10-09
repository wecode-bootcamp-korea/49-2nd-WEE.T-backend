-- migrate:up
CREATE TABLE `users_subscribes` (
  `id` int PRIMARY KEY NOT NULL,
  `user_id` int NOT NULL,
  `subscribe_id` int NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `users_subscribes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `users_subscribes` ADD FOREIGN KEY (`subscribe_id`) REFERENCES `subscribes` (`id`);

-- migrate:down
DROP TABLE users_subscribes;