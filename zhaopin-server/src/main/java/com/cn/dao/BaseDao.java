package com.cn.dao;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;

/**
 * DAO基类
 * @author Cloud Lau
 * @company SZU
 * @date 2016年3月5日
 * @description
 */
public abstract class BaseDao<M> {
	
	@Resource
	private SqlSessionFactory sqlSessionFactory;
	
	
	@Resource
	private SqlSessionTemplate sqlSessionTemplate;
	
	public SqlSessionFactory getSqlSessionFactory() {
		return this.sqlSessionFactory;
	}

	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		this.sqlSessionFactory = sqlSessionFactory;
		this.sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory);
	}
	
	public abstract Class<M> getEntityClass();
	
	public String getIbatisMapperNamespace() {
		return getEntityClass().getName();
	}
	
	public SqlSessionTemplate getSqlSessionTemplate() {
		return this.sqlSessionTemplate;
	}
}
