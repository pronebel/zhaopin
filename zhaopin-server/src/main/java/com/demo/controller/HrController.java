package com.demo.controller;

import java.util.Date;
import java.util.List;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.model.Hr;
import com.demo.service.HrService;

import net.sf.json.JSONObject;


@Controller
@RequestMapping("hr")
public class HrController {
	
	@Resource
	private LoginController lc;
	@Resource
	private HrService hs;
	
	
	@RequestMapping(value = {"" , "/"})
	public String index(){
		return "user";
	}
	
	@ResponseBody
	@RequestMapping("/getUserInfo")
	public Hr getUserInfo(String thirdSessionKey,HttpServletRequest req){
		Hr sk= new Hr();
		sk.setOpenid(lc.getOpenid(thirdSessionKey, req));
		return hs.getUserInfo(sk);
	}
	
	@ResponseBody
	@RequestMapping(value={"/updateHr"},method=RequestMethod.POST)
	public boolean updateHr(String userInfo,String thirdSessionKey,HttpServletRequest req){
		JSONObject jsStr = JSONObject.fromObject(userInfo);
		Hr s=(Hr)JSONObject.toBean(jsStr,Hr.class);
		System.out.println("updateHr"+req.getSession().getId());
		System.out.println(s.getSex());
		s.setOpenid(lc.getOpenid(thirdSessionKey, req));
		return hs.updateHr(s);
	}
	
}
