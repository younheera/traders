insert into "user" (user_id, username, password, email, activated) values (3,'admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin@naver.com', 1);
insert into "user" (user_id, username, password, email, activated) values (4,'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user@naver.com', 1);

insert into authority (authority_name) values ('ROLE_USER');
insert into authority (authority_name) values ('ROLE_ADMIN');

insert into user_authority (user_id, authority_name) values (3, 'ROLE_USER');
insert into user_authority (user_id, authority_name) values (4, 'ROLE_ADMIN');