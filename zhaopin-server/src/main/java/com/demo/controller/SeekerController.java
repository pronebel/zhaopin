package com.demo.controller;

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

import net.sf.json.JSONObject;

@Controller
@RequestMapping("seeker")
public class SeekerController {
	
	
	@RequestMapping(value = {"" , "/"})
	public String index(){
		return "user";
	}
	
}
