-- create databases
CREATE DATABASE IF NOT EXISTS `sysop_db`;
CREATE DATABASE IF NOT EXISTS `sysop_db_test`;

-- CREATE USER 'index'@'localhost' IDENTIFIED BY 'local';
GRANT ALL PRIVILEGES ON sysop_db.* TO 'sysop_user'@'%';
GRANT ALL PRIVILEGES ON sysop_db_test.* TO 'sysop_user'@'%';