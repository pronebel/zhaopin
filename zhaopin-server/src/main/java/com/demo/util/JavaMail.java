package com.demo.util;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class JavaMail {
	public static void sendTxtMail(String title, String msg, String address, int time) {
		time--;
		Properties props = new Properties();

		Session session = Session.getInstance(props, null);
		session.setDebug(true);// 打开debug模式，会打印发送细节到console
		Message message = new MimeMessage(session); // 实例化一个MimeMessage集成自abstract
													// Message 。参数为session
		try {
			message.setFrom(new InternetAddress("xxx@163.com")); // 设置发出方

			message.setText(msg); // 设置文本内容
									// 单一文本使用setText,Multipart复杂对象使用setContent

			message.setSubject(title); // 设置标题

			message.setRecipient(Message.RecipientType.TO, new InternetAddress(address)); // 设置接收方

			// 使用静态方法每次发送需要建立一个到smtp服务器的链接，你可以手动控制连接状态
			// ，通过session获得tansport，连接到mailserver，而session就可以使用Session.getDefaultInstance(props,null);获得
			Transport transport = session.getTransport("smtp");
			transport.connect("smtp.163.com", "xxx@163.com", "xxx");
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
		} catch (AddressException e) {
			System.out.println("AddressException");

		} catch (MessagingException e) {
			System.out.println("MessagingException");
			try {
				if (time > 0) {
					Thread.sleep(1000);
					sendTxtMail(title,msg,address,time);
				}
			} catch (InterruptedException e1) {
				e1.printStackTrace();
			}
		}

	}  
}
