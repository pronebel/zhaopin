package com.demo.controller;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.Map;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.RandomStringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.model.*;
import com.demo.util.HttpRequest;
import com.demo.controller.LoginController;
import com.demo.service.SeekerService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("seeker")
public class SeekerController {
	
	@Resource
	private LoginController lc;
	@Resource
	private SeekerService ss;
	
	@RequestMapping(value = {"" , "/"})
	public String index(){
		return "user";
	}
	
	@ResponseBody
	@RequestMapping("/getUserInfo")
	public Seeker getUserInfo(String thirdSessionKey,HttpServletRequest req){
		Seeker sk= new Seeker();
		sk.setOpenid(lc.getOpenid(thirdSessionKey, req));
		return ss.getUserInfo(sk);
	}
	
	@ResponseBody
	@RequestMapping(value={"/updateSeeker"},method=RequestMethod.POST)
	public boolean updateSeeker(String userInfo,String thirdSessionKey,HttpServletRequest req){
		JSONObject jsStr = JSONObject.fromObject(userInfo);
		Seeker s=(Seeker)JSONObject.toBean(jsStr,Seeker.class);
		System.out.println("updateSeeker"+req.getSession().getId());
		System.out.println(s.getSex());
		s.setOpenid(lc.getOpenid(thirdSessionKey, req));
		return ss.updateSeeker(s);
	}
}
