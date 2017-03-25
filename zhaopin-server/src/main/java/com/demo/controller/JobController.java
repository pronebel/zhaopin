package com.demo.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.model.*;
import com.demo.service.*;

import net.sf.json.JSON;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("job")
public class JobController {
	@Resource
	private JobService js;	
	@Resource
	private LoginController lc;
	
	@ResponseBody
	@RequestMapping("/getIndexSearch")
	public List<Job> getIndexSearch(String key,int startIndex,int limitCount){
		return js.getIndexSearch(key,startIndex,limitCount);
	}
	
	@ResponseBody
	@RequestMapping("/getSearchRecommand")
	public List<String> getSearchRecommand(String job){
		JSON jsStr = JSONObject.fromObject(job);
		System.out.println(jsStr);
		return js.getSearchRecommand(jsStr);
	}
	
	@ResponseBody
	@RequestMapping("/searchJob")
	public List<Job> searchJob(String searchConfig,int startIndex,int limitCount){
		JSON json = JSONObject.fromObject(searchConfig);
		System.out.println(json);
		return js.searchJob(json, startIndex, limitCount);
	}
	
	@ResponseBody
	@RequestMapping("/getJobDetail")
	public Job getJobDetail(Long id){
		return js.getJobDetailById(id);
	}
}
