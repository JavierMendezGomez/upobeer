create table cerveza(
       idcerveza int primary key auto_increment;
       nombre varchar(30) not null,
       porcentaje float not null,
       precio float not null,
       stock int not null,
       foto varchar(100)
);

create table operario(
       dni varchar(9) primary key,
       usuario varchar(30) not null,
       nombre varchar(30) not null,
       apellidos varchar(30) not null,
       fechanacimiento date not null,
       direccion varchar(100) not null,
       supervisor boolean not null
);

create table cliente(
       dni varchar(9) primary key,
       usuario varchar(30) not null,
       nombre varchar(30) not null,
       apellidos varchar(30) not null,
       fechanacimiento date not null,
       direccion varchar(100) not null
);

create table pedido(
       idpedido int primary key auto_increment,
       dnicliente varchar(9) not null references cliente(dni),
       fechainicio date not null,
       fechafin date
);

create table lineapedido(
       idpedido int not null auto_increment,
       idproducto int not null references cerveza(idcerveza),
       cantidad int not null,
       primary key (idpedido,idproducto)
);
