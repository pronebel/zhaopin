package com.demo.model;

public class Config {
	private String seeker_id;
	private boolean resume_open;
	private boolean default_send_open;
	private boolean email_accept_open;
	private boolean sms_accept_open;
	public String getSeeker_id() {
		return seeker_id;
	}
	public void setSeeker_id(String seeker_id) {
		this.seeker_id = seeker_id;
	}
	public boolean isResume_open() {
		return resume_open;
	}
	public void setResume_open(boolean resume_open) {
		this.resume_open = resume_open;
	}
	public boolean isDefault_send_open() {
		return default_send_open;
	}
	public void setDefault_send_open(boolean default_send_open) {
		this.default_send_open = default_send_open;
	}
	public boolean isEmail_accept_open() {
		return email_accept_open;
	}
	public void setEmail_accept_open(boolean email_accept_open) {
		this.email_accept_open = email_accept_open;
	}
	public boolean isSms_accept_open() {
		return sms_accept_open;
	}
	public void setSms_accept_open(boolean sms_accept_open) {
		this.sms_accept_open = sms_accept_open;
	}
	
}
