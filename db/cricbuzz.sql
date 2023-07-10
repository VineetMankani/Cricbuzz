CREATE DATABASE cricbuzz;
USE cricbuzz;

CREATE TABLE user (
	user_id VARCHAR(128) PRIMARY KEY,
	username VARCHAR(64) UNIQUE,
    password VARCHAR(64) NOT NULL,
    email VARCHAR(128) UNIQUE
);

-- INSERT INTO user VALUES
-- 	("1", "vineetmankani", "pass", "vineetmankani@gmail.com");
    
CREATE TABLE matches (
	match_id VARCHAR(128) PRIMARY KEY,
	team_1 VARCHAR(64),
	team_2 VARCHAR(64),
    date VARCHAR(64),
	venue VARCHAR(2048),
    status ENUM ("completed", "live", "upcoming")
);

-- INSERT INTO matches VALUES
-- 	("1", "India", "England", "2023-07-10", "Lord's Cricket Ground"),
-- 	("2", "Australia", "New Zealand", "2023-07-11", "Melbourne Cricket Ground");
    
CREATE TABLE player (
	player_id VARCHAR(64) PRIMARY KEY,
	name VARCHAR(64),
    role VARCHAR(64),
	matches_played INT,
	runs INT,
	average INT,
	strike_rate INT
);

INSERT INTO player VALUES
	("1", "Virat Kohli", "Batsman", 200, 12000, 59.8, 92.5);

    
DROP TABLE user;
DROP TABLE matches;
DROP TABLE player;