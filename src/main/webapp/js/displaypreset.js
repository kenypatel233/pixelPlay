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
   //container.getContext().save();
   //SessionImage.src=container.toDataURL("image/jpeg");
   cPush();
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

function applyContrast() {
    rangeInput = document.getElementById('rangeContrast').value;
    console.log("inside" + rangeInput);
    container = document.getElementById('myCanvas');
    Caman(container,function()
    {
        this.contrast(rangeInput).render;
    });
    //container.getContext("2d").save();
   //SessionImage.src=container.toDataURL("image/jpeg");
   cPush();
    
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