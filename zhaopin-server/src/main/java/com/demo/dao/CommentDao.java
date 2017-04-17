package com.demo.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.demo.model.*;


@Repository
public class CommentDao extends BaseDao<Comment>{

	@Override
	public Class<Comment> getEntityClass() {
		// TODO Auto-generated method stub
		return Comment.class;
	}
	
	public List<Comment> getComment(Long job_id,int start,int limit){
		String sn=getIbatisMapperNamespace() + ".getComment";
		RowBounds rb=new RowBounds(start,limit);
		return getSqlSessionTemplate().selectList(sn, job_id,rb);
	}
	
	public boolean newComment(Comment c){
		String sn=getIbatisMapperNamespace() + ".newComment";
		return getSqlSessionTemplate().insert(sn, c)==1?true:false;
	}
}
