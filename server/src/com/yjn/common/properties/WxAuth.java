package com.yjn.common.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@ConfigurationProperties(prefix = "wxapp")
@Data
public class WxAuth {
	private String appId;
	
	private String secret;
	
	private String grantType;
	
	private String sessionHost;

	public String getAppId() {
		return appId;
	}


	public String getSecret() {
		return secret;
	}


	public String getGrantType() {
		return grantType;
	}


	public String getSessionHost() {
		return sessionHost;
	}

}
