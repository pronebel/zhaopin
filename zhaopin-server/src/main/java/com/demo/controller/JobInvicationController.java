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
@RequestMapping("jobInvication")
public class JobInvicationController {
	@Resource
	private JobInvicationService jis;	
	@Resource
	private LoginController lc;
	
	@ResponseBody
	@RequestMapping("/getUnReadLength")
	public int getUnReadLength(String openid){
		return jis.getUnReadLength(openid);
	}
	
	@ResponseBody
	@RequestMapping("/getUnRead")
	public List<JobInvication> getUnRead(String openid){
		JobInvication ji=new JobInvication();
		ji.setSeeker_id(openid);
		return jis.getUnRead(ji);
	}
	
}
