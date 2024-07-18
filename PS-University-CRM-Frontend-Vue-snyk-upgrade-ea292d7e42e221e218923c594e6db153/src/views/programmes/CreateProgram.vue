<template>
  <div class="">
    <RequestLoader />
    <div>
      <router-link to="/programs">

        <button class="btn btn-light btn-sm">
          <i  class="pi pi-arrow-left cursor-pointer"></i>    
        </button>
      </router-link>
      <div class="ps-5 mb-3 d-flex align-items-center justify-content-between">
        <!-- Page Header -->
        <h1 style="font-size: 36px">Create a Program</h1>
      </div>
    </div>
    <div class="ps-5 border-bottom w-100 d-flex align-items-center">
      <div
        @click="changeTab(1)"
        style="
          color: rgb(29, 41, 57);
          cursor: pointer;
          border-bottom: 4px solid transparent;
        "
        class="me-5 p-3"
        :style="
          currentTab === 1 &&
          'background-color:  rgba(231, 197, 157, 0.365)a(255, 217, 0, 0.365)(255, 217, 0);  border-radius: 10px; border:1px solid yellow'
        "
      >
        Program Details
      </div>
      <div
        @click="changeTab(2)"
        style="
          cursor: pointer;
          border-bottom: 4px solid transparent;
          color: rgb(29, 41, 57);
        "
        :style="
          currentTab === 2 &&
          'background-color:  rgba(231, 197, 157, 0.365)a(255, 217, 0, 0.365)(255, 217, 0);  border-radius: 10px; border:1px solid yellow'
        "
        class="p-3"
      >
        Admission Details
      </div>

      <div
        @click="changeTab(3)"
        style="
          cursor: pointer;
          border-bottom: 4px transparent;
          color: rgb(29, 41, 57);
        "
        :style="
          currentTab === 3 &&
          'background-color:  rgba(231, 197, 157, 0.365)a(255, 217, 0, 0.365)(255, 217, 0);  border-radius: 10px; border:1px solid yellow'
        "
        class="p-3"
      >
        Tuition Fees
      </div>

      <div
        @click="changeTab(4)"
        style="
          cursor: pointer;
          border-bottom: 4px solid transparent;
          color: rgb(29, 41, 57);
        "
        :style="
          currentTab === 4 &&
          'background-color:  rgba(231, 197, 157, 0.365)a(255, 217, 0, 0.365)(255, 217, 0);  border-radius: 10px; border:1px solid yellow'
        "
        class="p-3"
      >
        Academic Requirement
      </div>
      <div
        @click="changeTab(5)"
        style="
          cursor: pointer;
          border-bottom: 4px solid transparent;
          color: rgb(29, 41, 57);
        "
        :style="
          currentTab === 5 &&
          'background-color:  rgba(231, 197, 157, 0.365)a(255, 217, 0, 0.365)(255, 217, 0);  border-radius: 10px; border:1px solid yellow'
        "
        class="p-3"
      >
        Application fees
      </div>
    </div>
    <div v-show="currentTab === 1">
      <ProgrammeDetails ref="ProgramDetails" :program="programToUpdate"  @on-change="updateComponent($event, 'details')"  />
    </div>
    <div v-show="currentTab === 2">
      <AdminssionDeadline ref="AdmissionDeadline" :admission_deadlines="programToUpdate?.admission_deadlines" 
      @onUpdateDeadlines="updateComponent($event, 'deadline')"/>
    </div>
    <div v-show="currentTab === 3">
      <TuitionFee ref="TuitionFee" :tuition_fees="programToUpdate?.tuition_fees"  
      @onUpdateTuitionFee="updateComponent($event, 'tuition')"  />
    </div>
    <div v-show="currentTab === 4">
      <AcademicRequirement :requirements="programToUpdate?.requirements"  
      @onUpdateAcademicRequirement="updateComponent($event, 'academic')"  />
    </div>
    <div v-show="currentTab === 5">
      <ApplicationFee ref="ApplicationFee" :application_fees="programToUpdate?.application_fees" :isSubmitBtnClicked="isSubmitBtnClicked"  
      @onUpdateApplicationFee="updateComponent($event, 'application')"   />
    </div>
    <div class="d-flex align-items-center justify-content-between w-80 m-auto mt-5">
      <!-- Footer Buttons -->
      <button @click="$router.push('/programs')" class="border py-2 px-5">Cancel</button>
      <button
        v-if="currentTab === 1"
        @click="changeTab(currentTab + 1)"
        class="bg-warning border py-2 px-5"
      >
        Next
      </button>

      <button
        v-if="currentTab === 2"
        @click="changeTab(currentTab + 1)" 
        class="bg-warning border py-2 px-5"
      >
        Next
      </button>
      <button
        v-if="currentTab === 3"
        @click="changeTab(currentTab + 1)"
        class="bg-warning border py-2 px-5"
      >
        Next
      </button>
      <button
        v-if="currentTab === 4"
        @click="changeTab(currentTab + 1)"
        class="bg-warning border py-2 px-5"
      >
        Next
      </button>
      <button
        @click="publish"
        v-if="currentTab === 5"
        class="bg-warning border py-2 px-5"
      >
        publish
      </button>
    </div>
  </div>
  
  <br><br><br>
  <!-- <ConfirmModal
    v-if="isConfirmModalOpen"
    @closeConfirmModal="closeConfirmModal"
    @createProfile="createProfile"
    :message="message"
  /> -->
</template>

<script>
import ProgrammeDetails from "@/components/Programme/ProgrammeDetails.vue";
import AdminssionDeadline from "@/components/Programme/AdminssionDeadline.vue";
import TuitionFee from "@/components/Programme/TuitionFee.vue";
import AcademicRequirement from "@/components/Programme/AcademicRequirement.vue";
import ApplicationFee from "@/components/Programme/ApplicationFee.vue";
import RequestLoader from "@/components/Global/RequestLoader.vue";
import { post } from "@/api/client";
import { showModal } from "@/plugins/modal";

// import axios from "axios";
//import { useUserStore } from "@/stores/user";
export default {
  name: "CreateProgrammes",

  data() {
    return {
      currentTab: 1,
      updateProgrammeDetails:{
      },
      updateAdmissionDeadlines:[

      ],
      updateTuition:[],
      updateAcademic:[],
      updateApplication:[],
      isConfirmModalOpen: false,
      isSubmitBtnClicked: false,   
      programToUpdate:undefined,        
      message:"Are you sure you want to create program" 
    };
  },
  async created() {
     this.checkForProgramExist()

  },
  computed:{
    ProgrammeDetailsValidated() {
      return this.validationChecker(
        this.updateProgrammeDetails,
        ["comment", "cover_photo",'is_active','deadline'],
        false
      );
    },
    AdmissionDeadlineValidated() {
      return this.validationChecker(this.updateAdmissionDeadlines, []);
    },
    TuitionFeeValidated() {
      return this.validationChecker(this.updateTuition, ['scholarship_percent']);
    },
    ApplicationFeeValidated() {
      return this.validationChecker(this.updateApplication, []);
    },

  },
  methods: {
    validationChecker(unValidData, not_required = [], isArray = true) {
      const notRequired = [...not_required];

      let data = unValidData;
      if (isArray) {
        data.length > 0 ? (data = data[0]) : (data = {});
      }

      if (Object.keys(data).length === 0) {
        return "Missing Fields";
      }
      let required = false;
      Object.keys(data).every((key) => {
        if (!notRequired.includes(key) && this.isEmpty(data[key])) {
          required = key;
          return false;
        }
        return true;
      });
      return required;
    },
    sendValidation(validateID, ref) {
      this.$refs[ref].recieveValidation(validateID);
    },

    showAlert(title, tab = false, text = "Fill required fields") {
      showModal({
        text: title + ": " + text,
        confirmText: "Ok",
      }).then(() => {
        if (tab) {
          this.currentTab = tab;
        }
      });
    },
    reportIssues(title, tab, field, text) {
      if (field !== "Missgin Fields") {
        this.showAlert(title, tab, text);
        this.sendValidation(field, title.replace(" ", ""));
      } else {
        this.showAlert(title, 1, "Missgin Fields");
        return false;
      }
    },
    checkForProgramExist(){
      let program = JSON.parse(localStorage.getItem('selected_program'))
      if(program){
        this.updateProgrammeDetails = program
        this.programToUpdate = program
        this.message = "Are you sure you want to update program" 
        localStorage.removeItem('selected_program');
      }
    },
    changeTab(tab) {
      this.currentTab = tab;        
    },
    isEmpty(value) {
      if (typeof value === 'string') {
        return value.trim() === '';
      } else if (Array.isArray(value)) {
        return value.length === 0;
      } else if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length === 0;
      } else if (typeof value === 'number') {
        return value === 0;
      } else if (typeof value === 'boolean') {
        return !value;
      } else if(value instanceof File){
        return false ;
      } else {
        return value === null || value === undefined;
      }
    },
    openConfirmModal() {
      this.modalMessage = "Are you sure you want to create program";
      this.showModal = true;
    },
    closeConfirmModal() {
      this.showModal = false;
    },  
    async publish() {        

      if (this.ProgrammeDetailsValidated) {
        this.reportIssues("Program Details", 1, this.ProgrammeDetailsValidated);
      } else if (this.AdmissionDeadlineValidated) {
        this.reportIssues("Admission Deadline",2,this.AdmissionDeadlineValidated);
      } else if (this.TuitionFeeValidated) {
        this.reportIssues("Tuition Fee", 3, this.TuitionFeeValidated);
      } else if (this.ApplicationFeeValidated) {
        this.reportIssues("Application Fee", 5, this.ApplicationFeeValidated);
      } else {
        
        const  user = JSON.parse(localStorage.getItem('userInfo'));
        let payload = JSON.parse(JSON.stringify(this.updateProgrammeDetails));
        payload.admission_deadlines = this.updateAdmissionDeadlines,
        payload.tuition_fees = this.updateTuition,
        payload.application_fees = this.updateApplication,
        payload.university_id = user.university_id;
        payload.academic_description = this.updateAcademic          

        let route ='create'
        if(this.programToUpdate !== undefined){
          route = 'update'
          payload.id = this.programToUpdate.id
        }

        let res = await post(
          "program/"+route,
          payload,'admin',route+'-program-'+user.id
        );             
        if(Object.keys(typeof(res) == 'object'? res: {}).includes('university_id')){
          showModal({            
            text:'Created successfully',
            icon:'success'

          });
        }else{
          if(res){
            showModal({text:res});        
          }
        }
      }
    },
    updateAcademicFunc(value){      
        this.updateAcademic = value
    },
    updateComponent(data, name) {
      if (name == "details") {
        this.updateProgrammeDetails = data;
      }
      if (name == "deadline") {
        this.updateAdmissionDeadlines = data;
      }
      if (name == "tuition") {
        this.updateTuition = data;
      }
      if (name == "academic") {
        this.updateAcademic = data;
      }
      if (name == "application") {
        this.updateApplication = data;
      }
    },
  },
  components: {
    ProgrammeDetails,
    AdminssionDeadline,
    TuitionFee,
    AcademicRequirement,
    ApplicationFee,    
    RequestLoader,
  }  
};
</script>

<style scoped>
body {
  color: rgba(231, 197, 157, 0.365) a(255, 217, 0, 0.365) (255, 217, 0);
}
</style>
