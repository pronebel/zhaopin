package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.ConfigDao;
import com.demo.model.*;

@Service
public class ConfigService {

	@Resource
	private ConfigDao cd;
	
	public Config getConfig(Config c){
		return cd.getConfig(c);
	}
	
	public void addConfig(Config c){
		cd.addConfig(c);
	}
	
	public boolean updateConfig(Config c){
		return cd.updateConfig(c);
	}
}
