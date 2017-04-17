package com.demo.model;

public class Comment {
	private Long id;
	private Long job_id;
	private String seeker_id;
	private Long interview_id;
	private String comment_date_time;
	private String content;
	private int hr_comment;
	private int detail_conform_comment;
	private int company_comment;
	private boolean anonymity;
	private Seeker seeker;
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
	public Long getInterview_id() {
		return interview_id;
	}
	public void setInterview_id(Long interview_id) {
		this.interview_id = interview_id;
	}
	public String getComment_date_time() {
		return comment_date_time;
	}
	public void setComment_date_time(String comment_date_time) {
		this.comment_date_time = comment_date_time;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getHr_comment() {
		return hr_comment;
	}
	public void setHr_comment(int hr_comment) {
		this.hr_comment = hr_comment;
	}
	public int getDetail_conform_comment() {
		return detail_conform_comment;
	}
	public void setDetail_conform_comment(int detail_conform_comment) {
		this.detail_conform_comment = detail_conform_comment;
	}
	public int getCompany_comment() {
		return company_comment;
	}
	public void setCompany_comment(int company_comment) {
		this.company_comment = company_comment;
	}
	public boolean isAnonymity() {
		return anonymity;
	}
	public void setAnonymity(boolean anonymity) {
		this.anonymity = anonymity;
	}
	public Seeker getSeeker() {
		return seeker;
	}
	public void setSeeker(Seeker seeker) {
		this.seeker = seeker;
	}
	
}
