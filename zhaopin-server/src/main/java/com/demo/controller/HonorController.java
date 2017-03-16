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
public class HonorController {
	@Resource
	private HonorService hs;	
	@Resource
	private LoginController lc;
	
	@ResponseBody
	@RequestMapping("/getHonors")
	public List<Honor> getHonors(long resume_id,HttpServletRequest req){
		Honor e=new Honor();
		e.setResume_id(resume_id);
		return hs.getHonors(e);
	}
	
	@ResponseBody
	@RequestMapping("/updateHonor")
	public boolean updateHonor(String honor,HttpServletRequest req){
		JSONObject jsStr = JSONObject.fromObject(honor);
		Honor e=(Honor)JSONObject.toBean(jsStr,Honor.class);
		return hs.updateHonor(e);
	}
	
	@ResponseBody
	@RequestMapping("/deleteHonor")
	public boolean deleteHonor(long id,HttpServletRequest req){
		Honor e=new Honor();
		e.setId(id);
		return hs.deleteHonor(e);
	}
	
	@ResponseBody
	@RequestMapping(value={"/addHonor"},method=RequestMethod.POST)
	public boolean addHonor(String honor,HttpServletRequest req){
		JSONObject jsStr = JSONObject.fromObject(honor);
		Honor e=(Honor)JSONObject.toBean(jsStr,Honor.class);
		return hs.addHonor(e);
	}
}
