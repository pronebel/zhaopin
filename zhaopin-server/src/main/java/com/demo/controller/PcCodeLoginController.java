package com.demo.controller;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.demo.util.*;

import org.json.JSONObject;
import org.json.JSONException;  

@Controller
@RequestMapping("pc")
public class PcCodeLoginController {
	
	@RequestMapping(value = {"" , "/"})
	public String index(){
		System.out.println("访问pc");
		return "onLogin";
	}
	
	@ResponseBody
	@RequestMapping("/getCode")
	public String getCode(HttpServletRequest request,HttpServletResponse response) throws JSONException{		
		//生成唯一ID
		int uuid = (int) (Math.random() * 100000);
		//二维码内容
		JSONObject json=new JSONObject();
		json.put("uid","uid"+uuid);
		json.put("action", "pc");
		System.out.println(json);
		String content = "123";
		//生成二维码
		String imgName =  uuid + "_" + (int) (new Date().getTime() / 1000) + ".png";
		String imgPath = request.getServletContext().getRealPath("/")+"resources/pc/QrCode/" + imgName;
		TwoDimensionCode handler = new TwoDimensionCode();
		handler.encoderQRCode(content, imgPath, "png",null);
		System.out.println(" request.getServerName()"+ request.getServerName());
		System.out.println("httpRequest.getContextPath()"+request.getContextPath());
		System.out.println("httpRequest.getServletPath()"+request.getServletPath());
		//生成的图片访问地址
		String qrCodeImg = request.getContextPath()+"/resources/pc/QrCode/" + imgName;
		String jsonStr = "{\"uuid\":" + uuid + ",\"qrCodeImg\":\"" + qrCodeImg + "\"}";
		JavaMail.sendTxtMail("zwill招聘消息通知","您投递的简历已经被企业查看，快去看看吧!","670390939@qq.com",5);
		return jsonStr;
	}
	
}