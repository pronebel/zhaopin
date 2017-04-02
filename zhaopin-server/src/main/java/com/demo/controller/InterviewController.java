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

import net.sf.json.JSONObject;

@Controller
@RequestMapping("interview")
public class InterviewController {
	@Resource
	private InterviewService is;	
	@Resource
	private LoginController lc;
	
	@ResponseBody
	@RequestMapping("/getUnReadLength")
	public int getUnReadLength(String openid){
		return is.getUnReadLength(openid);
	}
	
	@ResponseBody
	@RequestMapping("/getUnRead")
	public List<Interview> getUnRead(String openid){
		Interview i=new Interview();
		i.setSeeker_id(openid);
		return is.getUnRead(i);
	}
	
	@ResponseBody
	@RequestMapping("/getInterviewById")
	public Interview getDeliverRecodeById(Long id){
		return is.getInterviewById(id);
	}
	
	@ResponseBody
	@RequestMapping("/setRead")
	public boolean setRead(Long id){
		return is.setRead(id);
	}
}
