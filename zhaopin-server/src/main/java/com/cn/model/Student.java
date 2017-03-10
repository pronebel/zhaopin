package com.cn.model;

import java.util.Date;

/**
 * 学生模型
 * @author Cloud Lau
 * @company SZU
 * @date 2016年3月5日
 * @description
 */
public class Student {
	
	/**
	 * 学号
	 */
	private Long id;
	
	/**
	 * 姓名
	 */
	private String name;
	
	/**
	 * 年龄
	 */
	private Date birthday;
	
	/**
	 * 性别
	 */
	private String gender;
	
	/**
	 * 班级编号
	 */
	private Long clazzId;
	
	public Student(){
		
	}
	
	public Student(Long id){
		setId(id);
	}
	
	public Student(Long id,String name,Date birthday,String gender,Long clazzId){
		setId(id);
		setName(name);
		setBirthday(birthday);
		setGender(gender);
		setClazzId(clazzId);		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Long getClazzId() {
		return clazzId;
	}

	public void setClazzId(Long clazzId) {
		this.clazzId = clazzId;
	}
	
}
