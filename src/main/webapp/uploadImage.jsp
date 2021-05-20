<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
   
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://kit.fontawesome.com/64d58efce2.js" ></script>
    <link rel="stylesheet" href="./css/welcome.css" />
    <link rel="stylesheet" href="https://bootswatch.com/3/flatly/bootstrap.min.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/camanjs/4.1.2/caman.full.min.js"></script>
    <script src="./js/welcome.js"></script>
    <title>Welcome</title>
</head>

<body>
<h3>File Upload:</h3>
      Select a file to upload: <br />     
     
      <form action = "insertImage" method = "post"
         enctype = "multipart/form-data">
         
         <p><input type="file" accept="image/*" name="image" id="file" onchange="loadFile(event)" style="display: none;"></p>
          <p><label for="file" style="cursor: pointer;">Upload Image</label></p>
         <input type = "submit" value = "Upload File" />
         </form>
          <div>

        <p><img id="output" width="200" /></p>
    </div>

         
         
         
         
         
         
         
         
      
       
</body>
</html>