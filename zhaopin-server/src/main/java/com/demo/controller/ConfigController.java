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
@RequestMapping("config")
public class ConfigController {
	@Resource
	private ConfigService cs;	
	@Resource
	private LoginController lc;
	
	@ResponseBody
	@RequestMapping("/getConfig")
	public Config getConfig(String thirdSessionKey,HttpServletRequest req){
		Config c=new Config();
		c.setSeeker_id(lc.getOpenid(thirdSessionKey, req));
		return cs.getConfig(c);
	}
	
	@ResponseBody
	@RequestMapping(value={"/updateConfig"},method=RequestMethod.POST)
	public boolean addConfig(String config,HttpServletRequest req){
		JSONObject jsStr = JSONObject.fromObject(config);
		Config c=(Config)JSONObject.toBean(jsStr,Config.class);
		return cs.updateConfig(c);
	}
}
