var SessionImage=new Image();
var cPushArray=new Array();
var cStep = -1;
var ctx=document.getElementById("myCanvas");
function cPush() {
  cStep++;
  if (cStep < cPushArray.length) { cPushArray.length = cStep; }
  cPushArray.push(document.getElementById('myCanvas').toDataURL());
}
function cUndo() {
  console.log("Undo");
  if (cStep > 0) {
    cStep--;
    var canvasPic = new Image();
    canvasPic.src = cPushArray[cStep];
    canvasPic.onload = function () { 
      ctx.drawImage(canvasPic, 0, 0); 
    }
  }
}

function cRedo() {
  if (cStep < cPushArray.length-1) {
      cStep++;
      var canvasPic = new Image();
      canvasPic.src = cPushArray[cStep];
      canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
  }
}

/*=========UPLOADING IMAGE TO CANVAS ELEMENT=============*/
var onload=function(e) {
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
          cPush();
          SessionImage.src=imgData;
        }
      }
    }
  })
};

  
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
  }
  );
  event.preventDefault();
});

/*================AJAX PRESET ADD=============**/
/*================AJAX PRESET ADD=============*/
let form1=$('preset_form');
$(document).on('submit', '#preset_form', function(event){
  $.ajax({
      type: form1.attr('method'),
      url: form1.attr('action'),
      data:form1.serialize(),
      success:function(data)
      {
       alert("Preset Added!");
        location.reload();
      },
      error:function()
      {
        alert("Failed to add preset");
      }
    });
//event.preventDefault();
});

















/*============Save-Revert==========

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
  console.log("revrt");
  SessionImage.src=img_url.pop();
  myImage=new Image();
  myImage.src=SessionImage.src;
  var myCanvas = document.getElementById("myCanvas"); // Creates a canvas object
  let myContext = myCanvas.getContext("2d"); // Creates a contect object
  myContext.save();
 myContext.fillStyle = "#ffffff";  
 myContext.fillRect(0, 0, myCanvas.width, myCanvas.height);
  myCanvas.width = myImage.width; // Assigns image's width to canvas
  myCanvas.height = myImage.height; // Assigns image's height to canvas
  myContext.drawImage(myImage,0,0); // Draws the image on canvas
  let imgData = myCanvas.toDataURL("image/jpeg",0.75);

  
}
*/
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
  cPush();
}

function rotate() {
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
  cPush();
  //SessionImage.src=myc.toDataURL("image/jpeg",0.75);
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

function applyBrightness()
{
  rangeInput = document.getElementById('rangeBrightness').value;
  console.log("inside" + rangeInput);
  container = document.getElementById('myCanvas');
  Caman(container,function(){
    this.brightness(rangeInput).render();
  });
  //container.getContext("2d").save();
  //SessionImage.src=container.toDataURL("image/jpeg");
  cPush();
}

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
          this.copyParent();
          this.filter.contrast(rangeInput);
          this.opacity(10);
        })
        this.render();
    });
    //container.getContext("2d").save();
   //SessionImage.src=container.toDataURL("image/jpeg");
   cPush();
    
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
   //container.getContext("2d").save();
   //SessionImage.src=container.toDataURL("image/jpeg");
   cPush();
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
    console.log("OPACITY");
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
   //container.getContext().save();
   //SessionImage.src=container.toDataURL("image/jpeg");
   cPush();
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
   //container.getContext().save();
   //SessionImage.src=container.toDataURL("image/jpeg");
   cPush();
}

/*======PRESET Modal======*/
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





