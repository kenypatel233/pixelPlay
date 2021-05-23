<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="java.sql.*,java.util.*"%>
<%
String id=request.getParameter("id");
try
{
Class.forName("com.mysql.cj.jdbc.Driver");
Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/project_pixelPlay", "root", "keny@9180");
Statement st=conn.createStatement();
int i=st.executeUpdate("DELETE FROM userPresets WHERE PresetId="+id);
out.println("Data Deleted Successfully!");
}
catch(Exception e)
{

e.printStackTrace();
}
%>