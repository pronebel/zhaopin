package com.demo.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.JobDao;
import com.demo.model.*;

import net.sf.json.JSON;

@Service
public class JobService {

	@Resource
	private JobDao jd;
	
	public List<Job> getIndexSearch(String key,int startIndex,int limitCount){
		return jd.getIndexSearch(key,startIndex,limitCount);
	}

	public List<String> getSearchRecommand(JSON json) {
		return jd.getSearchRecommand(json);
	}
	
	public List<Job> searchJob(JSON json,int startIndex,int limitCount){
		return jd.searchJob(json, startIndex, limitCount);
	}
	
	public Job getJobDetailById(Long id){
		return jd.getJobDetailById(id);
	}
}
