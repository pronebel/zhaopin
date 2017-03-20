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
	
	public List<Job> getIndexSearch(String key){
		return jd.getIndexSearch(key);
	}

	public List<Job> getSearchRecommand(JSON json) {
		return jd.getSearchRecommand(json);
	}
}
