package com.demo.model;

public class Session {
	private String sessionId;
	private String thirdSessionKey;
	private String openid;
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public String getThirdSessionKey() {
		return thirdSessionKey;
	}
	public void setThirdSessionKey(String thirdSessionKey) {
		this.thirdSessionKey = thirdSessionKey;
	}
	public String getSessionId() {
		return sessionId;
	}
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
}
