var SessionImage=new Image();
var img_url=new Array();
var ctx;

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
          ctx=myCanvas.getContext("2d");
          

          SessionImage.src=imgData;
          img_url.push(imgData);
          
          
          
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
/*================AJAX PRESET ADD=============*/
let form1=$('preset_form');
$(document).on('submit','#preset_form',function(event){
  event.preventDefault();
  


    $.ajax({
      type: form1.attr('method'),
      url: form1.attr('action'),
      data:form1.serialize(),
      success:function(data)
      {
        var result=data;
        alert(result);
      },
      error:function()
      {
        alert("Failed to add preset");
      }
    })

});
/*============Save-Revert==========*/

save=function()
{
  myCanvas=document.getElementById("myCanvas");
  ctx= document.getElementById("myCanvas").getContext("2d");
  ctx.save();
  SessionImage.src=myCanvas.toDataURL("image/jpeg",0.75);
  img_url.push(SessionImage.src);
}
revert=function()
{
  SessionImage.src=img_url.pop();

  cropper.showImage(SessionImage.src);
}

/*=========CROP IMAGE======*/
function crop() 
{
  console.log("called");
  document.getElementById("crop").className.replace("","active");
  var section= document.getElementById("crop_section");
if (section.style.display == 'none') {
  section.style.display = 'block';
} else {
  section.style.display = 'none';
}

// initialize cropper by providing it with a target canvas and a XY ratio (height = width * ratio)
cropper.start(document.getElementById("myCanvas"), 1); 
cropper.showImage(SessionImage.src);

}
function rotate()
{
  
  document.getElementById("rotate").className.replace("","active");
  var section= document.getElementById("rotate_section");
if (section.style.display == 'none') {
  section.style.display = 'block';
} else {
  section.style.display = 'none';
}
}
function applyRotation() {

 angle=(document.getElementById("rotate_label").innerHTML)*0.01745; 
 myc=document.getElementById("myCanvas");
 var surfaceContext= myc.getContext("2d");
 //document.getElementById("myCanvas").getContext("2d");
 ctx=surfaceContext;
 ctx.save();
 
 surfaceContext.save();
 surfaceContext.fillStyle = "#ffffff";  
 surfaceContext.fillRect(0, 0, myc.width, myc.height);  
surfaceContext.translate(SessionImage.width*0.5,SessionImage.height*0.5);
surfaceContext.rotate(angle);
surfaceContext.translate(-SessionImage.width*0.5,-SessionImage.height*0.5);
surfaceContext.drawImage(SessionImage,0,0);
SessionImage.src=myc.toDataURL("image/jpeg",0.75);
//surfaceContext.restore();
}





  
function brightness() {
  console.log("called brightness");
  document.getElementById("rangeBrightness").className.replace("","active");
  var section= document.getElementById("brightness_section");
  if (section.style.display == 'none') {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
}

 //New brightness function
 function applyBrightness()
  {
    rangeInput = document.getElementById('rangeBrightness').value;
    console.log("inside" + rangeInput);
    container = document.getElementById('myCanvas');
    Caman(container,function(){
     this.brightness(rangeInput).render();
   });
 }



// function applyBrightness() {
//   rangeInput = document.getElementById('rangeBrightness');
//   container = document.getElementById('myCanvas');
//   container.style.filter = "brightness(" + rangeInput.value + "%)";
// }

function contrast() {
  console.log("called brightness");
  document.getElementById("rangeContrast").className.replace("","active");
  var section= document.getElementById("contrast_section");
  if (section.style.display == 'none') {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
}

function applyContrast() {
    rangeInput = document.getElementById('rangeContrast').value;
    console.log("inside" + rangeInput);
    container = document.getElementById('myCanvas');
    Caman(container,function() {
      this.newLayer(function() {
        this.setBlendingMode("multiply");
        this.filter.contrast(rangeInput);
        this.copyParent();
      });
      this.render();
   });
}

function saturation() {
  console.log("called saturation");
  document.getElementById("rangeSaturation").className.replace("","active");
  var section= document.getElementById("saturation_section");
  if (section.style.display == 'none') {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
}



function applySaturation() {
    rangeInput = document.getElementById('rangeSaturation').value;
    console.log("inside" + rangeInput);
    container = document.getElementById('myCanvas');
    Caman(container,function(){
     this.saturation(rangeInput).render();
   });
}
/*==Download===*/
function downloadCanvas(){  
  // get canvas data  
  canvas=document.getElementById("myCanvas");
  var image = canvas.toDataURL();  

  // create temporary link  
  var tmpLink = document.createElement( 'a' );  
  tmpLink.download = 'pixelPlay.jpeg'; // set the name of the download file 
  tmpLink.href = image;  

  // temporarily add link to body and initiate the download  
  document.body.appendChild( tmpLink );  
  tmpLink.click();  
  document.body.removeChild( tmpLink );  
}

function opacity() {
  console.log("called opacity");
  document.getElementById("rangeOpacity").className.replace("","active");
  var section= document.getElementById("opacity_section");
  if (section.style.display == 'none') {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
} 

function applyOpacity() {
    console.log("OPACITYYYYYYYYYYYY");
    rangeInput = document.getElementById('rangeOpacity').value;
    console.log("inside" + rangeInput);
    container = document.getElementById('myCanvas');
    Caman(container,function() {
      this.newLayer(function() {
        this.setBlendingMode("multiply");
        this.opacity(rangeInput);
        this.copyParent();
      });
      this.render();
   });
}

function temperature() {
  console.log("called temperature");
  document.getElementById("rangeTemperature").className.replace("","active");
  var section= document.getElementById("temperature_section");
  if (section.style.display == 'none') {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
} 

function applyTemperature() {
    console.log("TEMPERATUREEEEEE");
    rangeInput = document.getElementById('rangeTemperature').value;
    console.log("inside" + rangeInput);
    container = document.getElementById('myCanvas');
    Caman(container,function() {
      this.newLayer(function() {
        if (rangeInput < 0) {
          this.fillColor('#48D1CC');
          this.opacity((rangeInput));
          this.copyParent();
        }
        else {
          this.fillColor('#FFD700');
          this.opacity((rangeInput));
          this.copyParent();
        }
      });
      this.clip(10);
      this.render();
   });
}


// function applyOpacity() {
//   rangeInput = document.getElementById('rangeOpacity');
//   container = document.getElementById('myCanvas');
//   container.style.filter = "opacity(" + rangeInput.value + "%)";
// }



/*======preset Modal======*/
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// ======================== VIGNETTE ========================

// function mySection()
// {
//   console.log("inside callwedscfsr");
//   document.getElementById("vignette").className.replace("","active");
//   var section= document.getElementById("vignette_section");
// if (section.style.display == 'none') {
//   section.style.display = 'block';
// } else {
//   section.style.display = 'none';
// }
// }

// function applyVignette()
// {
//   var container = document.getElementById('myCanvas');
//   container.classList.add('vignette_on');

//   console.log("called2");	
//   let target=document.getElementById("canvasDiv");
  
//   target.classList.add("vignette");
// }

// function myVignette()
// {
//   console.log("inside");
//   console.log("inside callwedscfsr");
//   document.getElementById("vignette").className.replace("","active");
//   var section= document.getElementById("vignette_section");
// if (section.style.display == 'none') {
//   section.style.display = 'block';
// } else {
//   section.style.display = 'none';
// }
// }



