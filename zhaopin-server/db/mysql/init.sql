create database zhaopin;

use zhaopin;

create table seeker(
	id varchar(100) not null primary key comment 'openid',
	name varchar(20) comment '真实姓名' not null default '',
	birthday varchar(30) not null default '',
	sex enum('男','女'),
	telephone varchar(11) not null default '',
	email varchar(30) not null default '',
	avatarUrl varchar(100) not null default '',
	city varchar(10) not null default '',
	degree varchar(10) not null default '',
	electronic_resume varchar(100) not null default ''
);

create table company(
	id bigint(11) auto_increment primary key not null,
	name varchar(50) not null,
	scale varchar(20) not null,
	financing_stage varchar(20) not null,
	address varchar(100) not null,
	province varchar(10) not null,
	city varchar(10) not null,
	district varchar(10) comment '区县',
	field varchar(20)  not null,
	description varchar(500) not null
);

create table hr(
	id varchar(100) not null primary key comment 'openid',
	name varchar(20) comment '真实姓名',
	birthday varchar(30),
	company_id bigint(11),
	job varchar(20),
	telephone varchar(11),
	avatarUrl varchar(100),
	sex enum('男','女'),
	foreign key(company_id) references company(id)
);

create table resume(
	id bigint(11) auto_increment primary key not null,
	name varchar(50),
	seeker_id varchar(100) not null,
	selfAssessment varchar(500),
	report_card_url varchar(100),
	foreign key(seeker_id) references seeker(id)
);

create table hope(
	id bigint(11) auto_increment primary key not null,
	resume_id bigint(11) not null,
	job varchar(20),
	type varchar(20),
	city varchar(10),
	salary varchar(30) varchar(500),
	foreign key(resume_id) references resume(id)
);

create table education(
	id bigint(11) auto_increment primary key not null,
	resume_id bigint(11) not null,
	school varchar(20) not null,
	major varchar(20) not null,
	graduation_year varchar(10) not null,
	degree varchar(6) not null,
	foreign key(resume_id) references resume(id)
);

create table intership(
	id bigint(11) auto_increment primary key not null,
	resume_id bigint(11) not null,
	company varchar(50) not null,
	job varchar(20) not null,
	start_date varchar(20) not null,
	end_date varchar(20) not null,
	description varchar(500),
	foreign key(resume_id) references resume(id)
);

create table project(
	id bigint(11) auto_increment primary key not null,
	resume_id bigint(11) not null,
	name varchar(50) not null,
	duty varchar(20) not null,
	url varchar(100),
	start_date varchar(20) not null,
	end_date varchar(20) not null,
	description varchar(500),
	foreign key(resume_id) references resume(id)
);

create table honor(
	id bigint(11) auto_increment primary key not null,
	resume_id bigint(11) not null,
	date varchar(20) not null,
	name varchar(50) not null,
	prize varchar(10) not null,
	foreign key(resume_id) references resume(id)
);

create table job(
	id bigint(11) auto_increment primary key not null,
	name varchar(50) not null,
	salary varchar(20) not null,
	workplace varchar(100) not null,
	city varchar(20) not null,
	degree_limit varchar(10) not null,
	type varchar(10) not null,
	welfare varchar(100),
	company_id bigint(11),
	hr_id varchar(100),
	job_search varchar(2000) not null comment '包含name company job_duty job_skill',
	foreign key(hr_id) references hr(id),
	foreign key(company_id) references company(id)
);

create table job_duty(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	description varchar(100) not null,
	foreign key(job_id) references job(id)
);

create table job_skill(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	description varchar(100) not null,
	foreign key(job_id) references job(id)
);

create table campus_talk(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	scholl varchar(50) not null,
	date_time varchar(50) not null,
	foreign key(job_id) references job(id)
);

create table comment(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	seeker_id varchar(50) not null,
	date_time varchar(50) not null,
	description varchar(200) not null,
	foreign key(job_id) references job(id),
	foreign key(seeker_id) references seeker(id)
);

create table config(
	resume_open enum('true','false') default 'true',
	default_send_open enum('true','false') default 'false',
	email_accept_open enum('true','false') default 'true',
	sms_accept_open enum('true','false') default 'true'
);

create table resume_deliver_status(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	seeker_id varchar(50) not null,
	date_time varchar(50) not null,
	status enum('未查看','待沟通','面试','不合适') not null default '未查看',
	_read enum('true','false') not null default 'false',
	foreign key(job_id) references job(id),
	foreign key(seeker_id) references seeker(id)
);

create table job_invication(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	seeker_id varchar(50) not null,
	hr_id varchar(50) not null,
	date_time varchar(50) not null,
	description varchar(500) not null,
	status enum('未处理','已处理') not null default '未处理',
	_read enum('true','false') not null default 'false',
	foreign key(job_id) references job(id),
	foreign key(seeker_id) references seeker(id),
	foreign key(hr_id) references hr(id)
);

create table resume_seen(
	id bigint(11) auto_increment primary key not null,
	seeker_id varchar(50) not null,
	hr_id varchar(50) not null,
	date_time varchar(50) not null,
	_read enum('true','false') not null default 'false',
	foreign key(seeker_id) references seeker(id),
	foreign key(hr_id) references hr(id)
);

create table collection(
	id bigint(11) auto_increment primary key not null,
	seeker_id varchar(50) not null,
	job_id varchar(50) not null,
	foreign key(seeker_id) references seeker(id),
	foreign key(job_id) references job(id)
);

