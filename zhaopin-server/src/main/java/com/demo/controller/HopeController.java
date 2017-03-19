package com.demo.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.model.*;
import com.demo.service.*;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("resume")
public class HopeController {
	@Resource
	private HopeService hs;	
	@Resource
	private LoginController lc;
	
	@ResponseBody
	@RequestMapping("/getHope")
	public Hope getHope(long resume_id,HttpServletRequest req){
		Hope h=new Hope();
		h.setResume_id(resume_id);
		return hs.getHope(h);
	}
	
	@ResponseBody
	@RequestMapping("/updateHope")
	public boolean updateHope(String hope,HttpServletRequest req){
		JSONObject jsStr = JSONObject.fromObject(hope);
		Hope h=(Hope)JSONObject.toBean(jsStr,Hope.class);
		return hs.updateHope(h);
	}
	
	@ResponseBody
	@RequestMapping("/addHope")
	public boolean addHope(String hope,HttpServletRequest req){
		JSONObject jsStr = JSONObject.fromObject(hope);
		Hope h=(Hope)JSONObject.toBean(jsStr,Hope.class);
		System.out.println(h.getType());
		return hs.newHope(h);
	}
}
