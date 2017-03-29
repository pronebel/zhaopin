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
	
	@ResponseBody
	@RequestMapping("/getInvication")
	public JobInvication getInvication(Long id){
		return jis.getInvication(id);
	}
	
	@ResponseBody
	@RequestMapping("/setResult")
	public boolean setResult(Long id,boolean result,String set_resule_date_time){
		JobInvication ji=new JobInvication();
		ji.setResult(result);
		ji.setId(id);
		ji.setSet_resule_date_time(set_resule_date_time);
		return jis.setResult(ji);
	}
	
	@ResponseBody
	@RequestMapping("/setSeekerRead")
	public boolean setSeekerRead(Long id){
		return jis.setSeekerRead(id);
	}
}
