package com.demo.model;

public class JobInvication {
	private Long id;
	private Long job_id;
	private String seeker_id;
	private String hr_id;
	private String invicate_date_time;
	private boolean result;
	private String description;
	private String status;
	private boolean seeker_read;
	private boolean hr_read;
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
	public String getHr_id() {
		return hr_id;
	}
	public void setHr_id(String hr_id) {
		this.hr_id = hr_id;
	}
	public String getInvicate_date_time() {
		return invicate_date_time;
	}
	public void setInvicate_date_time(String invicate_date_time) {
		this.invicate_date_time = invicate_date_time;
	}
	public boolean isResult() {
		return result;
	}
	public void setResult(boolean result) {
		this.result = result;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public boolean isSeeker_read() {
		return seeker_read;
	}
	public void setSeeker_read(boolean seeker_read) {
		this.seeker_read = seeker_read;
	}
	public boolean isHr_read() {
		return hr_read;
	}
	public void setHr_read(boolean hr_read) {
		this.hr_read = hr_read;
	}
	
	
}
