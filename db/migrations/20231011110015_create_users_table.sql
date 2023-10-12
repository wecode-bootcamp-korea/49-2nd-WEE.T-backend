-- migrate:up
CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL,
  `nickname` varchar(8) NULL UNIQUE,
  `email` varchar(30) NOT NULL,
  `height` int NULL,
  `goal_weight` int NULL,
  `birth_date` varchar(10),
  `sns_id` varchar(50) NOT NULL,
  `social_id` int NOT NULL,
  `gender_id` int NULL,
  `subscribe_id` int NULL,
  `badge_id` int NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `users` ADD FOREIGN KEY (`social_id`) REFERENCES `socials` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (`subscribe_id`) REFERENCES `subscribes` (`id`);
ALTER TABLE `users` ADD FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`);
ALTER TABLE `users` ADD UNIQUE KEY (email, social_id);  

-- migrate:down
DROP TABLE users;