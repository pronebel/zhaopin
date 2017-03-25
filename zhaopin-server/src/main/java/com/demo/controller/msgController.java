package com.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.model.*;
import com.demo.service.*;

import org.json.JSONObject;
import org.json.JSONException;  


@Controller
@RequestMapping("msg")
public class msgController {
	@Resource
	private ResumeDeliverStatusService rdss;
	@Resource
	private JobInvicationService jis;
	@Resource
	private LoginController lc;
	
	@ResponseBody
	@RequestMapping("/getUnReadLength")
	public Map<String,Integer> getUnReadLength(String openid) throws JSONException{
		int resumeStatusLength=rdss.getUnReadLength(openid);
		int jobInvicationLength=jis.getUnReadLength(openid);
		Map<String,Integer> map=new HashMap<String,Integer>();
		map.put("resumeStatusLength", resumeStatusLength);
		map.put("jobInvicationLength", jobInvicationLength);
	//	JSONObject json=new JSONObject();
	//	json.put("resumeStatusLength", resumeStatusLength);
	//	json.put("jobInvicationLength", jobInvicationLength);
	//	return json;
		return map;
	}
	
}
