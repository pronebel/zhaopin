package com.demo.model;

public class Interview {
	private Long id;
	private Long job_id;
	private String seeker_id;
	private String interview_date_time;
	private String set_interview_end_date_time;
	private String interview_flag;
	private String set_result_date_time;
	private String result;
	private String i_address;
	private String other;
	private boolean seeker_read;
	private boolean had_commented;
	private Job job;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getJob_id() {
		return job_id;
	}
	public void setJob_id(Long job_id) {
		this.job_id = job_id;
	}
	public String getSeeker_id() {
		return seeker_id;
	}
	public void setSeeker_id(String seeker_id) {
		this.seeker_id = seeker_id;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}

	public boolean isSeeker_read() {
		return seeker_read;
	}
	public void setSeeker_read(boolean seeker_read) {
		this.seeker_read = seeker_read;
	}
	public Job getJob() {
		return job;
	}
	public void setJob(Job job) {
		this.job = job;
	}
	public String getI_address() {
		return i_address;
	}
	public void setI_address(String i_address) {
		this.i_address = i_address;
	}
	public String getOther() {
		return other;
	}
	public void setOther(String other) {
		this.other = other;
	}
	public String getInterview_date_time() {
		return interview_date_time;
	}
	public void setInterview_date_time(String interview_date_time) {
		this.interview_date_time = interview_date_time;
	}
	public String getSet_interview_end_date_time() {
		return set_interview_end_date_time;
	}
	public void setSet_interview_end_date_time(String set_interview_end_date_time) {
		this.set_interview_end_date_time = set_interview_end_date_time;
	}
	public String getInterview_flag() {
		return interview_flag;
	}
	public void setInterview_flag(String interview_flag) {
		this.interview_flag = interview_flag;
	}
	public String getSet_result_date_time() {
		return set_result_date_time;
	}
	public void setSet_result_date_time(String set_result_date_time) {
		this.set_result_date_time = set_result_date_time;
	}
	public boolean isHad_commented() {
		return had_commented;
	}
	public void setHad_commented(boolean had_commented) {
		this.had_commented = had_commented;
	}
	
}
