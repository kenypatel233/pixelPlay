/*=========UPLOADING IMAGE TO CANVAS ELEMENT=============*/
var onload=function(e){
let imgInput = document.getElementById('imageInput');
  imgInput.addEventListener('change', function(e) {
    if(e.target.files) {
      let imageFile = e.target.files[0]; //here we get the image file
      var reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
       let myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object
        myImage.onload = function(ev) {
          var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object
          let myContext = myCanvas.getContext("2d"); // Creates a contect object
          myCanvas.width = myImage.width; // Assigns image's width to canvas
          myCanvas.height = myImage.height; // Assigns image's height to canvas
          myContext.drawImage(myImage,0,0); // Draws the image on canvas
          let imgData = myCanvas.toDataURL("image/jpeg",0.75); // Assigns image base64 string in jpeg format to a variable
        }
      }
    }
  })};
/*============AJAX ADD IMAGE TO DB=================*/


let form = $('uploadForm');
$(document).on('submit', '#uploadForm', function(event){


   $.ajax({
type: form.attr('method'),
url: form.attr('action'),
data: form.serialize(),
success: function (responseText) {
var result=responseText;
$('#uploadResult').text(responseText.msg);
console.log("end");

 
}
 
});
 event.preventDefault();
  
});
/*=========CROP IMAGE======*/
function crop() 
{
  document.getElementById("crop").className.replace("","active");
  var section= document.getElementById("crop_section");
if (section.style.display == 'none') {
  section.style.display = 'block';
} else {
  section.style.display = 'none';
}

// initialize cropper by providing it with a target canvas and a XY ratio (height = width * ratio)
cropper.start(document.getElementById("myCanvas"), 1); 
  
}




