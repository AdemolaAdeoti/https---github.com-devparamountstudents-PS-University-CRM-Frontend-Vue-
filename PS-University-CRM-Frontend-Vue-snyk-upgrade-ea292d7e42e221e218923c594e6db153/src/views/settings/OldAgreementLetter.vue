<template>
  <div v-if="userInfo.university.agreement_letter" class="pdf-container" style="overflow: auto;width:100%;height:100vh;">
    <div class="container d-flex" v-if="userInfo.university.agreement_letter.url == null">
      <input @change="handleFileUpload" type="file" ref="myFileInput" style="display: none" />
      <input type="button" @click="$refs['myFileInput'].click()" value="Choose file" />
      <button @click="showModal = true" type="button" class="ms-2" tite="Digital Signature">
        <span v-html="$globals.icons.pen" style="fill:#000"></span>
      </button>
      <button @click="showTextFrame = true" type="button" class="ms-2 " title="Add Text">
        <span style="fill:#000;font-weight:bold;font-size:1em" >T</span>
      </button>   
      
      <input v-if="this.canvasIndex > -1" type="button" @click="undo" class="ms-2" value="Undo" />
      <input type="button" @click="submitSignedPdf" class="ms-2" value="Submit Document" />
    </div>
    <div v-else>
      <a :href="userInfo.university.agreement_letter.url" download  class="ms-2 btn btn-secondary " >
        Download
      </a>  
    </div>
    <div class="pdf-viewer position-relative">
      <div v-show="activateSign" ref="draggableresizableimage" class="ui-widget-content" style="position:absolute;top:0px; width: 150px; height: 150px; padding: 0.5em">
        <img ref="signature" id="signature" src="" alt="" style="width: 100%; height: 100%" />
        <div class="l ui-resizable-handle ui-resizable-w resizable-wrapper" id="w"></div>
        <div class="r ui-resizable-handle ui-resizable-e resizable-wrapper" id="e"></div>
        <div class="tl ui-resizable-handle ui-resizable-nw" id="nw"></div>
        <div class="tr ui-resizable-handle ui-resizable-ne" id="ne"></div>
        <div class="bl ui-resizable-handle ui-resizable-sw" id="sw"></div>
        <div class="br ui-resizable-handle ui-resizable-se" id="se"></div>
        <button @click="attachSignature" class="position-absolute btn bg-white" style="color:rgb(255, 0, 106); border:1px solid rgb(255, 0, 106); left:0px;white-space:nowrap; bottom:-35px">Insert Here</button>
      </div>

      <div v-show="showTextFrame" ref="draggableresizableimage2" class="ui-widget-content" style="position:absolute;top:0px; width: 150px; height: 150px; padding: 0.5em">
        <div style="width:160%;display:flex">
          <textarea rows="1" cols="40" v-model="text.value" :style="'font-size:'+text.fontSize+'px'" style="border:1px solid rgb(255, 0, 106);background:transparent" ></textarea>
          <select v-model="text.fontSize" style="width:50px" class="form-control">
            <option value="10">10</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="20">20</option>
            <option value="24">24</option>
          </select>
        </div>

        <div class="l ui-resizable-handle ui-resizable-w resizable-wrapper" id="w2"></div>
        <div class="r ui-resizable-handle ui-resizable-e resizable-wrapper" id="e2"></div>
        <div class="tl ui-resizable-handle ui-resizable-nw" id="nw2"></div>
        <div class="tr ui-resizable-handle ui-resizable-ne" id="ne2"></div>
        <div class="bl ui-resizable-handle ui-resizable-sw" id="sw2"></div>
        <div class="br ui-resizable-handle ui-resizable-se" id="se2"></div>
        <button @click="attachText" class="position-absolute btn bg-white" style="color:rgb(255, 0, 106); border:1px solid rgb(255, 0, 106); left:20px;white-space:nowrap;bottom: 52px;">Insert Here</button>
      </div>
      <div style="width:700px"  v-for="(page, pageIndex) in pdfPages" :key="pageIndex" class="page-thumbnail mx-auto" @mousemove="handleCanvasClick(pageIndex, $event)">
        <canvas :ref="'pageCanvas_' + pageIndex" style="width:100%;" height="200"></canvas>
      </div>
    </div>
    <!-- <button @click="submitSignedPdf">Submit</button> -->
    <div v-if="showModal">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-custom">
        <div class="modal-header">
          <button class="modal-close" @click="closeModal">X</button>
        </div>
        <div class="modal-body">
          <Signature @getSign="importSign($event)"></Signature>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    No Letter Found
  </div>
</template>
  
<script>
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import Signature from "@/views/settings/Signature.vue";
import jquery from "jquery";
import "jquery-ui-dist/jquery-ui";
import { showModal } from "@/plugins/modal";
import { postFormData, post } from '@/api/client';
const $ = jquery;
let pdfDocument = null;
export default {
  components: {
    Signature,
  },
  data() {
    return {
      pdfData: null,
      pdfUrl:null,
      pdfPages: [], // Array to store loaded PDF pages
      signaturePosition: null,
      selectedPage: '',
      showModal: false,
      activateSign:false,
      showTextFrame:false,
      text: {
        value: "Your text here",
        fontSize: 14, 
        x:0,
        y:0,
        w:0,
        h:0
      },
      sign: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        file: null,
      },
      pdfScale: 3,
      userInfo:JSON.parse(localStorage.getItem('userInfo')||'{}'),
      canvasHistory: [], // Array to store canvas states
      canvasIndex: -1, // Current index in canvas history
    };
  },

  methods: {
    async handleCanvasClick(pageIndex) {
      this.selectedPage = pageIndex;      
      },
  
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.$refs.signature.src = URL.createObjectURL(file);
        this.sign.file = URL.createObjectURL(file);
        this.activateSign = true
        this.sign.w = 100;
        this.sign.h = 100;
      }
    },
    importSign(data) {
      this.$refs["signature"].src = data;
      this.sign.w = 100;
      this.sign.h = 100;
      this.sign.file = data;
      this.showModal = false;
      this.activateSign = true
    },
    closeModal() {
      this.showModal = false;
      this.doc = "";
    },
    async loadPdf() {
      this.pdfUrl = this.userInfo.university.agreement_letter.url!=null?this.userInfo.university.agreement_letter.url:this.userInfo.university.agreement_letter.template;      
      this.pdfUrl = this.pdfUrl||'';      
      try{ pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      const loadingTask = pdfjsLib.getDocument({
        url:this.pdfUrl,
      });

      pdfDocument = await loadingTask.promise;

      this.pdfPages = Array.from(
        { length: pdfDocument.numPages },
        (_, pageIndex) => pdfDocument.getPage(pageIndex + 1)
      );
    }catch(e){
      console.log(e)
    }
    },
    async attachText() {
      const canvas = this.$refs['pageCanvas_' + this.selectedPage][0];
      const ctx = canvas.getContext("2d");      

      const canvasState = canvas.toDataURL();
      this.canvasHistory.push(canvasState);
      this.canvasIndex = this.canvasHistory.length - 1;
      const text = this.text.value; // Get the text value from your data
      const fontSize = this.text.fontSize; // Get the font size from your data
      const font = `${fontSize*2.8 }px Arial`; // Use your desired font

      const mx = this.pdfScale - 0.5;
      const scaledX = this.text.x *mx+45;
      const scaledY = this.text.y * mx+45;

      ctx.font = font;
      ctx.fillStyle = "black"; // Set the text color

      // Draw the text on the canvas
      ctx.fillText(text, scaledX, scaledY);

      this.showTextFrame = false; // Hide the text frame
    },
    async attachSignature(){
      const canvas = this.$refs['pageCanvas_' + this.selectedPage][0]; 
      const canvasState = canvas.toDataURL();
      this.canvasHistory.push(canvasState);
      this.canvasIndex = this.canvasHistory.length - 1;     
      var ctx=canvas.getContext("2d");
      const tempImg = new Image();
  
      tempImg.src = this.sign.file;         
      await new Promise(resolve => tempImg.onload = resolve);

      const signatureWidth = tempImg.width; // Actual width in pixels
      const signatureHeight = tempImg.height; // Actual height in pixel
      const mx = this.pdfScale-0.5
      const scaledX = this.sign.x * mx;
      const scaledY = this.sign.y * (this.pdfScale -0.2);
      const scaledW = this.sign.w * mx;
      const scaledH = this.sign.h * mx;      
      const ky = 0
      const kx = 0//175
      ctx.drawImage(this.$refs.signature,0,0,signatureWidth,signatureHeight,scaledX-kx, scaledY+ky,scaledW,scaledH);                
      this.activateSign = false
    },
    undo() {
      if (this.canvasIndex > -1) {
        const prevState = this.canvasHistory[this.canvasIndex];
        this.canvasIndex -= 1;
        const canvas = this.$refs['pageCanvas_' + this.selectedPage][0];
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };

        img.src = prevState;
      }
    },
    async submitSignedPdf() {
      if (!this.sign.file) {
        showModal({ text: "Please select a signature." });
        return;
      }

      //await this.attachSignature()

      const pdfWidth = 595; // A4 width in points
      const pdfHeight = 842; // A4 height in points

      const newPdfDoc = await PDFDocument.create();

      for (let pageIndex = 0; pageIndex < this.pdfPages.length; pageIndex++) {
        const canvas = this.$refs['pageCanvas_' + pageIndex][0];
       // const canvasRect = canvas.getBoundingClientRect();
        const imageData = canvas.toDataURL("image/png");
        const image = await newPdfDoc.embedPng(imageData);
        const newPage = newPdfDoc.addPage([pdfWidth, pdfHeight]);
        newPage.drawImage(image, {
          x: 0,
          y: 0,
          width: pdfWidth,
          height: pdfHeight,
        });      
      }

      // Iterate through each page and add to the PDF
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

      // Save the new PDF bytes
      const newPdfBytes = await newPdfDoc.save();

      // Convert the PDF bytes to a Blob
      const pdfBlob = new Blob([newPdfBytes], { type: "application/pdf" });           
      const formData = new FormData();
      formData.append("file", pdfBlob);
      formData.append("folder_name", "AgreementLetters");
      let res = await postFormData('file_upload',formData, true) 
      const userInfo =  this.userInfo
      const url = res.responseBody
      this.userInfo.university.agreement_letter.url = url
      let res2 = await post('sign_agreement',{id:userInfo.university.id,platform:'university', url:url}, true)        
      if(res2?.message){
        console.log(this.userInfo.university)
        localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        showModal({text:"Signature added to PDF and PDF saved."});
      }      
    },
  },

  async created() {
    if(this.userInfo.university.agreement_letter){
      try{

        
        await this.loadPdf();
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
        Array.from({ length: pdfDocument.numPages }, (_, pageIndex) =>
          pdfDocument.getPage(pageIndex + 1).then(async (page) => {
            const canvas = this.$refs["pageCanvas_" + pageIndex][0];
            const context = canvas.getContext("2d");        
            const viewport = page.getViewport({ scale: this.pdfScale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({
              canvasContext: context,
              viewport,
              enableWebGL: false,
            });
          })
        );
      }catch(e){
        this.userInfo.university.agreement_letter = null
        showModal({text:'Agreement let yet to be sent'})
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      $(this.$refs.draggableresizableimage).resizable({
        handles: {
          nw: ".tl",
          ne: ".tr",
          sw: ".bl",
          se: ".br",
          e: ".r",
          w: ".l",
        },
        minHeight: 70,
        minWidth: 100,
        autoHide: true,
        stop: (event, ui) => {
          // This function is called when dragging stops
          this.sign.w = ui.size.width;
          this.sign.h = ui.size.height;
        },
      });
      $(this.$refs.draggableresizableimage2).resizable({
        handles: {
          nw: ".tl",
          ne: ".tr",
          sw: ".bl",
          se: ".br",
          e: ".r",
          w: ".l",
        },
        minHeight: 70,
        minWidth: 100,
        autoHide: true,
        stop: (event, ui) => {
          // This function is called when dragging stops
          this.text.fontSize = ui.size.height;          
        },
      });
      
      
      $(this.$refs.draggableresizableimage).draggable({
        stop: (event, ui) => {    
          const canvas = this.$refs['pageCanvas_' + this.selectedPage][0];
          const canvasOffset = $(canvas).position();
          const canvasLeft = canvasOffset.left;
          const canvasTop = canvasOffset.top;   
          this.sign.x = ui.position.left - canvasLeft;
          this.sign.y = ui.position.top - canvasTop;
        },
      });

      $(this.$refs.draggableresizableimage2).draggable({
        stop: (event, ui) => {
          const canvas = this.$refs['pageCanvas_' + this.selectedPage][0];
          const canvasOffset = $(canvas).position();
          //console.log($(canvas).position(), $(canvas).offset(),ui.position);
          const canvasLeft = canvasOffset.left;
          const canvasTop = canvasOffset.top;   
          this.text.x = ui.position.left - canvasLeft;
          this.text.y = ui.position.top - canvasTop;
        },
      });
      });
  },
};
</script> 
  
<style scoped>
.pdf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.pdf-viewer {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
}

.page-thumbnail {
  margin: 10px;
}

container {
  padding: 1em;
  border: 1px solid lightgrey;
  margin: 1em;
  border-radius: 4px;
}

input[type="button"], button {
  background-color: lightgray;
  border: 0;
  border-radius: 4px;
  padding: 0.5em 2em;
}

#myFileInput {
  display: none;
}

.label {
  display: block;
  margin-top: 0.5em;
}

.l {
  left: -4px;
  top: calc(50% - 10px);
  cursor: w-resize;
}

.r {
  right: -4px;
  top: calc(50% - 10px);
  cursor: e-resize;
}

.tl {
  left: -6px;
  top: -6px;
  cursor: nw-resize;
}

.tr {
  right: -6px;
  top: -6px;
  cursor: ne-resize;
}

.bl {
  left: -6px;
  bottom: -6px;
  cursor: sw-resize;
}

.br {
  right: -6px;
  bottom: -6px;
  cursor: se-resize;
}

.ui-resizable-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: rgb(255, 0, 106);
  border-width: 1.5px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  border-image: initial;
  border-radius: 999px;
}

.resizable-wrapper {
  width: 8px;
  height: 16px;
}

.ui-widget-content {
  cursor: move;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 101;
}

.modal-custom {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 5px;
  z-index: 5000;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
}

.modal-close {
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
height: 80vh;
  background: white;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.modal-overlay::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3px);
}
</style>
