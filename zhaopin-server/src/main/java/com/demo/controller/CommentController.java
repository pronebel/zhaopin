package com.demo.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.model.*;
import com.demo.service.*;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("comment")
public class CommentController {
	@Resource
	private CommentService cs;	
	@Resource
	private InterviewService is;
	@ResponseBody
	@RequestMapping("/getComment")
	public List<Comment> getComment(long job_id,int start,int limit){
		return cs.getComment(job_id,start,limit);
	}
	
	@ResponseBody
	@RequestMapping("/addComment")
	public boolean addComment(String comment){
		JSONObject jsStr = JSONObject.fromObject(comment);
		Comment c=(Comment)JSONObject.toBean(jsStr,Comment.class);
		Long interview_id=c.getInterview_id();
		return cs.newComment(c) && is.comment(interview_id);
		
	}
}
