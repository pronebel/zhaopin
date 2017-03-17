package com.demo.model;

import java.util.List;

public class Resume {
	private Long id;
	private String seeker_id;
	private String name;
	private String selfAssessment;
	private String report_card_url;
	private Seeker userInfo;
	private List<Education> educations;
	private List<Project> projects;
	private List<Intership> interships;
	private List<Honor> honors;
	private Hope hope;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSelfAssessment() {
		return selfAssessment;
	}
	public void setSelfAssessment(String selfAssessment) {
		this.selfAssessment = selfAssessment;
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
	public Hope getHope() {
		return hope;
	}
	public void setHope(Hope hope) {
		this.hope = hope;
	}
	
}
