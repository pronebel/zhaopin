package com.demo.service;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.demo.dao.CommentDao;
import com.demo.model.*;

@Service
public class CommentService {

	@Resource
	private CommentDao cd;
	
	public List<Comment> getComment(Long job_id,int start,int limit){
		return cd.getComment(job_id,start,limit);
	}
	
	public boolean newComment(Comment c){
		return cd.newComment(c);
	}
}
