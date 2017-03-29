drop database zhaopin;

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
	hope_job varchar(20),
	electronic_resume varchar(100) not null default ''
);

create table company(
	c_id bigint(11) auto_increment primary key not null,
	c_name varchar(50) not null comment '全称',
	c_name_short varchar(20) not null comment '简称',
	scale varchar(20) not null,
	financing_stage varchar(20) not null,
	address varchar(100) not null,
	province varchar(10) not null,
	c_city varchar(10) not null,
	c_district varchar(10) comment '区县',
	field varchar(20)  not null,
	description varchar(500) not null default '',
	longitude varchar(40) not null default '' comment '经度',
	latitude varchar(40) not null default '' comment '纬度',
	logo  varchar(200) comment '小图',
	poster  varchar(200) comment '大图'
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
	foreign key(company_id) references company(c_id)
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
	salary varchar(30),
	description varchar(500),
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
	j_id bigint(11) auto_increment primary key not null,
	j_name varchar(50) not null,
	salary_lower int not null,
	salary_upper int not null,
	status boolean not null default 1 comment '职位状态',
	workplace varchar(100) not null comment '详细地址',
	j_city varchar(20) not null,
	j_district varchar(20),
	degree_limit varchar(10) not null,
	welfare varchar(100),
	type varchar(20),
	company_id bigint(11),
	hr_id varchar(100),
	release_date varchar(50) not null,
	job_search varchar(2000) not null comment '包含name company job_duty job_skill',
	foreign key(hr_id) references hr(id),
	foreign key(company_id) references company(c_id)
);

create table job_duty(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	description varchar(100) not null,
	foreign key(job_id) references job(j_id)
);

create table job_skill(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	description varchar(100) not null,
	foreign key(job_id) references job(j_id)
);

create table campus_talk(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	scholl varchar(50) not null,
	date_time varchar(50) not null,
	foreign key(job_id) references job(j_id)
);

create table comment(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	seeker_id varchar(50) not null,
	date_time varchar(50) not null,
	description varchar(200) not null,
	foreign key(job_id) references job(j_id),
	foreign key(seeker_id) references seeker(id)
);

create table config(
	seeker_id varchar(100) not null primary key,
	resume_open boolean default 1,
	default_send_open boolean default 0,
	email_accept_open boolean default 1,
	sms_accept_open boolean default 1,
	foreign key(seeker_id) references seeker(id)
);

create table resume_deliver_status(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	seeker_id varchar(50) not null,
	resume_id bigint(11) not null comment '简历投递的id',
	deliver_date_time varchar(50) not null comment '简历投递的时间',
	read_date_time varchar(50) comment '企业查看该简历时的时间，插入值后要将status改为待沟通 _read改为未读',
	interview_date_time varchar(50) comment '企业邀请面试时的时间，插入值后要将status改为面试 _read改为未读 并且在table interview 中插入一条新数据',
	status enum('未查看','待沟通','面试','不合适') not null default '未查看',
	seeker_read boolean not null default 0 comment '投递者是否已读',
	hr_read boolean not null default 0 comment 'hr是否已读 在发出面试邀请后 seeker方可能同意也可能拒绝',
	foreign key(job_id) references job(j_id),
	foreign key(resume_id) references resume(id),
	foreign key(seeker_id) references seeker(id)
);

create table interview(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	seeker_id varchar(50) not null,
	date_time varchar(50) not null comment '面试时间',
	seeker_anwser boolean comment 'seeker是否同意面试',
	result boolean comment '面试结果 通过和不通过 都要修改resume_deliver_status表对应的seeker_read为false',
	address varchar(50) comment '面试地点',
	other varchar(200) comment '其他特殊说明,如邀请面试的场面话等',
	foreign key(job_id) references job(j_id),
	foreign key(seeker_id) references seeker(id)
);

create table job_invication(
	id bigint(11) auto_increment primary key not null,
	job_id bigint(11) not null,
	seeker_id varchar(50) not null,
	hr_id varchar(50) not null,
	invicate_date_time varchar(50) not null comment '企业发出邀请时的时间 企业发出邀请后要在intreview表中插入一条新数据',
	result boolean comment '被邀请者处理后 同意或者拒绝',
	description varchar(500) not null,
	status enum('未处理','已处理') not null default '未处理',
	seeker_read boolean not null default 0,
	hr_read boolean not null default 0,
	foreign key(job_id) references job(j_id),
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
	job_id bigint(11) not null,
	foreign key(seeker_id) references seeker(id),
	foreign key(job_id) references job(j_id)
);


insert into hr(id,name,birthday,company_id,job,telephone,avatarUrl,sex)
 	values('openidhr','hr','',1,'','','','男');


 insert into company(c_name_short,c_name,scale,financing_stage,address,province,c_city,c_district,field)
  values ('爱奇艺','爱奇艺公司','100-500人','天使轮','深圳南山区','广东省','深圳','南山区','移动互联网');


 insert into job(j_name,salary_lower,salary_upper,status,workplace,j_city,j_district,degree_limit,type,welfare,hr_id,company_id,job_search,release_date)
 	values('前端',5,10,1,'深圳南山区','深圳','南山区','本科','全职','没有','openidhr',1,'前端','2017-03-20');

INSERT INTO resume_deliver_status(job_id,seeker_id,deliver_date_time)
VALUES (10,'oUE_60BwG0F_Dna5NIsSvFz_YlRQ','2017-03-25 10:10:00')

INSERT INTO job_invication(seeker_id,job_id,hr_id,invicate_date_time,description)
VALUES('oUE_60BwG0F_Dna5NIsSvFz_YlRQ',10,'openidhr','2017-03-25 10:10','asdas')