package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.IntershipDao;
import com.demo.model.*;

@Service
public class IntershipService {

	@Resource
	private IntershipDao id;
	
	public List<Intership> getInterships(Intership i){
		return id.getInterships(i);
	}
	
	public boolean updateIntership(Intership i){
		return id.updateIntership(i);
	}
	
	public boolean deleteIntership(Intership i){
		return id.deleteIntership(i);
	}
	
	public boolean addIntership(Intership i){
		return id.addIntership(i);
	}
}
