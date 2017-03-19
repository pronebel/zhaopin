package com.demo.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.model.*;
import com.demo.service.*;
import com.demo.util.HttpRequest;

import org.apache.commons.lang.RandomStringUtils;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("common")
public class LoginController {
	@Resource
	private SeekerService ss;
	@Resource
	private HrService hs;
	
	@RequestMapping(value = {"" , "/"})
	public String index(){
		return "user";
	}
	
	
	/**
	 * 用户登录同意接口  登录后 
	 * @param code 客户端获取的code
	 * @param identity  登录者身份    0代表seeker  1代表hr
	 * @return 返回session对象 包含3rdSessionKey sessionId 已经设置session的过期时间比微信服务器的要长，所以不考虑session过期的问题
	 */
	@ResponseBody
	@RequestMapping("/onLogin")
	public Session onLogin(String code,int identity,HttpServletRequest req){
		StringBuffer sb = new StringBuffer();
		sb.append("appid=").append("wx399489ffda5376de");
		sb.append("&secret=").append("e2519ec7d94ba9913da5a79d49b48025");
		sb.append("&js_code=").append(code);
		sb.append("&grant_type=").append("authorization_code");
		String res = HttpRequest.sendGet("https://api.weixin.qq.com/sns/jscode2session", sb.toString());
		if(res == null || res.equals("")){
			return null;
		}
		JSONObject jsonobject = JSONObject.fromObject(res);
		Session s=(Session)JSONObject.toBean(jsonobject, Session.class);
		s.setSessionId(req.getSession().getId());
		s.setThirdSessionKey(RandomStringUtils.randomAlphanumeric(128));
		System.out.println(s.getThirdSessionKey());
		req.getSession().setAttribute(s.getThirdSessionKey(),jsonobject.get("openid").toString());
		//检测用户是否已经存储到数据库中
		if(identity==0){
			//seeker
			Seeker sk=new Seeker();
			sk.setOpenid(jsonobject.get("openid").toString());
			ss.newSeeker(sk);
		}else if(identity==1){
			//hr
			Hr sk=new Hr();
			sk.setOpenid(jsonobject.get("openid").toString());
			hs.newHr(sk);
		}
		return s;
	}
	
	/**
	 * 通过thirdSessionKey 换取 openid
	 * @param req
	 * @param thirdSessionKey
	 * @return openid
	 */
	public String getOpenid(String thirdSessionKey,HttpServletRequest req){
		return req.getSession().getAttribute(thirdSessionKey).toString();		
	}
	
}
