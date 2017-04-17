package com.demo.service;
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.HopeDao;
import com.demo.model.*;

@Service
public class HopeService {

	@Resource
	private HopeDao hd;
	
	public Hope getHope(Hope h){
		return hd.getHope(h);
	}
	
	public boolean updateHope(Hope h){
		return hd.updateHope(h);
	}
	
	public boolean newHope(Hope h){
		return hd.newHope(h);
	}
	
	public void deleteHope(Long resume_id){
		hd.deleteHope(resume_id);
	}
}
