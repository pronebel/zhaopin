package com.demo.model;

import java.util.List;

public class Resume {
	private Long id;
	private String seeker_id;
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	private String selfAssessment;
	private String hope_job;
	private String hope_job_type;
	private String hope_city;
	private String hope_salary;
	private String hope_description;
	private String report_card_url;
	private Seeker userInfo;
	private List<Education> educations;
	private List<Project> projects;
	private List<Intership> interships;
	private List<Honor> honors;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSeeker_id() {
		return seeker_id;
	}
	public void setSeeker_id(String seeker_id) {
		this.seeker_id = seeker_id;
	}
	public String getSelfAssessment () {
		return selfAssessment ;
	}
	public void setSelfAssessment (String selfAssessment ) {
		this.selfAssessment  = selfAssessment ;
	}
	public String getHope_job() {
		return hope_job;
	}
	public void setHope_job(String hope_job) {
		this.hope_job = hope_job;
	}
	public String getHope_job_type() {
		return hope_job_type;
	}
	public void setHope_job_type(String hope_job_type) {
		this.hope_job_type = hope_job_type;
	}
	public String getHope_city() {
		return hope_city;
	}
	public void setHope_city(String hope_city) {
		this.hope_city = hope_city;
	}
	public String getHope_salary() {
		return hope_salary;
	}
	public void setHope_salary(String hope_salary) {
		this.hope_salary = hope_salary;
	}
	public String getHope_description() {
		return hope_description;
	}
	public void setHope_description(String hope_description) {
		this.hope_description = hope_description;
	}
	public String getReport_card_url() {
		return report_card_url;
	}
	public void setReport_card_url(String report_card_url) {
		this.report_card_url = report_card_url;
	}
	public Seeker getUserInfo() {
		return userInfo;
	}
	public void setUserInfo(Seeker userInfo) {
		this.userInfo = userInfo;
	}
	public List<Education> getEducations() {
		return educations;
	}
	public void setEducations(List<Education> educations) {
		this.educations = educations;
	}
	public List<Project> getProjects() {
		return projects;
	}
	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}
	public List<Intership> getInterships() {
		return interships;
	}
	public void setInterships(List<Intership> interships) {
		this.interships = interships;
	}
	public List<Honor> getHonors() {
		return honors;
	}
	public void setHonors(List<Honor> honors) {
		this.honors = honors;
	}
	
	
}
