package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.ResumeDeliverStatusDao;
import com.demo.model.*;

@Service
public class ResumeDeliverStatusService {

	@Resource
	private ResumeDeliverStatusDao rdsd;
	
	public int getUnReadLength(String seeker_id){
		return rdsd.getUnReadLength(seeker_id);
	}
	
	public List<ResumeDeliverStatus> getUnRead(ResumeDeliverStatus rds){
		return rdsd.getUnRead(rds);
	}
	
	public ResumeDeliverStatus getDeliverRecodeById(Long id){
		return rdsd.getDeliverRecodeById(id);
	}
	
	public boolean setRead(Long id){
		return rdsd.setRead(id);
	}
	
	public boolean deliver(ResumeDeliverStatus rds){
		return rdsd.deliver(rds);
	}
	
	public boolean hadDelivered(ResumeDeliverStatus rds){
		return rdsd.hadDelivered(rds)>0?true:false;
	}
}
