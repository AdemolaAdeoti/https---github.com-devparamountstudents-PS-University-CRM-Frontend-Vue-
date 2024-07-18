<template>    
    <div class="pdf-container" style="overflow: auto;width:100%;">
        <div class="ps-5 border-bottom w-100 pt-2 d-flex justify-content-between align-items-center" style="overflow: auto;">
            <div class="d-flex align-items-center">                    
                <div @click="currentTab =1" style="cursor: pointer; border-bottom: 4px solid transparent; color: rgb(29, 41, 57); font-size:13px; " :style="currentTab === 2 && 'border-bottom:  3px solid #bbb; font-weight:600' " class="p-3"> 
                    All Documents
                </div>
            </div>
            <div>
              <span v-if="selectedLetterIndex !=null">
                <button @click="updateStatus(letters[selectedLetterIndex],'accepted')" :class="{'d-inline':selectedLetterIndex !=null,'d-none':selectedLetterIndex ==null}" :disabled="letters[selectedLetterIndex].receiver_status === 'accepted'" class="btn mx-2 btn-secondary btn-sm text-dark px-2" >Submit Document</button>
              </span>
              <button v-if="previewLetter?.url" :class="{'d-inline':selectedLetterIndex !=null,'d-none':selectedLetterIndex ==null}" @click="reset()" :disabled="letters[selectedLetterIndex].receiver_status === 'accepted'" class="btn mx-2 btn-danger btn-sm">Reset</button>
              <button  :class="{'d-inline':selectedLetterIndex !=null,'d-none':selectedLetterIndex ==null}" @click="previewLetter=null;keyData+=1; letters[selectedLetterIndex].show=false" class="btn btn-warning btn-sm">Back to Documents</button>
            </div>
      </div>      
      <div :class="{'d-flex':currentTab === 1,'d-none':currentTab !== 1}"  class="w-100" style="overflow-y: auto; height: 100%;">
        <div v-if="letters.length<1" class="align-items-center justify-content-center d-flex flex-column text-center w-100" style="height:60vh">
            <span v-html="$globals.icons.noDocs"></span>
            <h1 class="mt-3">No file found</h1>
            <p class="m-0">It seems we can’t find any file.</p>
        </div>
        <div v-else class="w-100" style="height: 70vh;">   
          <div v-if="previewLetter == null">
            <div  v-for="(lett, l) in letters" :key="l" class="d-flex flex-column align-items-center my-2">
              <LetterCard :key="keyData" @view="OpenLetterCard($event,l, lett,'prevCanvasFinal_' + l)" :letter="lett"></LetterCard>
              <div :key="previewLetter?.url" v-show="lett?.show"  class="w-100  bg-white">                          
                <div  class="d-flex pt-3 flex-column align-items-center  bg-white w-75" style="margin-left:11%">
                  <div id="previewScreen"  @dblclick="preview(lett)" :style="'padding: 10px;border: 1px dashed #aaa;  margin: 20px 10px;'" class="position-relative col-md-3 d-flex flex-column align-items-center"> 
                    <canvas :ref="'prevCanvasFinal_' + l" :id="'prevCanvasFinal_' + l" style="width:160px;border:1px solid #aaa;" class="mx-auto" height="200"></canvas>
                    <p class="text-center">
                      <span style="font-size:0.85em" class="text-center">{{ lett.pages }} Pages</span>
                    </p>
                  </div>
                  <div class="mb-3">
                    <button @click="updateStatus(lett,'accepted')" :disabled="lett.receiver_status === 'accepted'" class="btn mx-2 btn-secondary btn-sm text-dark px-2" >Submit Document</button>
                    <button @click="updateStatus(lett,'rejected')" :disabled="lett.receiver_status === 'accepted'" class="btn mx-2 btn-secondary btn-sm text-dark px-2" >Reject Document</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <PdfPreview ref="childRef" @undoAttach="undoAttach($event)" :key="previewLetter?.url"  @attachSignature="signagureData($event)" @loaded="previewLoaded($event)" :letter="previewLetter"></PdfPreview>
            <!-- <div class="mt-3">
              <button class="btn btn-white border mr-3" >Close</button>
              <button class="btn btn-warning">Send Document</button>
            </div> -->
          </div>
        </div>
      </div>
        
    </div>
   
  </template>
    
  <script>
  import { PDFDocument} from 'pdf-lib';
  import * as pdfjsLib from "pdfjs-dist";
  import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";  
  import { driver } from "driver.js";
  import "driver.js/dist/driver.css";
  //import jquery from "jquery";
  import "jquery-ui-dist/jquery-ui";
  import { showModal } from "@/plugins/modal";
  import { postFormData, post } from '@/api/client';
  //import CircleProgress from '@/components/Global/CircleProgress.vue'
  import LetterCard from '@/components/LetterCard.vue'
  import PdfPreview from '@/components/PdfPreview.vue'
  //const $ = jquery;
  window.driverObj = null
  let pdfDocument = null;
  export default {
    props:{documents:{default:[]}},
    components: {
     //   CircleProgress,
        LetterCard,
        PdfPreview
    },
    data() {
      return {     
        previewLetter:null,
        loadingStatus:0,
        selectedPageIndex:0,   
        previewing:false,
        currentTab:1,
        letters:[],
        savedLetters:[
            {
                owner_id:21,
                platform:'university',
                receiver_status:'accepted',
                status:'rejected', 
                signed_date:'20-08-2023',
                approval_date:'20-08-2023',
                name:'agreement letter',
                url:"blob:http://localhost:8080/f929c03f-b7c3-483c-a893-173df4f9caec",                
                template:"blob:http://localhost:8080/f929c03f-b7c3-483c-a893-173df4f9caec",                
                signs:[{"pos_x":135,"pos_y":194,"page":1}],            
                pages:4,
                created_at:'20-08-2023'
            }
        ],
        selectedLetterIndex:null,
        pdfUploadActive:false,
        isDragging: false,
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
        tour:0,
        tour2:0,
        keyData:0
      };
    }, 
    methods: {
      preview(letter){
        //this.showModal = true
        this.previewLetter = letter;
    },
    previewLoaded(){
      let steps = this.letters[this.selectedLetterIndex].signs.map((item, index)=>{
            return { element: '#signature_'+index, popover: { title: 'Add Signature', description: 'Click here to add signature', side: "bottom", align: 'start' }}        
        });
      steps.push( { popover: { title: 'Tour completed', description: 'you can now submit you document.' } })
      setTimeout(()=>{
        window.driverObj = driver({
                    allowKeyboardControl:false,
                    showProgress: true,
                    steps: [...steps],
                    onNextClick:(el,step)=>{                  
                      if(step.popover.title =="Add Signature"){
                        this.$refs.childRef.addSignature(0);
                      }         
                    }
                    }); 
                    if(this.tour2==0)   {
                      this.tour2 += 1
                      window.driverObj.drive();   
                    }
            },500)
      },
      async updateStatus(letter, status) {
        try {
          
          if (status === 'accepted') {
            this.$globals.loading = true
            let data = { id: letter.id, receiver_status:status };
            if (!letter.url) {
              showModal({ text: 'Sign the document before submitting' });
              return;
            }

            if(letter.receiver_status == 'accepted'){
              throw new Error('Document already signed'); 
            }
            const blob = await fetch(letter.url).then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.blob();
            });

            const formData = new FormData();
            formData.append('file', blob);
            const uploadResponse = await postFormData('file_upload', formData);

            if (uploadResponse) {
              data.url = uploadResponse.responseBody;
              data.receiver_status = status
              data.signed_date = new Date()
            } else {
              throw new Error('Failed to upload the signed document');
            }
            const response = await post('update_document', data);
            this.$globals.loading = false
            if (response?.message) {
              letter.receiver_status = status;
              letter.signed_date = new Date();
              showModal({text:'Submitted Successfuly'});
            } else {
              throw new Error('Failed to update letter status');
            }
          }else{
            let data = { id: letter.id, receiver_status:status };

            const response = await post('update_document', data);
            if (response?.message) {
              letter.receiver_status = status;
            } else {
              throw new Error('Failed to update letter status');
            }
          }

        } catch (error) {
          showModal({text:'Error:'+ error});          
          // Handle errors here
        }
      },
    async  OpenLetterCard(e, x, letter, ref){        
      if(letter.show){
        letter.show = false
        return false
      }

        letter.show = e
        this.selectedLetterIndex = x;
        this.$globals.loading = true
        await this.selectLetter(x, letter.url || letter?.template,ref)
        this.$globals.loading = false
        //steps.push( { popover: { title: 'Tour completed', description: 'you can now submit you document.' } })
        if(letter.receiver_status == 'pending'){          
          window.driverObj = driver({
                      allowKeyboardControl:false,
                      showProgress: true,
                      doneBtnText:'Open Document',                    
                      showButtons:['next','close'],
                      nextBtnText:'Continue',
                      steps: [
                        { element: '#l', popover: { title: "Signing Your Agreement Letter", description: "Would you like me to guide you through these procceses?", side: "left", align: 'start' }},
                        { element: '#previewScreen', popover: { title: "Start Signing", description: "Double click on the document to preview for signing", side: "left", align: 'start' }}
                      ],                    
                      onNextClick:(el,step)=>{
                        if(step.popover.title =="Start Signing"){
                          this.preview(letter)
                        }else{
                          window.driverObj?.moveNext()
                        }                     
                        console.log(el, step.popover.title)
                      }
                      });  
          if(this.tour==0)   {
            this.tour += 1
            window.driverObj.drive();   
          }
        }
        /* setTimeout(() => {
          window.driverObj.refresh()          
        }, 1000);    */
      },  
    async selectLetter(x, url=null, ref=null){
          if(url === null){
            this.selectedLetterIndex = x            
            url = this.letters[x].template
          }
          
          try{          
              await this.loadPdf(url);
              
                  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

                  if(ref !==null){                      
                    await this.initiatOnePage(1, ref, 0.3);
                    return false
                  }

                  this.loadingStatus = 0; 
                  setTimeout(async ()=>{
                      for (let n = 0; n < this.pdfPages?.length; n++) {
                          await this.initiatOnePage(n + 1, 'pagePrevCanvas_' + n, 0.3);

                          if (n === 0) {
                          await this.initiatOnePage(1, 'pageCanvasRef', this.pdfScale);
                          }
                          //update loading status                           
                          this.loadingStatus = Math.ceil(((n + 1) / this.pdfPages.length) * 100);
                          await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
                      }
                  },1000)
          }catch(e){      
            console.log(e) ;
              showModal({title:'Failed to load Letter',text:'Please check you network'})
          }   
      },
      async selectPage(pageIndex){
          if(this.selectedPageIndex != pageIndex){
              this.selectedPageIndex = pageIndex
              pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;        
              this.initiatOnePage(pageIndex+1, 'pageCanvasRef', this.pdfScale)
          }
      },
      async initiatOnePage(pageIndex, canvasRef, scale= 0.4){      
                                      
          await pdfDocument.getPage(pageIndex).then(async (page) => {               
              let canvas;
              if (canvasRef === 'pageCanvasRef') {
                  canvas = document.getElementById('pageCanvasRef'); // Corrected typo here
              } else {
                  canvas = this.$refs[canvasRef][0]; 
              }

              const context = canvas.getContext("2d");        
              const viewport = page.getViewport({ scale: scale });
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              await page.render({
              canvasContext: context,
              viewport,
              enableWebGL: false,
              });
              return true;
          })  
          return true;
      },
      async deleteLetter(index,letter) {
          // Remove the canvas element from the DOM
          let res = await post('delete_uploaded_file',{url:letter.template},'admin',false); 
          if(!res){
            return false;
          }

          const canvasRef = this.$refs['prevCanvas_' + index];
          if (canvasRef) {
              canvasRef[0].remove();
          }

          // Revoke the URL associated with the letter's canvas
          if (this.letters[index]?.template) {
              URL.revokeObjectURL(this.letters[index].template);
          }

          // Remove the letter from the array
          this.letters.splice(index, 1);
      },   
      async onChange() {        
        let name = await showModal({ 
          text:'Enter Letter Name',
          input:true,
          cancelText:"Cancel"
        });
        if(!name){
          return false
        }
        const formData = new FormData();
        formData.append("file", this.$refs.file.files[0]);
        formData.append("folder_name", "AdminUploadedLetters");
        let res = await postFormData('file_upload',formData, 'admin')           
        if(!res){
          showModal({
            text:'check your network and try again'
          })
          return false;            
        }
        this.pdfUrl = res.responseBody
        //this.pdfUrl = URL.createObjectURL(this.$refs.file.files[0]);             
          this.letters.push({
              name: name,
              url:null,                
              template:this.pdfUrl,                
              signs:[],
              pages:0,
          })
          this.$emit('updateLetter',this.letters)
          setTimeout(async()=>{          
              try{          
                  for(const index in this.letters){
                      const letter = this.letters[index];
                      await this.loadPdf(letter.template);
                      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;      
                      this.initiatOnePage(1,"prevCanvas_" + index)
                      this.letters[this.letters.length - 1].pages = this.pdfPages.length;
                  }                     
                  this.pdfUploadActive = true;
              }catch(e){                
                  showModal({text:'Agreement let yet to be sent'})
              }   
          }, 1000)                          
      },
      async loadPdf(url) {        
        
            try{
                 pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
                    const loadingTask = pdfjsLib.getDocument({
                    url:url,
                });
                
                pdfDocument = await loadingTask.promise;       
                this.pdfPages = Array.from(
                    { length: pdfDocument.numPages },
                    (_, pageIndex) => pdfDocument.getPage(pageIndex + 1)
                    );    
                    return pdfDocument;
        }catch(e){
            console.log(e)
        }
      },
        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        drop(e) {
            e.preventDefault();
            this.$refs.file.files = e.dataTransfer.files;
            this.onChange();
            this.isDragging = false;
        },    
  
     
      async attachSignature(){
        this.letters[this.selectedLetterIndex].signs.push({
            pos_x: this.sign.x,
            pos_y: this.sign.y,
            page:this.selectedPageIndex+1
        })     
        this.$emit('updateLetter',this.letters)   
        this.activateSign = false           
      },
      reset(){
        showModal({text:'Are you sure reset changes',cancelText:'Cancel'}).then((res)=>{
          if(res){
            this.previewLetter.signs = this.previewLetter.signs.map(item => {
              return { ...item, url: '' }; // Create a new object with the updated 'url' property
            });
            this.previewLetter.url=''
          }
        })
      },
      undoAttach(){
        
        if(this.canvasHistory.length >1){
          const url = this.canvasHistory[ this.canvasHistory.length-1]
          this.letters[this.selectedLetterIndex].url = url
          this.previewLetter.url = url
          this.canvasHistory.pop();
        }else if(this.canvasHistory.length >0){
          this.letters[this.selectedLetterIndex].url = ''
          this.previewLetter.url = ''
          this.canvasHistory.pop();
        }
      },
      async signagureData(data){      
        this.$globals.loading = true  
        const letter = this.letters[this.selectedLetterIndex]
        const url  = letter.url || letter.template
        const res = await this.loadAndModifyPdf(url, data);
        console.log(res,32)
        this.canvasHistory.push(res)        
        letter.url= res
        this.previewLetter = letter;        
        this.$globals.loading = false
      },  
      async loadAndModifyPdf(url,signatureData) {
              try {
          // Load the existing PDF document
          const pdfBytes = await fetch(url).then(res => res.arrayBuffer())
          const signatureImageBytes = await fetch(signatureData.url).then(res => res.arrayBuffer())
          const pdfDoc = await PDFDocument.load(pdfBytes);

          // Load the signature image
          const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

          // Get the first page of the PDF (adjust the page index as needed)
          const page = pdfDoc.getPages()[signatureData.page-1];

          // Draw the signature image on the page
          page.drawImage(signatureImage, {
            x: signatureData.pos_x, // Adjust X position as needed
            y:  page.getHeight() - signatureData.pos_y - 50, // Adjust Y position as needed
            width: 100, // Adjust width as needed
            height: 50, // Adjust height as needed
          });

          // Serialize the modified PDF document to bytes
          const modifiedPdfBytes = await pdfDoc.save();
          const modifiedPDFDataURL = URL.createObjectURL(new Blob([modifiedPdfBytes], { type: "application/pdf" }));           
          return modifiedPDFDataURL;
        } catch (error) {
          console.error("Error loading and modifying PDF:", error);
          return null;
        }
      }
   
    },
    async created() {
    
    },
    mounted() {
      this.$nextTick(() => {
        this.letters = this.userInfo?.university.agreement_letters
      });
    },
    computed:{
        getSigns(){
            if(this.selectedLetterIndex != null){
                return this.letters[this.selectedLetterIndex]?.signs
            }
            return []
        }
    },
  
  };
  </script> 
    
  <style scoped>
  .pdf-container {
   
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
  .progress-circle {
   font-size: 20px;
   margin: 20px;
   position: relative; 
   padding: 0;
   width: 5em;
   height: 5em;
   background-color: #F2E9E1; 
   border-radius: 50%;
   line-height: 5em;
  }
  
  .progress-circle:after{
    border: none;
    position: absolute;
    top: 0.35em;
    left: 0.35em;
    text-align: center;
    display: block;
    border-radius: 50%;
    width: 4.3em;
    height: 4.3em;
    background-color: white;
    content: " ";
  }
  
  .progress-circle span {
    position: absolute;
    line-height: 5em;
    width: 5em;
    text-align: center;
    display: block;
    color: #53777A;
    z-index: 2;
  }
  .left-half-clipper {    
   border-radius: 50%;
   width: 5em;
   height: 5em;
   position: absolute; 
   clip: rect(0, 5em, 5em, 2.5em); 
  }
  
  .progress-circle.over50 .left-half-clipper {
   clip: rect(auto,auto,auto,auto);
  }
  .value-bar {   
   position: absolute; 
   clip: rect(0, 2.5em, 5em, 0);
   width: 5em;
   height: 5em;
   border-radius: 50%;
   border: 0.45em solid #53777A; 
   box-sizing: border-box;
  
  }
  
  .progress-circle.over50 .first50-bar {
  
   position: absolute; 
   clip: rect(0em, 5em, 5em, 2.5em);
   background-color: #53777A;
   border-radius: 50%;
   width: 5em;
   height: 5em;
  }
  
  /* Progress bar rotation position */
  .progress-circle.p0 .value-bar { display: none !important; }
  </style>


  