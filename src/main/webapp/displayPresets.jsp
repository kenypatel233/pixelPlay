<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page
	import=" java.io.IOException,
 java.io.PrintWriter,
  java.sql.Connection, 
  java.sql.DriverManager,
  java.sql.Statement,
  java.sql.ResultSet, 
  javax.servlet.ServletException, 
  javax.servlet.http.HttpServlet, 
  javax.servlet.http.HttpServletRequest,
  javax.servlet.http.HttpServletResponse;"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Presets</title>
</head>
<body>
	<table>
		<tr>
			<th>Preset_Name</th>
			<th>Brightness </th>
			<th>Contrast </th>
			<th>Saturation </th>
			<th>Opacity </th>
		</tr>


		<%

String connectionURL = "jdbc:mysql://localhost:3306/project_pixelPlay";
String user = "root";
String pass = "keny@9180";
int result = 0;
Connection con = null;
con=DriverManager.getConnection(connectionURL,user,pass);
Statement st = con.createStatement();
ResultSet presets = st.executeQuery("select * from userPresets");
while(presets.next())
{
	int b = presets.getInt("Brightness");
	int c = presets.getInt("Contrast");
	int s = presets.getInt("Saturation");
	int o = presets.getInt("Opacity");
	String n = presets.getString("presetName");
	%>
	<tr>
		<td><%=n %></td>
		<td><%=b %></td>
		<td><%=c %></td>
		<td><%=s %></td>
		<td><%=o %></td>
	</tr>		
<%	
}
%>
	</table>
</body>
</html>