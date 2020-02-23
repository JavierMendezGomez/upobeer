create table Cerveza(
       idCerveza int auto_increment primary key,
       nombre varchar(30) not null,
       porcentaje float not null,
       precio float not null,
       stock int not null,
       foto varchar(100),
       unique (nombre,porcentaje,precio,stock,foto)
);

create table Operario(
       dni varchar(9) primary key,
       usuario varchar(30) not null,
       nombre varchar(30) not null,
       apellidos varchar(30) not null,
       fechaNacimiento date not null,
       telefono int not null,
       direccion varchar(100) not null,
       supervisor boolean not null
);

create table Cliente(
       dni varchar(9) primary key,
       usuario varchar(30) not null,
       nombre varchar(30) not null,
       apellidos varchar(30) not null,
       fechaNacimiento date not null,
       telefono int not null,
       direccion varchar(100) not null
);

create table Pedido(
       idPedido int auto_increment primary key,
       dniCliente varchar(9) not null references Cliente(dni),
       fechaInicio date not null,
       fechaFin date,
       estado varchar(30) not null
);

create table LineaPedido(
       idPedido int auto_increment not null references Pedido(idPedido),
       idProducto int not null references Cerveza(idCerveza),
       cantidad int not null,
       primary key (idPedido,idProducto)
);
