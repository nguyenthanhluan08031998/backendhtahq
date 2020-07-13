/*CREATE SCHEMA if not exists `DataProject`;
USE DataProject;
DROP PROCEDURE IF EXISTS `?`;
DELIMITER //
CREATE PROCEDURE `?`()
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;
  /*CREATE SCHEMA `DataProject`;*/
  /*CREATE TABLE `DataProject`.`User`
(
  `ID` int PRIMARY KEY auto_increment,
  `NameUser` varchar(255),
  `PasswordUser` int,
  `DateBirth` date,
  `NumberPhone` varchar(255),
  `Gmail` varchar(255),
  `IDCategoryUser` int,
  `IDCateogoryLogin` int
);
CREATE TABLE `DataProject`.`CategoryUser`
(
  `ID` int PRIMARY KEY auto_increment,
  `NameCategoryUser` varchar(255)
);
CREATE TABLE `DataProject`.`CategoryLogin`
(
  `ID` int PRIMARY KEY auto_increment,
  `NameCategoryLogin` varchar(255)
);
CREATE TABLE `DataProject`.`MenuItem`
(
  `ID` int PRIMARY KEY auto_increment,
  `LocalItem` int,
  `ImageItem` varchar(255),
  `NameItem` varchar(255)
);
/*ALTER TABLE `User` ADD FOREIGN KEY (`IDCategoryUser`) REFERENCES `CategoryUser` (`ID`);/* liên kết khóa ngoại.*/
/*ALTER TABLE `User` ADD FOREIGN KEY (`IDCategoryLogin`) REFERENCES `CategoryLogin` (`ID`);/* liên kết khóa ngoại.*/

/*END //
DELIMITER ;
CALL `?`();
DROP PROCEDURE `?`;