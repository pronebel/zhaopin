package com.demo.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.SeekerDao;
import com.demo.model.Seeker;


@Service
public class SeekerService {

	@Resource
	private SeekerDao sd;
	
	public void newSeeker(Seeker s){
		sd.newSeeker(s);
	}
	
	public Seeker getUserInfo(Seeker s){
		return sd.getUserInfo(s);
	}
	
	public boolean updateSeeker(Seeker s){
		return sd.updateSeeker(s);
	}
	
	public boolean updateAvatar(Seeker s){
		return sd.updateAvatar(s);
	}
	
	public boolean updateHope_job(Seeker s){
		return sd.updateHope_job(s);
	}
}
