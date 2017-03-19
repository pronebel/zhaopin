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

@Controller
@RequestMapping("collection")
public class CollectionController {
	@Resource
	private CollectionService cs;	
	@Resource
	private LoginController lc;
	
	@ResponseBody
	@RequestMapping("/getCollections")
	public List<Collection> getCollections(String thirdSessionKey,HttpServletRequest req){
		Collection c=new Collection();
		c.setSeeker_id(lc.getOpenid(thirdSessionKey, req));
		return cs.getCollections(c);
	}
	
	@ResponseBody
	@RequestMapping(value={"/deleteCollection"},method=RequestMethod.POST)
	public boolean deleteCollection(long id,HttpServletRequest req){
		Collection c=new Collection();
		c.setId(id);
		return cs.deleteCollection(c);
	}
	
	@ResponseBody
	@RequestMapping(value={"/addCollection"},method=RequestMethod.POST)
	public boolean addCollection(String thirdSessionKey,Long job_id,HttpServletRequest req){
		Collection c=new Collection();
		c.setJob_id(job_id);
		c.setSeeker_id(lc.getOpenid(thirdSessionKey, req));
		return cs.addCollection(c);
	}
}
