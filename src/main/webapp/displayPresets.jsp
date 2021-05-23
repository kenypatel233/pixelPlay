<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import=" java.io.IOException"%>
<%@ page import="java.sql.*"%>



<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Presets</title>
<link rel="stylesheet" href="./css/welcome.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>

$(document).ready(function() {
	// crating new click event for save button
	$(".deletep").click(function() {
	var id = +this.id;
	$.ajax({
	url: "delete.jsp",
	type: "post",
	data: {
	id : id,
	},
	success : function(data){
	alert("deleted Successfully"); // alerts the response from jsp
	location.reload();
	}
	});
	});
	});


</script>
<script>

var onload=function(e){
	let imgInput = document.getElementById('imageLoad');
	  imgInput.addEventListener('change', function(e) {
	    if(e.target.files) {
	      let imageFile = e.target.files[0]; //here we get the image file
	      var reader = new FileReader();
	      reader.readAsDataURL(imageFile);
	      reader.onloadend = function (e) {
	       let myImage = new Image(); // Creates image object
	        myImage.src = e.target.result; // Assigns converted image to image object
	        myImage.onload = function(ev) {
	          var myCanvas = document.getElementById("myCanvas1"); // Creates a canvas object
	          let myContext = myCanvas.getContext("2d"); // Creates a contect object
	          myCanvas.width = myImage.width; // Assigns image's width to canvas
	          myCanvas.height = myImage.height; // Assigns image's height to canvas
	          myContext.drawImage(myImage,0,0); // Draws the image on canvas
	          let imgData = myCanvas.toDataURL("image/jpeg",0.75); // Assigns image base64 string in jpeg format to a variable
	        }
	      }
	    }
	  })};
</script>


</head>
<body>
	<table id="preset_display">
		<tr>
		<th>Preset_ID</th>
			<th>Preset_Name</th>
			<th>Brightness</th>
			<th>Contrast</th>
			<th>Saturation</th>
			<th>Opacity</th>
			<th>Action</th>
			
		</tr>


		<%
Class.forName("com.mysql.cj.jdbc.Driver");
String connectionURL = "jdbc:mysql://localhost:3306/project_pixelPlay";
String user = "root";
String pass = "keny@9180";
int result = 0;
Connection con = null;
try
{
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
	int i = presets.getInt(1);
	%>
		<tr>
			<td><%=i %></td>
			<td><%=n %></td>
			<td><%=b %></td>
			<td><%=c %></td>
			<td><%=s %></td>
			<td><%=o %></td>
			<td><button type="button" id="<%=i%>" class="deletep">Delete</button></td>
		</tr>
		
<%
}
}
catch(Exception e)
{
	e.printStackTrace();
}
finally
{
	if(con!=null)
		con.close();
	
}
	%>	


	</table>
	<div>
		<p><label for="imageLoad" style="cursor: pointer;" class="displaypresetjsp">Upload Image</label></p>
		<input type="file" id="imageLoad" name="imageLoad" accept="image/*" onchange="onload"
			style="display: none;">
	</div>
	
	<canvas id="myCanvas1" class="canvas1">
	
	
	</canvas>
	<form method="POST" action="BlurImage" enctype="multipart/form-data">
	<input type="file" id="imageInput" name="imageInput" accept="image/*" />
    <input type="submit" id="submit1" value="Add Image">    
	
	</form>
</body>
</html>