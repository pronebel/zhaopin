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
@RequestMapping("resumeStatus")
public class ResumeDeliverStatusController {
	@Resource
	private ResumeDeliverStatusService rdss;	
	@Resource
	private LoginController lc;
	
	@ResponseBody
	@RequestMapping("/getUnReadLength")
	public int getUnReadLength(String openid){
		return rdss.getUnReadLength(openid);
	}
	
	@ResponseBody
	@RequestMapping("/getUnRead")
	public List<ResumeDeliverStatus> getUnRead(String openid){
		ResumeDeliverStatus rds=new ResumeDeliverStatus();
		rds.setSeeker_id(openid);
		return rdss.getUnRead(rds);
	}
	
	@ResponseBody
	@RequestMapping("/getDeliverRecodeById")
	public ResumeDeliverStatus getDeliverRecodeById(Long id){
		return rdss.getDeliverRecodeById(id);
	}
	
	@ResponseBody
	@RequestMapping("/setRead")
	public boolean setRead(Long id){
		return rdss.setRead(id);
	}
	
	@ResponseBody
	@RequestMapping("/deliver")
	public boolean deliver(String deliver){
		JSONObject jsStr = JSONObject.fromObject(deliver);
		ResumeDeliverStatus rds=(ResumeDeliverStatus)JSONObject.toBean(jsStr,ResumeDeliverStatus.class);
		return rdss.deliver(rds);
	}
	
	@ResponseBody
	@RequestMapping("/hadDelivered")
	public boolean hadDelivered(Long job_id,String openid){
		ResumeDeliverStatus rds=new ResumeDeliverStatus();
		rds.setSeeker_id(openid);
		rds.setJob_id(job_id);
		return rdss.hadDelivered(rds);
	}
	
}
