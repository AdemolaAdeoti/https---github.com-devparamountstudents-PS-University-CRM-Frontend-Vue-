<template>
    <div class="row w-90 mx-auto">
      <div class="px-4 py-3">
        <div>
          <div>
            <DropDown  v-if="!update" v-model="letterType" class="w-50" :options="filterLetterTypes()" optionLabel="name" optionValue="value" />        
          </div>
          <b class="me-2">Variables: </b>
          <code>{full_name}, 
                {program_name},
                {program_code},
                {program_type},
                {program_award},
                {program_faculty},
                {study_type},
                {study_language},
                {program_duration},
                {program_ECTS},
                {learning_mode},
                {application_fee_amount}         
                {tuition_fee_amount}         
                </code>        
          <div class="bg-white">
            <ckeditor :editor="editor" v-model="editorData" @ready="onReady" :config="editorConfig"></ckeditor>
          </div>
          <!-- <EditorComponent v-model="acceptanceLetter" editorStyle="height: 320px" ></EditorComponent> -->
        </div>
      </div>
      <div class="d-flex justify-content-between mt-2 mb-5">
        <Button @onclick="back" name="Cancel" />
        <Button @onclick="saveLetter" name="Save Changes" />
      </div>
      <br>
    </div>
  </template>
  
  <script>  
  
  import { postFormData,post } from '@/api/client';
  /* import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; */
  import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
  import { showModal } from '@/plugins/modal';
  import Button from "@/components/Global/ButtonButton.vue";
  export default {
    name: "GeneralSettings",
    props:{
        letters:Array,
        update:{
            default:false
        },
        content:{
            default:''
        },
        type:{
            default:''
        }
    },
    components:{
        Button
    },
    data() {
      return {
        letterType:this.type,
        lettersType:[        
          {name:'Acceptance Letter',value:'acceptance_letter'},
          {name:'Conditional Letter',value:'conditional_letter'},
          {name:'Rejection Letter',value:'rejection_letter'},
        ],
        editor: DocumentEditor,
        editorData:'',
        editorConfig: {        
          height:400, 
          fontSize: {
            options: [
              9,10,11,12,13,14,15,16,17,            
              18,
              24,
              36,
              { model: '48px', title: 'Huge', class: 'ck-heading_font-size_huge' },
            ],
          },
          ckfinder: {         
       
          },
        }
      };
    },
    methods: {     
        filterLetterTypes() {            
            return this.lettersType.filter(item => {
                return !this.letters.some(letter => letter.name === item.value);
            });            
        },
      async saveLetter(){
        if(this.letterType ==''){
          showModal({
            title:`<span style="fill:#FF4C51">${this.$globals.icons.warning}</span>`,
            text:'Select a letter type',
            confirmText:'Ok'
            })
          return false
        }
        let wait = await showModal({title:"Are You Sure?",text:'Please ensure that all data has been properly updated.',confirmText:'Yes',cancelText:'No'})
        if(!wait) return false;
          let res = await post('configuration/save',{
            value:this.editorData,
            name:this.letterType,
            type:'letter'
          },);
          if(res?.message){
           await showModal({
                title:res.message,
                text:'Your Student’s letter has been updated successfully',
                icon:'success'
            })
            this.$emit('onupdated',true);
          }
      },
      onReady(editor) {
        // Insert the toolbar before the editable area.
        if(this.update){
            this.editorData = this.content
        }
        editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement(),
          editor.plugins.get('FileRepository').createUploadAdapter = (loader)=>{
            return new MyUploadAdapter(loader)
          }        
        );
        const toolbarOptions = editor.config.get('toolbar');
        toolbarOptions.push('indent');
        toolbarOptions.push('outdent');
        toolbarOptions.push('styles');
        editor.ui.view.toolbar.update(); 
      },
      back(){
        this.$emit('oncancel',true)
      }
    },
    mounted() {
       
    },
  };
  
  class MyUploadAdapter {
    constructor( loader ) {
          // The file loader instance to use during the upload.
          this.loader = loader;
      }
  
    async upload() {      
        const formData = new FormData();
        return this.loader.file.then(async (file) => {
          formData.append("file", file);
          formData.append("folder_name", "Programs");
          let res = await postFormData('file_upload',formData, true)        
          return {default:res.responseBody};
        })             
      }
      } 
  
  </script>
  
  <style>
  .heading {
    margin-top: 30px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 20px;
  }
  
  .save {
    background: #e5e7eb;
    transition: background 0.3s ease-in;
  }
  
  .save:hover {
    background: #eff0f3;
  }
  
  .line {
    background: orange;
    width: 939px;
    border: 1px solid #f79009;
  }
  
  .dropdown-sub {
    margin-top: -15px;
  }
  
  .sub {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
  }
  
  .sub1 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 20px;
  }
  
  .sub2 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
  }
  
  .arrow {
    margin-top: 20px;
    cursor: pointer;
  }
  
  .tick {
    margin-left: 40px;
    margin-top: -10px;
  }
  
  /* .arrow:hover {
    background: rgb(254, 167, 5);
    width: 100%;
    border-radius: 50%;
  } */
  .dropdown-content {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
  }
  
  button {
    outline: none;
  }
  .ck-editor__editable_inline {
      height: 300px;    
  }
  </style>