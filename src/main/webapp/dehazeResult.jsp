<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Dehaze Result</title>
</head>
<body>
<%
String src="";
src=(String)(request.getAttribute("url"));
%>
<img src="data:image/jpg;base64,<%=src %>" alt="image" />
<button> Download </button>

</body>
</html>