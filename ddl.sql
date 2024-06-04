create table personas(
 id serial not null primary key
 nombres text

);

create table users(
id serial not null primary key,
nombres text,
paterno text,
nombreusuario text,
clave text,
id_estado varchar(1) default 'A',
fec_r timestamp default now(),
fec_m timestamp,
fec_e timestamp,
ult_usuarioa integer,
ult_usuariom integer,
ult_usuarioe integer
);

insert into users(nombres,paterno,nombreusuario,clave) values('TEOFILO','COPA','usuario1','123456');
insert into users(nombres,paterno,nombreusuario,clave) values('MARIA','JUANA','usuario2','123456');
insert into users(nombres,paterno,nombreusuario,clave) values('YESID','MAMANI','usuario3','123456');
insert into users(nombres,paterno,nombreusuario,clave) values('NELSON','TERAN','usuario4','123456');
insert into users(nombres,paterno,nombreusuario,clave) values('JORGE','BENITEZ','usuario5','123456');
insert into users(nombres,paterno,nombreusuario,clave) values('NORMA','ANTELO','usuario6','123456');
insert into users(nombres,paterno,nombreusuario,clave) values('JORGE','ARIAS','usuario7','123456');
insert into users(nombres,paterno,nombreusuario,clave) values('ROCIO','SUAREZ','usuario8','123456');
