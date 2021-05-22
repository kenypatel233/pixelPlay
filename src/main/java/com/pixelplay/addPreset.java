package com.pixelplay;

import java.io.IOException;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/addPreset")
public class addPreset extends HttpServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void doPost(HttpServletRequest req, HttpServletResponse res)  throws ServletException, IOException 
	{
		String connectionURL = "jdbc:mysql://localhost:3306/project_pixelPlay";
		String user = "root";
		String pass = "keny@9180";
		int result = 0;
	    int brightness = Integer.parseInt(req.getParameter("rangeBrightnesss"));
	    int contrast = Integer.parseInt(req.getParameter("rangeContrastt"));
	    int saturation = Integer.parseInt(req.getParameter("rangeSaturationn"));
	  
	    int opacity = Integer.parseInt(req.getParameter("rangeOpacityy"));
	    String preset_name = req.getParameter("presetName");
	    Connection con = null;
	    
	    try
	    {
	    	Class.forName("com.mysql.cj.jdbc.Driver");					
		     con = (Connection) DriverManager.getConnection(connectionURL, user, pass);
		     PreparedStatement ps = (PreparedStatement) con.prepareStatement("insert into userPresets(Brightness,Contrast,Saturation,Opacity,presetName) values(?,?,?,?,?)");
		     ps.setInt(1, brightness);
		     ps.setInt(2, contrast);
		     ps.setInt(3, saturation);
		     ps.setInt(4, opacity);
		     ps.setString(5, preset_name);
		     result=ps.executeUpdate();
	    	
	    }catch(Exception e)
	    {
	    	e.printStackTrace();
	    	
	    }
	    finally
	    {
	    	if(con != null){
				try{
					con.close();
				}
				catch(Exception e){
					e.printStackTrace();
				}
			}
	    	
	    }
	    String msg;
		if(result > 0){
	    	msg="Preset Added";
	    }
		else{
			msg =" Some Error Occurred";
		}
		JSONObject obj = new JSONObject();

	    try {

	          obj.put("msg", msg);

	          

	         } catch (JSONException e) {     

	          // TODO Auto-generated catch block

	          e.printStackTrace();

	         }

	    res.setContentType("application/json");

	    res.setCharacterEncoding("utf-8");

	    res.getWriter().write(obj.toString());

	    
		 
		 
		
	    
	    
	    
	
		
		
		
	}

}
