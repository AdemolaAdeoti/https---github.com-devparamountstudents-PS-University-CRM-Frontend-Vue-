<template>
    <div style="display: flex;align-items: center;">    
     <div :class="{'d-flex':loadingStatus == 100,'d-none':loadingStatus < 100}" class="w-100">                        
        <div style="padding: 10px;width: 20%;">
            <div style="height: 80%;width: 100%;overflow-y: auto;" >
                <div v-for="(page, pageIndex) in pdfPages" @click="selectPage(pageIndex)"  :key="pageIndex" :style="{
                        background: pageIndex === selectedPageIndex ? $globals.colorsHex.warningLight : '',padding: '10px',border: '1px solid ' + $globals.colorsHex.warning,width: '100%',margin: '20px 0px',cursor:'pointer'}">
                    <canvas :ref="'pagePrevCanvas_1010' + pageIndex" style="width:100%;" height="200" ></canvas>
                </div> 
                                                                      
            </div>            
        </div>
        <div  style="width:95%;border-left: 1px solid #aaa;">     
            <br/><br/>      
            
            <div  style="width:90%;overflow: auto;margin-left:auto;margin-right:auto;line-hti">     
                <div class="p-0 position-relative mx-auto" style="width:700px" >
                    <canvas id="pageCanvasRef-1010" ref="pageCanvasRef-1010" style="width:100%;"></canvas>       
                    <div v-for="(sign, y) in letter.signs" :key="'y_'+y"  :style="'position:absolute;top:'+sign.pos_y+'px;left:'+sign.pos_x+'px'">
                        <div v-if="selectedPageIndex+1 == sign.page" :id="'signature_'+y" >
                            <button v-if="!sign?.url" @click="addSignature(y)" class="btn btn-sm btn-secondary shadow">Signature Placeholder</button>
                            <!-- <button v-else @click="undo(sign)" class="btn btn-sm btn-dark mt-3">Undo</button>                                 -->
                        </div>                         
                    </div>                      
                </div>
            </div>
        </div>
    </div>
    <div v-if="loadingStatus<100" class="justify-content-center align-items-center w-100" style="height:100%;" :class="{'d-flex':loadingStatus < 100,'d-none':loadingStatus >= 100}">
        <CircleProgress  :value="loadingStatus" ></CircleProgress>
    </div>
    <Transition  name="fade">
        <div v-if="showModal2">
            <div class="modal-overlay" style="z-index: 5002;" @click="showModal2 =false"></div>
            <div class="modal-custom" style="z-index: 5003;">         
            <div class="modal-body">                
                    <SignatureModal @getSign="handleFileUpload" ></SignatureModal>                
            </div>
            </div>
        </div>
    </Transition>
    </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";  

import "jquery-ui-dist/jquery-ui";
import { showModal } from "@/plugins/modal";
import CircleProgress from '@/components/Global/CircleProgress.vue'
import SignatureModal from '@/components/SignatureModal.vue'
let pdfDocument = null;

export default {
    props:['letter'],
    components:{
        CircleProgress,
        SignatureModal
    },
    data() {
        return {
            showModal2:false,
            loadingStatus:1,
            pdfPages:null,
            selectedPageIndex:0,            
            getSigns:'',            
            letters:'',            
            signs:[],
            signIndex:0,
            pdfScale:3,
            driverConfig:null,
            canvasHistory:[],
            canvasIndex:null      
        }       
    },
    created(){
    },
    mounted(){
        this.$nextTick(()=>{
            this.signs = this.letter.signs
            this.selectLetter(this.letter.url || this.letter.template)
        })
    },
    watch:{
        loadingStatus:function (nnew){    
            if(nnew>=100){
                this.$emit('loaded', nnew )
            }        
        }
    },
    methods:{
      async  addSignature(index){
                this.signIndex = index
                if(window.driverObj){
                    this.driverConfig = window.driverObj.getConfig()
                    window.driverObj.destroy();
                }
                this.showModal2 = true
               /*  const res = await showModal({
                    title:'Select Method',
                    text:'Ensure image size is 100px X 50px or it relative ratio',
                    selectOptions:[
                        'Upload',
                        'Draw'
                    ]
                })                  
                if(res =='Upload'){
                    this.$refs['myFileInput'].click()
                }   */           
        },
        handleFileUpload(event) {         
            this.showModal2 = false      
            let sign = this.signs[this.signIndex];  
            sign.url = event       
            this.$emit('attachSignature', sign);          
        },
    
        undo(sign) {
            sign.url = null
            this.$emit('undoAttach', true);
       /*  if (this.canvasIndex > -1) {
            const prevState = this.canvasHistory[this.canvasIndex];
            this.canvasIndex -= 1;
            const canvas = this.$refs['pageCanvasRef-1010'];
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            };

            img.src = prevState;
        } */
        },
        async selectPage(pageIndex){
                if(this.selectedPageIndex != pageIndex){
                    this.selectedPageIndex = pageIndex
                    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;        
                    this.initiatOnePage(pageIndex+1, 'pageCanvasRef-1010', this.pdfScale)
            }
        },
        async initiatOnePage(pageIndex, canvasRef, scale= 0.4){      
                                       
            await pdfDocument.getPage(pageIndex).then(async (page) => {               
                let canvas;
                if (canvasRef === 'pageCanvasRef-1010') {
                    canvas = document.getElementById('pageCanvasRef-1010'); // Corrected typo here
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
        async selectLetter(url=null){
       
            
            try{          
                await this.loadPdf(url);
                
                    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;                  

                    this.loadingStatus = 0; 
                    setTimeout(async ()=>{
                        for (let n = 0; n < this.pdfPages?.length; n++) {
                            await this.initiatOnePage(n + 1, 'pagePrevCanvas_1010' + n, 0.3);

                            if (n === 0) {
                                await this.initiatOnePage(1, 'pageCanvasRef-1010', this.pdfScale);
                            }
                            //update loading status                           
                            this.loadingStatus = Math.ceil(((n + 1) / this.pdfPages.length) * 100);
                            await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
                        }
                    },1000)
                }catch(e){                        
                    showModal({title:'Failed to load Letter',text:'Please check you network'})
                }   
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
            }catch(e){
                console.log(e)
            }
        },
    }
}
</script>


<style>

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
    width: 300px !important;
    height: 300px;
    background-color: white;
    border-radius: 5px;
    z-index: 5000;
    display: flex;
    align-items: center;
  }

  
</style>
