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
}
