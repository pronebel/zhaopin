package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.InterviewDao;
import com.demo.model.*;

@Service
public class InterviewService {

	@Resource
	private InterviewDao rdsd;
	
	public int getUnReadLength(String seeker_id){
		return rdsd.getUnReadLength(seeker_id);
	}
	
	public List<Interview> getUnRead(Interview i){
		return rdsd.getUnRead(i);
	}
	
	public Interview getInterviewById(Long id){
		return rdsd.getInterviewById(id);
	}
	
	public boolean setRead(Long id){
		return rdsd.setRead(id);
	}
	
	public boolean comment(Long id){
		return rdsd.comment(id);
	}
}
