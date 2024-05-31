CREATE DATABASE if not exists food_journal;

USE food_journal;

CREATE TABLE if not exists fd_users (
  id int primary key auto_increment,
  first_name varchar(64) not null,
  last_name varchar(64) not null,
  username varchar(255) not null,
  password varchar(255) not null,
  email varchar(255),
  profile_picture blob,
  created_at timestamp default current_timestamp
);

CREATE TABLE if not exists post (
  id int primary key auto_increment,
  post_id int not null,
  food_name varchar(64) not null,
  image blob,
  restaurant_name varchar(64),
  rating float not null,
  review varchar(500) not null,
  tags varchar(500),
  FOREIGN KEY (post_id) REFERENCES fd_users(id)
);

CREATE TABLE if not exists blacklist (
  id int primary key auto_increment,
  access_token varchar(500) not null
);