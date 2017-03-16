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
@RequestMapping("resume")
public class IntershipController {
	@Resource
	private IntershipService is;	
	@Resource
	private LoginController lc;
	
	@ResponseBody
	@RequestMapping("/getInterships")
	public List<Intership> getInterships(long resume_id,HttpServletRequest req){
		Intership i=new Intership();
		i.setResume_id(resume_id);
		return is.getInterships(i);
	}
	
	@ResponseBody
	@RequestMapping("/updateIntership")
	public boolean updateIntership(String intership,HttpServletRequest req){
		JSONObject jsStr = JSONObject.fromObject(intership);
		Intership i=(Intership)JSONObject.toBean(jsStr,Intership.class);
		return is.updateIntership(i);
	}
	
	@ResponseBody
	@RequestMapping("/deleteIntership")
	public boolean deleteIntership(long id,HttpServletRequest req){
		Intership i=new Intership();
		i.setId(id);
		return is.deleteIntership(i);
	}
	
	@ResponseBody
	@RequestMapping(value={"/addIntership"},method=RequestMethod.POST)
	public boolean addIntership(String intership,HttpServletRequest req){
		JSONObject jsStr = JSONObject.fromObject(intership);
		Intership i=(Intership)JSONObject.toBean(jsStr,Intership.class);
		System.out.println(i.getResume_id());
		return is.addIntership(i);
	}
}
