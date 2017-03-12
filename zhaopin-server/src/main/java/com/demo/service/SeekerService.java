package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.SeekerDao;
import com.demo.model.Seeker;

/**
 * Student Service
 * @author Cloud Lau
 * @company SZU
 * @date 2016年3月5日
 * @description
 */
@Service
public class SeekerService {

	@Resource
	private  SeekerDao sd;
	
	public void newSeeker(Seeker sk){
		sd.newSeeker(sk);
	}
	
}
