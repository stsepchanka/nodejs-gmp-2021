create table users (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), login text, password text, age integer, isDeleted boolean);

insert into users (login, password, age) values ('vasil_vasiliev', 'vasiliev1', 40);
insert into users (login, password, age) values ('semen_semenov', 'semenov1', 35);
insert into users (login, password, age) values ('petr_petrov', 'petrov1', 30);
insert into users (login, password, age) values ('ivan_ivanov', 'ivanov1', 25);

SELECT * FROM users;
