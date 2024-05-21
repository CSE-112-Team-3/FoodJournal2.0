CREATE DATABASE if not exists food_journal;

USE food_journal;

CREATE TABLE if not exists fd_users (
  id int primary key auto_increment,
  first_name varchar(64) not null,
  last_name varchar(64) not null,
  username varchar(255) not null,
  password varchar(255) not null,
  email varchar(255),
  created_at timestamp default current_timestamp
);

CREATE TABLE if not exists post (
  id int primary key auto_increment,
  post_id int not null,
  food_name varchar(64) not null,
  image blob,
  restaurant_name varchar(64) not null,
  rating float not null,
  review varchar(500) not null,
  tags varchar(500) not null,
  FOREIGN KEY (post_id) REFERENCES fd_users(id)
);