create database sistema_fiscal;


create table if not exists usuarios (
	id serial primary key,
  	nome text not null,
  	email text not null,
  	telefone text not null
);



create table if not exists clientes(
	id serial PRIMARY KEY,
  	nome text not null,
  	cpf text not null,
  	telefone text not null,
  	cep text,
  	logradouro text,
	complemento text,
  	bairro text,
 	cidade text,
  	estato text
);


create table if not exists cobrancas (
	id serial primary key,
  	cliente_id integer not null,
  	status varchar(9) not null,
  	vencimento date not null,
  	descricao text not null, 
  	valor smallint not null,
  	foreign key (cliente_id) references clientes (id) 
  	
);


