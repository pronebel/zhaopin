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
	public List<Job> getIndexSearch(String key){
		return js.getIndexSearch(key);
	}
	
	@ResponseBody
	@RequestMapping("/getSearchRecommand")
	public List<Job> getSearchRecommand(String job){
		JSON jsStr = JSONObject.fromObject(job);
		return js.getSearchRecommand(jsStr);
	}
	
}
