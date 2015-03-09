use ghanfishing;
#DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages
(
msgId INT NOT NULL AUTO_INCREMENT,
senderMobile VARCHAR(50),
senderName VARCHAR(100),
msgdatetime DATE,
message TEXT,
userKey VARCHAR(50),
PRIMARY KEY (msgId)
);

#DROP TABLE IF EXISTS fishusers;
CREATE TABLE IF NOT EXISTS users
(
userId INT NOT NULL AUTO_INCREMENT,
userKey VARCHAR(50),
userName VARCHAR(100),
userMobile VARCHAR(50),
dateJoined DATETIME,
PRIMARY KEY (userID)
#what else is there to add??? location?
);

#ALTER TABLE fishmsg CHANGE msgdate msgdatetime DATE;

INSERT INTO users (userKey,userName,userMobile,dateJoined)
VALUES ("fishy","Casey Slaught","18057292585","2015-03-05 12:12:12");

