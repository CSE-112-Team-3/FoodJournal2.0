CREATE DATABASE if not exists food_journal;

USE food_journal;

CREATE TABLE if not exists fd_users (
  id int primary key auto_increment,
  first_name varchar(64) not null,
  last_name varchar(64) not null,
  username varchar(64) not null,
  password varchar(64) not null,
  email varchar(64),
  created_at timestamp default current_timestamp
);

CREATE TABLE if not exists post (
  id int primary key,
  food_name varchar(64) not null,
  img varchar(64),
  rating int not null,
  rest_name varchar(64),
  review varchar(64) not null,
  tags varchar(64) not null,
  FOREIGN KEY (id) REFERENCES fd_users(id)
);