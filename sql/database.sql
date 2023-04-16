CREATE TABLE IF NOT EXISTS `employees` (
                            `id` int unsigned NOT NULL AUTO_INCREMENT,
                            `employee_num` int unsigned NOT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY (`employee_num`)
);

CREATE TABLE IF NOT EXISTS `attendances` (
                         `id` int unsigned NOT NULL AUTO_INCREMENT,
                         `employee_num` int unsigned NOT NULL,
                         `clock_date` date DEFAULT NULL,
                         `clock_in` time DEFAULT NULL,
                         `clock_out` time DEFAULT NULL,
                         PRIMARY KEY (`id`),
                         UNIQUE (`employee_num`, `clock_date`),
                         FOREIGN KEY (`employee_num`) REFERENCES `employees` (`employee_num`) ON DELETE CASCADE
);
