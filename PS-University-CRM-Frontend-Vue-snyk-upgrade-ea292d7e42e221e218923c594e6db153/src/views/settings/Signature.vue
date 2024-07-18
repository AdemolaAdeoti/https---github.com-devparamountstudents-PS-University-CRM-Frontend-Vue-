<template>
  <div class="px-3 row">
    <div class="offset-md-2 col-md-8">
      <div class="d-flex mb-3 row">
        <div class="col-md-6">
          <h4>Sign Here</h4>
          <div id="parentDiv" class="border" ref="signatureCanvas" width="100%" height="200"></div>
        </div>      
        <div class="col-md-6 mb-3 " >
          <h4 >Output</h4>          
          <div class="border" style="width:100%;height:200px">
            <img ref="signature" src="" alt="" />
          </div>
        </div>
      </div>
      <button
        class="btn btn-sm d-inline-block mx-1 btn-warning"
        @click="clearSignature"
      >
        Clear
      </button>
      <button
        class="btn btn-sm d-inline-block mx-1 btn-warning"
        @click="captureSignature"
      >
        Capture Signature
      </button>
    </div>
    <div class="col-md-2"></div>
    <div class="col-md-12">
      <center>
        <button @click="useSignature" class="btn mx-auto d-inline  btn-warning mt-5">Use Signature</button>
      </center>
    </div>
  </div>
</template>
  
  <script>
import p5 from "p5";
import { useUserStore } from "@/stores/user";
var sketch = null;
export default {
  name: "signatureView",
  data() {
    return {
        store:useUserStore(),
        signUrl:null,
    };
  },
  methods: {
    useSignature(){
      this.$emit('getSign', this.signUrl)
    },
    initializeCanvas() {
      sketch = new p5(this.drawSignature, this.$refs.signatureCanvas);
    },
    drawSignature(p) {
      let drawing = false;
      let lastX = 0;
      let lastY = 0;

      p.setup = () => {
        const parentDiv = document.getElementById('parentDiv'); // Replace 'parentDiv' with the actual ID of the parent div
        p.createCanvas(parentDiv.clientWidth, 200);
        p.frameRate(3);
        p.strokeWeight(2);
        p.noFill();
        p.background(255);
      };

      p.mousePressed = () => {
        drawing = true;
        lastX = p.mouseX;
        lastY = p.mouseY;
      };

      p.mouseReleased = () => {
        drawing = false;
      };
      p.touchMoved = () => {
        p.line(p.mouseX, p.mouseY, lastX, lastY);
        lastX = p.mouseX;
        lastY = p.mouseY;
        return false;
      };
      p.draw = () => {
        if (drawing) {
          p.line(lastX, lastY, p.mouseX, p.mouseY);
          lastX = p.mouseX;
          lastY = p.mouseY;
          return false;
        }
      };
    },
    clearSignature() {
      sketch.clear();
      sketch.background(255);
    },
    getSignatureData() {
      return this.$refs.signatureCanvas.toDataURL();
    },
    captureSignature() {         
        const myImage = new Image();
        myImage.crossOrigin = "Anonymous";
        this.store.isLoading = true;            
        const canvas = this.$refs.signatureCanvas.getElementsByTagName('canvas')[0];
        const context = canvas.getContext("2d");
        myImage.onload = () => {
            // Create an offscreen canvas to capture the image
            
            canvas.width = myImage.width;
            canvas.height = myImage.height;
            
            // Draw the image on the offscreen canvas
            context.drawImage(myImage, 0, 0);
            
            // Remove blanks and get cropped image data
            const croppedImageData = this.removeImageBlanks(canvas);
            console.log("Cropped Image Data:", croppedImageData);
            this.$refs.signature.src = croppedImageData
            this.signUrl =croppedImageData
            this.store.isLoading = false;
        };        
        myImage.src = canvas.toDataURL();
    },    
    removeImageBlanks(imageObject) {
        let imgWidth = imageObject.width;
        let imgHeight = imageObject.height;
        var canvas = document.createElement('canvas');
        canvas.setAttribute("width", imgWidth);
        canvas.setAttribute("height", imgHeight);
        var context = canvas.getContext('2d');
        context.drawImage(imageObject, 0, 0);

       var imageData = context.getImageData(0, 0, imgWidth, imgHeight),
        data = imageData.data,
        getRBG = function(x, y) {
            var offset = imgWidth * y + x;
            return {
                red:     data[offset * 4],
                green:   data[offset * 4 + 1],
                blue:    data[offset * 4 + 2],
                opacity: data[offset * 4 + 3]
            };
        },
        isWhite = function (rgb) {
            // many images contain noise, as the white is not a pure #fff white
            return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
        },
                scanY = function (fromTop) {
        var offset = fromTop ? 1 : -1;

        // loop through each row
        for(var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {

            // loop through each column
            for(var x = 0; x < imgWidth; x++) {
                var rgb = getRBG(x, y);
                if (!isWhite(rgb)) {
                    if (fromTop) {
                        return y;
                    } else {
                        return Math.min(y + 1, imgHeight);
                    }
                }
            }
        }
        return null; // all image is white
    },
    scanX = function (fromLeft) {
        var offset = fromLeft? 1 : -1;

        // loop through each column
        for(var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {

            // loop through each row
            for(var y = 0; y < imgHeight; y++) {
                var rgb = getRBG(x, y);
                if (!isWhite(rgb)) {
                    if (fromLeft) {
                        return x;
                    } else {
                        return Math.min(x + 1, imgWidth);
                    }
                }      
            }
        }
        return null; // all image is white
    };

    var cropTop = scanY(true),
        cropBottom = scanY(false),
        cropLeft = scanX(true),
        cropRight = scanX(false),
        cropWidth = cropRight - cropLeft,
        cropHeight = cropBottom - cropTop;

    canvas.setAttribute("width", cropWidth);
    canvas.setAttribute("height", cropHeight);
    // finally crop the guy
    canvas.getContext("2d").drawImage(imageObject,
        cropLeft, cropTop, cropWidth, cropHeight,
        0, 0, cropWidth * 0.50, cropHeight * 0.50);

    return canvas.toDataURL();
} 
  },
  mounted() {
    this.initializeCanvas();
  },
};
</script>
  