package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.JobInvicationDao;
import com.demo.model.*;

@Service
public class JobInvicationService {

	@Resource
	private JobInvicationDao jid;
	
	public int getUnReadLength(String seeker_id){
		return jid.getUnReadLength(seeker_id);
	}
	
	public List<JobInvication> getUnRead(JobInvication ji){
		return jid.getUnRead(ji);
	}
	
	public JobInvication getInvication(Long id){
		return jid.getInvication(id);
	}
	
	public boolean setResult(JobInvication ji){
		return jid.setResult(ji);
	}
	
	public boolean setSeekerRead(Long id){
		return jid.setSeekerRead(id);
	}
}
