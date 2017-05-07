package com.demo.model;

public class ResumeDeliverStatus {
	private Long id;
	private Long job_id;
	private String seeker_id;
	private Long resume_id;
	private String deliver_date_time;
	private String read_date_time;
	private String reject_date_time;
	private String interview_date_time;
	private String status;
	private boolean seeker_read;
	private boolean hr_read;
	private Job job;
	private Seeker seeker;
	public Seeker getSeeker() {
		return seeker;
	}
	public void setSeeker(Seeker seeker) {
		this.seeker = seeker;
	}
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
	public String getDeliver_date_time() {
		return deliver_date_time;
	}
	public void setDeliver_date_time(String deliver_date_time) {
		this.deliver_date_time = deliver_date_time;
	}
	public String getRead_date_time() {
		return read_date_time;
	}
	public void setRead_date_time(String read_date_time) {
		this.read_date_time = read_date_time;
	}
	public String getInterview_date_time() {
		return interview_date_time;
	}
	public void setInterview_date_time(String interview_date_time) {
		this.interview_date_time = interview_date_time;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Job getJob() {
		return job;
	}
	public void setJob(Job job) {
		this.job = job;
	}
	public Long getResume_id() {
		return resume_id;
	}
	public void setResume_id(Long resume_id) {
		this.resume_id = resume_id;
	}
	public String getReject_date_time() {
		return reject_date_time;
	}
	public void setReject_date_time(String reject_date_time) {
		this.reject_date_time = reject_date_time;
	}
	
	
}
