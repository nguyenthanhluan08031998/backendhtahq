CREATE SCHEMA if not exists `DataProject`;
USE DataProject;
DROP PROCEDURE IF EXISTS `?`;
DELIMITER //
CREATE PROCEDURE `?`()
BEGIN
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;
   CREATE TABLE `DataProject`.`av`
(
    `id`	int PRIMARY KEY auto_increment,
	`word`	TEXT,
	`html`	TEXT,
	`description`	TEXT,
	`pronounce`	TEXT
);
CREATE TABLE `DataProject`.`va`
(
    `id`	int PRIMARY KEY auto_increment,
	`word`	TEXT,
	`html`	TEXT,
	`description`	TEXT,
	`pronounce`	TEXT
);
ALTER TABLE `DataProject`.`AV` 
ADD COLUMN `IdTitle` TEXT NULL AFTER `Pronounce`,
CHANGE COLUMN `id` `Id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `word` `Word` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `html` `Html` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `description` `Description` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `pronounce` `Pronounce` TEXT NULL DEFAULT NULL ;

ALTER TABLE `DataProject`.`AV` 
RENAME TO  `DataProject`.`AV` ;

ALTER TABLE `DataProject`.`va`
ADD COLUMN `IdTitle` TEXT NULL AFTER `Pronounce`,
CHANGE COLUMN `id` `Id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `word` `Word` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `html` `Html` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `description` `Description` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `pronounce` `Pronounce` TEXT NULL DEFAULT NULL ;

ALTER TABLE `DataProject`.`va` 
RENAME TO  `DataProject`.`VA` ;
/**/
ALTER TABLE `DataProject`.`VA`
CHANGE COLUMN `IdTitle` `IdTopic` TEXT NULL DEFAULT NULL ;
ALTER TABLE `DataProject`.`AV`
CHANGE COLUMN `idTitle` `IdTopic` TEXT NULL DEFAULT NULL ;
ALTER TABLE `DataProject`.`VA`  DROP `IdTitle`;
ALTER TABLE `DataProject`.`AV`  DROP `IdTitle`;
/*8-4-2020*/
CREATE TABLE `DataProject`.`User` (
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
     `Name` text,
     `Password` text not null,
     `Email` text not null, /* = username: dùng để đăng nhập khi người dùng đăng ký tài khoản*/
     `NumberPhone` text,
     `Birthday` date,
     `Image` text,
	 `IdRole` int
);
CREATE TABLE `DataProject`.`Role` (
    `Id` INT PRIMARY KEY AUTO_INCREMENT,
     `Role` text
);
ALTER TABLE `DataProject`.`User` ADD FOREIGN KEY (`IdRole`) REFERENCES `DataProject`.`Role` (`Id`);/* liên kết khóa ngoại.*/
/*10-4-2020*/
create table `DataProject`.`Remind`(
`Id` INT PRIMARY KEY AUTO_INCREMENT,
`IdUser` int,
`TurnOnOff` bool,
`NumberWordOnDay` int,
`TimeStartRemind` time,
`TimeStopRemind` time
);
ALTER TABLE `DataProject`.`Remind` ADD FOREIGN KEY (`IdUser`) REFERENCES `DataProject`.`User` (`Id`);/* liên kết khóa ngoại.*/

create table `DataProject`.`RemindSupport`(
`Id` INT PRIMARY KEY AUTO_INCREMENT,
`IdRemind` int,
`IdWord` int
);
ALTER TABLE `DataProject`.`RemindSupport` ADD FOREIGN KEY (`IdRemind`) REFERENCES `DataProject`.`Remind` (`Id`);/* liên kết khóa ngoại.*/
ALTER TABLE `DataProject`.`RemindSupport` ADD FOREIGN KEY (`IdWord`) REFERENCES `DataProject`.`AV` (`Id`);/* liên kết khóa ngoại.*/

create table `DataProject`.`WordLike`(
`Id` INT PRIMARY KEY AUTO_INCREMENT,
`IdUser` int,
`IdWord` int
);
ALTER TABLE `DataProject`.`WordLike` ADD FOREIGN KEY (`IdUser`) REFERENCES `DataProject`.`User` (`Id`);/* liên kết khóa ngoại.*/
ALTER TABLE `DataProject`.`WordLike` ADD FOREIGN KEY (`IdWord`) REFERENCES `DataProject`.`AV` (`Id`);/* liên kết khóa ngoại.*/

create table `DataProject`.`SearchHistory`(
`Id` INT PRIMARY KEY AUTO_INCREMENT,
`IdUser` int,
`IdWord` int,
`TimeSearch` datetime
);
ALTER TABLE `DataProject`.`SearchHistory` ADD FOREIGN KEY (`IdUser`) REFERENCES `DataProject`.`User` (`Id`);/* liên kết khóa ngoại.*/
ALTER TABLE `DataProject`.`SearchHistory` ADD FOREIGN KEY (`IdWord`) REFERENCES `DataProject`.`AV` (`Id`);/* liên kết khóa ngoại.*/

create table `DataProject`.`Topic`(
`Id` INT PRIMARY KEY AUTO_INCREMENT,
`NameTopic` text,
`Translate` text
);
ALTER TABLE `dataproject`.`topic` ADD COLUMN `Activate` INT NULL AFTER `Translate`;
/*ALTER TABLE `DataProject`.`AV` ADD FOREIGN KEY (`IdTopic`) REFERENCES `DataProject`.`Topic` (`Id`);/* liên kết khóa ngoại.*/
/*ALTER TABLE `DataProject`.`VA` ADD FOREIGN KEY (`IdTopic`) REFERENCES `DataProject`.`Topic` (`Id`);/* liên kết khóa ngoại.*/

create table `DataProject`.`FuncMenu`(
 `Id` Int primary key auto_increment,
 `Name` text,
 `Local` int,
 `Image` text
 );
/*15-4-2020*/
ALTER TABLE `dataproject`.`funcmenu` ADD COLUMN `Link` TEXT NULL AFTER `Image`;
/*23 - 4-2020*/
DROP TABLE `DataProject`.`remindsupport`;

create table `DataProject`.`TopicUserRemind`(
`Id` Int primary key auto_increment,
`IdUser`  int,
`IdTopic` int
);
ALTER TABLE `DataProject`.`TopicUserRemind` ADD FOREIGN KEY (`IdUser`) REFERENCES `DataProject`.`User` (`Id`);/* liên kết khóa ngoại.*/
ALTER TABLE `DataProject`.`TopicUserRemind` ADD FOREIGN KEY (`IdTopic`) REFERENCES `DataProject`.`Topic` (`Id`);/* liên kết khóa ngoại.*/

create table `DataProject`.`TopicUserRemindDetail`(
`Id` Int primary key auto_increment,
`IdTopicUserRemind` int ,
`IdWord` int ,
`Remembered` int
);
ALTER TABLE `DataProject`.`TopicUserRemindDetail` ADD FOREIGN KEY (`IdTopicUserRemind`) REFERENCES `DataProject`.`TopicUserRemind` (`Id`);/* liên kết khóa ngoại.*/
ALTER TABLE `DataProject`.`TopicUserRemindDetail` ADD FOREIGN KEY (`IdWord`) REFERENCES `DataProject`.`AV` (`Id`);/* liên kết khóa ngoại.*/


ALTER TABLE `dataproject`.`Remind` 
ADD COLUMN `CategoryReminder` INT NULL AFTER `TimeStopRemind`;
ALTER TABLE `dataproject`.`Remind` 
ADD COLUMN `IdTopic` INT NULL AFTER `CategoryReminder`;
ALTER TABLE `dataproject`.`searchhistory` 
ADD COLUMN `Remembered` INT NULL AFTER `TimeSearch`;
ALTER TABLE `dataproject`.`wordlike` 
ADD COLUMN `Remembered` INT NULL AFTER `IdWord`;
ALTER TABLE `dataproject`.`TopicUserRemind` ADD FOREIGN KEY (`IdTopic`) REFERENCES `DataProject`.`Topic` (`Id`);
ALTER TABLE `dataproject`.`Remind` ADD FOREIGN KEY (`IdTopic`) REFERENCES `DataProject`.`Topic` (`Id`);
ALTER TABLE `dataproject`.`searchhistory` ADD COLUMN `Synchronized` INT NULL AFTER `Remembered`;
ALTER TABLE `dataproject`.`wordlike` ADD COLUMN `Synchronized` INT NULL AFTER `Remembered`;
/*create*/
create table `DataProject`.`Configuration` (
 `Id` Int primary key auto_increment,
 `Code` text,
 `value` text
);
/*22/6/2020*/
ALTER TABLE `dataproject`.`searchhistory` 
ADD COLUMN `LinkWeb` LONGTEXT NULL AFTER `Synchronized`;
/*24/6/2020*/
ALTER TABLE `dataproject`.`av` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`configuration` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`funcmenu` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`remind` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`role` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`searchhistory` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`topic` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`topicuserremind` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`topicuserreminddetail` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`user` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`va` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`wordlike` 
ADD COLUMN `IsChange` INT NOT NULL DEFAULT 0;
ALTER TABLE `dataproject`.`av` 
ADD COLUMN `YoutubeLink` nvarchar(500) DEFAULT null;
ALTER TABLE `dataproject`.`funcmenu` 
ADD COLUMN `Permission` nvarchar(500) DEFAULT null;
/*30/6/2020*/
END //
/*DELIMITER ;*/
CALL `?`();
DROP PROCEDURE `?`;