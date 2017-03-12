package com.demo.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.HrDao;
import com.demo.model.Hr;

@Service
public class HrService {

	@Resource
	private  HrDao hd;
	
	public void newHr(Hr sk){
		hd.newHr(sk);
	}
	
}