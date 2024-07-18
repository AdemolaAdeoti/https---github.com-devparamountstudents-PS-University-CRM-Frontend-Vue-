<template>
  <div class="px-3 mt-3">
    <div class="d-flex justify-content-between">
      <div>
        <h3 class="fw-bold">Student's Letters</h3>
      </div>
      <div class="mx-5">
        <button @click="createLetter" class="backgroundImage">
          <img
            :src="require(`/src/assets/images/add-outline.svg`)"
            style="height: 20px; width: 20px; margin-bottom: 2px"
          />
          Create Letter
        </button>
      </div>
    </div>
    <p class="mt-5 text-danger fs01">
      NOTE: Once you have selected a document with a specific status, please
      note that you cannot select another document with the same status. To
      proceed, you must delete the previous document with the same status type
      and then select a new document.
    </p>
    <div class="bg-warning mb-3" style="height: 1px; width: 100%"></div>
    <div v-show="!editing">
      <div class="row w-100 px-2 py-3 bg-white shadow mb-3 rounded mx-auto"
        v-for="(letter, index) in letters"
        :key="index" >
        <div class="col-4">
          <p class="m-0 fs1 text-secondary">Document Name</p>
          <p class="mt-1 fs1 mb-0" style="text-transform: capitalize">
            {{ letter.name.replaceAll("_", " ") }}
          </p>
        </div>
        <div class="col-2 ">
          <p class="m-0 fs1 text-secondary">Status Type</p>
          <p class="mt-2 fs1 mb-0">
              <StatusIcon :status="getStatus(letter.name)" />             
          </p>
        </div>
        <div class="col-4 row">
          <div class="col-6 d-flex align-items-center">
            <Button name="Edit Letter" :data="letter" @onclick="editLetter" :iconPath="$globals.icons.pen" />
          </div>
          <div class="col-6 d-flex align-items-center">
            <Button name="View Letter" :data="letter" @onclick="viewLetter"  :iconPath="$globals.icons.eye" />
          </div>
        </div>
        <div class="col-2  d-flex align-items-center">
            <Button name="Delete Letter" :data="letter" @onclick="deleteLetter" color="red" :iconPath="$globals.icons.delete" />
        </div>        
      </div>
    </div>
    <div v-if="editing">
        <LetterTemplate @oncancel="cancelEditing" @onupdated="updated" :update="updatingLetter" :content="editorData" :type="letterType" :letters="letters" />
    </div>

    <div v-if="showModal">
          <div class="modal-overlay" @click="closeModal"></div>
          <div class="modal-custom">
            <div class="modal-header">
              <button class="modal-close" @click="closeModal">&times;</button>
            </div>
            <div
              class="modal-body d-flex justify-content-center align-items-center"
              style="overflow: auto"
            >
            <div class='ck-content' style="height: 100%;width: 100%;display: inline-block;padding: 31px;">            
                <div v-html="editorData">
                </div>
            </div>
            </div>
          </div>
      </div>   
  </div>
</template>

<script>
import { get,post } from "@/api/client";
/* import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; */
import StatusIcon from "@/components/Global/StatusIcon.vue";
import Button from "@/components/Global/ButtonButton.vue";
import LetterTemplate from "@/components/LetterTemplate.vue";
import {showModal} from "@/plugins/modal";
//import html2pdf from 'html2pdf.js';
export default {
  name: "GeneralSettings",
  components: {
    StatusIcon,
    Button,
    LetterTemplate
  },
  data() {
    return {
      globals: this.$globals,
      letterType: "",
      lettersType: [
        { name: "Acceptance Letter", value: "acceptance_letter" },
        { name: "Conditional Letter", value: "conditional_letter" },
        { name: "Rejection Letter", value: "rejection_letter" },
      ],
      letters: [],      
      editorData: "",     
      editing:false,
      updatingLetter:false,
      showModal: false,
      pdfUrl: '',
    };
  },
  async created() {
    await this.fetchLetter();
  },
  methods: {    
    async deleteLetter(data){
       let res = await showModal({
            title:`<span class='d-flex align-items-center' style='fill:#191C1C'>${this.$globals.icons.delete} <span class='ms-1'>Delete</span></span>`,
            text:"Are you sure you want to Delete letter",
            confirmText:"Yes",
            cancelText:"Cancel",
            cancelOutline:'warning',
            cancelBackground:'white'
        })
        if(!res) return false
        res = await post('configuration/delete',{id:data.id});
        showModal({
                title:res.message,
                text:'Your Student’s letter has been updated successfully',
                confirmText:'Ok',
                icon:'success'
            })
    },
    closeModal() {
      this.showModal = false;
      this.pdfUrl = '';
    },
    updated(){
        this.cancelEditing()
        this.fetchLetter()
    },
    cancelEditing(){
        this.editing = false
        this.updatingLetter = false
        this.letterType = ""
        this.editorData = ""
    },
    editLetter(data){        
        this.editing = true
        this.updatingLetter = true
        this.letterType = data.name
        this.editorData = data.value
    },
    createLetter(){
        this.editing = true
        this.updatingLetter = false
        this.letterType = ""
        this.editorData = ""
    },
    viewLetter(data){     
        this.editorData = data.value        
        this.showModal = true;      
    },
    getStatus(name) {
      let letter_name = name.replaceAll("_", " ");
      return letter_name.includes("conditional")
        ? "Accepted"
        : letter_name.includes("rejection")
        ? "Rejected"
        : letter_name.includes("acceptance")
        ? "Enrolled"
        : "";
    },
    async fetchLetter() {
      let res = await get("configuration?type=letter");
      if (res?.message) {
        this.letters = res.message;
        //  this.editorData = res.message.value;
        // this.editor = DocumentEditor
      }
    },
    
  },
  mounted() {},
};


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
.fs01{
  font-size: 0.8em !important;
}
.fs1{
  font-size: 0.9em !important;
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
