package com.demo.model;

public class Education {
	private Long id;
	private Long resume_id;
	private String school;
	private String major;
	private String graduation_year;
	private String degree;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getResume_id() {
		return resume_id;
	}
	public void setResume_id(Long resume_id) {
		this.resume_id = resume_id;
	}
	public String getSchool() {
		return school;
	}
	public void setSchool(String school) {
		this.school = school;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public String getGraduation_year() {
		return graduation_year;
	}
	public void setGraduation_year(String graduation_year) {
		this.graduation_year = graduation_year;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	
}
