-- migrate:up
ALTER TABLE orders DROP FOREIGN KEY orders_ibfk_3;
ALTER TABLE subscription CHANGE id id int NOT NULL AUTO_INCREMENT;
ALTER TABLE `orders` ADD FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`id`);

-- migrate:down
ALTER TABLE subscription CHANGE id id int NOT NULL;
