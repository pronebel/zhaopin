package com.demo.util;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.web.bind.annotation.RequestMapping;

@ServerEndpoint(value = "/ws")
public class WebSocket {
	//与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    
    private static Map<String,Session> sessions=new HashMap<String,Session>();
    private static Map<Session,String> keys=new HashMap<Session,String>();

	@OnOpen
    public void onOpen(Session session) throws IOException{
    //    String id=java.net.URLDecoder.decode(session.getQueryString(),"utf-8");
		String key=session.getRequestParameterMap().get("openid").get(0);
        WebSocket.sessions.put(key, session); //openid为key session为value
        WebSocket.keys.put(session, key);
        System.out.println("有新连接加入！:"+key);
        sendMessage(session,"哦哦");
    }
     
    @OnClose
    public void onClose(Session session){
    	String key=WebSocket.keys.get(session);
    	WebSocket.sessions.remove(key);
    	WebSocket.keys.remove(session);
        System.out.println("有一连接关闭 sessionId:"+key);
    }
  
    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        System.out.println("来自客户端的消息:" + message);
    }

    @OnError
    public void onError(Session session, Throwable error){
        System.out.println("发生错误");
        error.printStackTrace();
    }
     

    public void sendMessage(Session session, String message) throws IOException{
        session.getBasicRemote().sendText(message);
        //this.session.getAsyncRemote().sendText(message);
    }
}
