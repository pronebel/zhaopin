package com.demo.model;

import java.util.List;

public class Job {
	private String name;
	private Long id;
	private int salary_upper;
	private int salary_lower;
	private boolean status;
	private String workplace;
	private String city;
	private String district;
	private String degree_limit;
	private String welfare;
	private String release_date;
	private Long company_id;
	private String hr_id;
	private String type;
	private String job_search;
	private Company company;
	private List<JobDuty> jobduty;
	private List<JobSkill> jobskill;
	private List<CampusTalk> campustalk;
	private Hr hr;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getWorkplace() {
		return workplace;
	}
	public void setWorkplace(String workplace) {
		this.workplace = workplace;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getDegree_limit() {
		return degree_limit;
	}
	public void setDegree_limit(String degree_limit) {
		this.degree_limit = degree_limit;
	}
	public String getWelfare() {
		return welfare;
	}
	public void setWelfare(String welfare) {
		this.welfare = welfare;
	}
	
	public String getRelease_date() {
		return release_date;
	}
	public void setRelease_date(String release_date) {
		this.release_date = release_date;
	}
	public Long getCompany_id() {
		return company_id;
	}
	public void setCompany_id(Long company_id) {
		this.company_id = company_id;
	}
	public String getHr_id() {
		return hr_id;
	}
	public void setHr_id(String hr_id) {
		this.hr_id = hr_id;
	}
	public String getJob_search() {
		return job_search;
	}
	public void setJob_search(String job_search) {
		this.job_search = job_search;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getSalary_upper() {
		return salary_upper;
	}
	public void setSalary_upper(int salary_upper) {
		this.salary_upper = salary_upper;
	}
	public int getSalary_lower() {
		return salary_lower;
	}
	public void setSalary_lower(int salary_lower) {
		this.salary_lower = salary_lower;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public List<JobDuty> getJobduty() {
		return jobduty;
	}
	public void setJobduty(List<JobDuty> jobduty) {
		this.jobduty = jobduty;
	}
	public List<JobSkill> getJobskill() {
		return jobskill;
	}
	public void setJobskill(List<JobSkill> jobskill) {
		this.jobskill = jobskill;
	}
	public List<CampusTalk> getCampustalk() {
		return campustalk;
	}
	public void setCampustalk(List<CampusTalk> campustalk) {
		this.campustalk = campustalk;
	}
	public Hr getHr() {
		return hr;
	}
	public void setHr(Hr hr) {
		this.hr = hr;
	}
	
}
