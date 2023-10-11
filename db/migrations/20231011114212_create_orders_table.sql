-- migrate:up
CREATE TABLE `orders` (
  `id` int PRIMARY KEY NOT NULL,
  `user_id` int NOT NULL,
  `payment_id` int NOT NULL,
  `subscription_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `orders` ADD FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`);
ALTER TABLE `orders` ADD FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`id`);

-- migrate:down
DROP TABLE orders;