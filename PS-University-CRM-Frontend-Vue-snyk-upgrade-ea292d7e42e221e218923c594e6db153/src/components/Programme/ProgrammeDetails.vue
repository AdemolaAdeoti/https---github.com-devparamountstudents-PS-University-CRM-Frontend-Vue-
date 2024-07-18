<template>
  <div
    style="width: 730px; margin: auto; margin-top: 0px"
    class="d-flex flex-column"
  >
    <div class="inputGroupContainer d-flex flex-column align-items-start p-4">
      <!-- High School Name -->
      <div class="row col-12">
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Study Location<span style="color: red">*</span></label
          >
          <DropDown
            @hide="updateInput('formData.country_id', $event)"
            v-model="formData.country_id"
            :options="countries"
            optionLabel="name"
            optionValue="id"
            placeholder=""
            filter
            class="w-100 required"
            @change="loadStates()"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'country_id'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Study city/state<span style="color: red">*</span></label
          >
          <DropDown
            @hide="updateInput('formData.state_id', $event)"
            v-model="formData.state_id"
            :options="states"
            optionLabel="name"
            optionValue="id"
            placeholder=""
            filter
            :loading="stateIsLoading"
            class="w-100 required"
          />
          <p
            v-if="
              showValidationObject.show && showValidationObject.id == 'state_id'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
      </div>
      <div class="row col-12">
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Program Type<span style="color: red">*</span></label
          >
          <DropDown
            @hide="updateInput('formData.program_type', $event)"
            v-model="formData.program_type"
            :options="ProgrammeTypes"
            placeholder=""
            class="w-100 required"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'program_type'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <!-- Program Code -->
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Program Code<span style="color: red">*</span></label
          >
          <InputText
            @input="updateInput('formData.program_code', $event)"
            v-model="formData.program_code"
            placeholder=""
            class="w-100 required"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'program_code'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
      </div>
      <div class="row col-12">
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Program Name<span style="color: red">*</span></label
          >
          <InputText
            class="w-100 required"
            @input="updateInput('formData.program_name', $event)"
            v-model="formData.program_name"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'program_name'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>    
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Program Award<span style="color: red">*</span></label
          >
          <DropDown
            @hide="updateInput('formData.program_award', $event)"
            v-model="formData.program_award"
            :options="ProgrammeAwardTypes"
            placeholder=""
            :filter="true"
            class="w-100"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'program_award'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Program Duration<span style="color: red">*</span></label
          >
          <DropDown
            @hide="updateInput('formData.program_duration', $event)"
            v-model="formData.program_duration"
            :options="programDurationTypes"
            placeholder=""
            class="w-100 required"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'program_duration'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Program ECTS<span style="color: red">*</span></label
          >
          <DropDown
            @hide="updateInput('formData.program_ECTS', $event)"
            v-model="formData.program_ECTS"
            :options="ProgramEctsTypes"
            placeholder=""
            class="w-100 required"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'program_ECTS'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Program Faculty<span style="color: red">*</span></label
          >
          <DropDown
            @hide="updateInput('formData.faculty_id', $event)"
            v-model="formData.faculty_id"
            :options="faculties"
            optionLabel="name"
            optionValue="id"
            placeholder=""
            :filter="true"
            class="w-100 required"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'formData.faculty_id'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <div class="col-6">
          <label class="fw-bold mb-1 m-2"
            >Study Language<span class="text-danger"> * </span></label
          >
          <MultiSelect
            @hide="updateInput('study_language', $event)"
            class="w-100 required"
            v-model="formData.study_language"
            :options="categories"
            optionLabel="name"
            optionValue="value"
            :filter="true"
            :multiple="true"
            :showHeader="false"
            placeholder="Select Options"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'study_language'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <div class="col-6">
          <label class="fw-bold mb-1 m-2"
            >Learning Mode<span class="text-danger"> * </span></label
          >
          <MultiSelect
            @hide="updateInput('learning_mode', $event)"
            class="w-100 required"
            v-model="formData.learning_mode"
            :options="learningModes"
            optionLabel="name"
            optionValue="value"
            :multiple="true"
            :showHeader="false"
            placeholder="Select Options"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'learning_mode'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <div class="col-6">
          <label class="fw-bold mb-1 m-2"
            >Study Type<span class="text-danger"> * </span></label
          >
          <MultiSelect
            @hide="updateInput('study_type', $event)"
            class="w-100 required"
            v-model="formData.study_type"
            :options="studyTypes"
            optionLabel="name"
            optionValue="value"
            :multiple="true"
            :showHeader="false"
            placeholder="Select Options"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'study_type'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
      </div>
      <div style="margin: auto !important; width: 100%" class="w-100 m-4">
        <!-- Upload Cover Photo -->
        <label class="fw-bold mb-1 m-4"
          >Upload Cover Photo <span class="text-danger"> * </span></label
        >
        <div
          style="
            height: 128px !important;
            border: 1px dashed #4d5056;
            border-radius: 12px;
          "
          class="px-3 d-flex align-items-center justify-content-between"
        >
          <div class="d-flex align-items-center">
            <div>
              <img
                style="width: 80px; height: 80px; border-radius: 12px"
                class="me-3"
                id="upload-img"
                :src="
                  formData.cover_photo_url !==''
                    ? formData.cover_photo_url
                    : require('@/assets/images/universities-list/upload-svg.svg')
                "
                alt=""
              />
            </div>
            <div class="d-flex m-auto flex-column align-items-start">
              <!--     <p style="color: rgb(77, 80, 86) !important">
                960px by 960px . Max 5MB
              </p> -->
              <p style="margin: 0; color: rgb(77, 80, 86) !important">
                High-resolution images (png, jpg)
              </p>
            </div>
          </div>
          <div>
            <form className="">
              <label className="custom-file-upload" id="file">
                <input
                  accept=".jpg, .jpeg, .png"
                  @change="showFile"
                  type="file"
                  id="file-input"
                />
                Browse
              </label>
            </form>
            <button @click="openFileInput" class="border py-2 px-5">
              Browse
            </button>
          </div>
        </div>
        <p
          v-if="
            showValidationObject.show &&
            showValidationObject.id == 'formData.cover_photo_url'
          "
          class="text-danger text-center"
          >Field is required</p
        >
      </div>
    </div>

    <hr style="border: 0.5px solid #000000" />
    <div class="inputGroupContainer d-flex flex-column align-items-start p-4">
      <!-- High School Name -->

      <div class="row col-12">
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Program Status</label
          >
          <DropDown
            @hide="updateInput('formData.status', $event)"
            v-model="formData.status"
            :options="statusTypes"
            placeholder=""
            class="w-100"
          />
        </div>
      </div>

      <label style="font-weight: 600 !important" class="mb-1"
        >Enter Comments</label
      >
      <textarea
        v-model="formData.comment"
        @input="updateInput('formData.comment', $event)"
        style="resize: none"
        col="15"
        rows="4"
        class="inputTypeTextArea"
        type="text"
        placeholder="Add whatever extra detail you may feel is necessary."
      />
    </div>
  </div>
</template>

<script>
// import { countries } from "@/data";
import MultiSelect from "primevue/multiselect";
import { get, postFormData } from "@/api/client";
export default {
  name: "ProgrammeDetails",
  props: ["program"],
  // components: ["CalendarComponent", "Checkbox" ],
  components: { MultiSelect },
  data() {
    return {
      faculties: [],      
      registeredDate: "50",
      statusTypes: ["Open", "Closed", "In Progress", "Under Review"],
      stateIsLoading: false,
      states: ["Turkey", "Istanbul"],
      countries: [],

      ProgrammeNameTypes: ["Part Time", "Full Time"],

      programDurationTypes: [
        "1 year",
        "2 year",
        "3 year",
        "4 year",
        "5 year",
        "> 5 year",
      ],      
      ProgrammeTypes: ["Associate Degree","Bachelor's Degree", "Master's Degree","Doctorial Degree","Professional Certificates","Post Graduate Dioploma","Diploma Program","Summer Program"],
      ProgrammeAwardTypes: ["BA","BEd","BSc","B.E","LLB","MA","MSc","MPhil","MBA","MRes","Diploma","LLM","HND","ND"],
      ProgramEctsTypes: [ "30","60","90","120","150","180","210","240"],

      photoUrl: "",
      coverPhotoUrl: "",
      formData: {
        country_id: 0,
        state_id: 0,
        program_type: "",
        program_code: "",
        program_name: "",
        university_id: "",
        program_award: "",
        program_duration: "",
        program_ECTS: "",
        faculty_id: "",
        study_language: [],
        learning_mode: [],
        study_type: [],
        cover_photo_url: "",
        status: "",
        comment: "",
      },
      categories: [
        { value: "English", name: "English", key: "E" },
        { value: "Turkish", name: "Turkish", key: "T" },
        { value: "French", name: "French", key: "F" },
        { value: "Arabic", name: "Arabic", key: "A" },
        { value: "Chinese", name: "Chinese", key: "C" },
        { value: "Russia", name: "Russia", key: "R" },
        { value: "Purtugeses", name: "Purtugeses", key: "P" },
        { value: "Italian", name: "Italian", key: "I" },
        { value: "Hindi", name: "Hindi", key: "H" },
        { value: "Estonian", name: "Estonian", key: "E" },
        { value: "German", name: "German", key: "G" },
      ],
      learningModes: [
        { value: "On Campus", name: "On Campus", key: "O" },
        { value: "Online", name: "Online", key: "F" },
        { value: "Hybrid", name: "Hybrid", key: "F" },
      ],
      studyTypes: [
        { value: "Part Time", name: "Part Time", key: "O" },
        { value: "Full time", name: "Full time", key: "F" },
      ],
      showValidationObject: {
        show: false,
        id: "",
      },
    };
  },
  computed: {
    maskValue() {
      return (
        this.countries.filter((item) => {
          return item.id == this.formData.country_id;
        })[0]?.phone_code ?? ""
      );
    },
  },
  methods: {
    recieveValidation(validateID) {
      this.showValidationObject.show = true;
      this.showValidationObject.id = validateID;
    },
    updateInput(key, value) {
      this.showValidationObject.show = false;
      //console.log(this.formData.state_id,this.formData.program_code,this.formData)
      this[key], value;
      this.$emit("on-change", this.formData);
    },
    async loadStates(callback = function () {}) {
      this.stateIsLoading = true;    
      const response = await get(
        `api/state/${this.formData.country_id}`,
        false
      );
      this.states = response;
      callback();
      this.stateIsLoading = false;
    },
    openFileInput() {
      document.getElementById("file").click();
    },
    readFile(e) {
      let files;
      if (e.target.files) {
        files = e.target.files;
      } else {
        files = e.dataTransfer.files;
      }
      if (files.length == 0) {
        alert("What you dropped is not a file.");
        return;
      }
      let file = files[0];
      document.getElementById(
        "file"
      ).textContent = `${file.name}| ${file.type}`;
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("file-input").value = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    getTheFile(e) {
      e.preventDefault();
      this.readFile(e);
    },
    dragOver(e) {
      e.currentTarget.classList.add("blue-bg");
      e.currentTarget.style.color = "white";
      e.stopPropagation();
      e.preventDefault();
    },
    dragLeave(e) {
      e.currentTarget.classList.remove("blue-bg");
    },
    async showFile(e) {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder_name", "Programs");
        const res = await postFormData("file_upload", formData);
        
        if(res?.responseBody)
          this.formData.cover_photo_url = res.responseBody;
          this.$emit("on-change", this.formData);

        /* 
        reader.onload = function(event) {
          const fileData = event.target.result.split(',')[1];
          // Convert the file to a Base64-encoded string
          
        } */
      }
    },
    setPreviousDetails() {
      this.formData.country_id = Number(this.program?.country_id);
      let $this = this;
      this.loadStates(function () {
        $this.formData.state_id = Number($this.program?.state_id);
      });

      this.formData.comment = this.program?.comment;
      this.formData.status = this.program?.status;
      this.formData.study_type = this.program?.study_type;
      this.formData.study_language = this.program?.study_language;
      this.formData.program_code = this.program?.program_code;
      this.formData.program_type = this.program?.program_type;
      this.formData.program_name = this.program?.program_name;
      this.formData.program_award = this.program?.program_award;
      this.formData.program_duration = this.program?.program_duration;
      this.formData.program_ECTS = this.program?.program_ECTS;
      this.formData.learning_mode = this.program?.learning_mode;
      this.formData.cover_photo_url = this.program?.cover_photo_url;
      this.formData.faculty_id = this.program?.faculty_id;
      this.formData.university_id = Number(this.program?.university_id);
    },
  },
  updated() {
    // this.$emit('has-required-completed',)
  },
  mounted() {
    this.setPreviousDetails();
  },
  async created() {    
    const faculties = await get("api/faculties", false);  
    this.faculties = faculties;
    const response = await get("api/countries", false); 
    this.countries = response;
  },
  unmounted() {},
};
</script>

<style scoped>
.inputGroupContainer {
  margin-top: 32px;
  border: 0.5px solid #000000;
  border-radius: 6px;
}
.inputGroupContainer2 {
  margin-top: 1px;
  width: 100%;
  border: 0.5px solid #000000;
  border-radius: 6px;
}

.inputTypeText {
  width: 100%;
  padding: 10px 14px 10px 12px;
  border: 0.5px solid #000000;
  border-radius: 4px;
}
.inputTypeTextArea {
  font-size: 14px;
  width: 100%;
  padding: 10px 14px 10px 12px;
  border: 0.5px solid #000000;
  border-radius: 4px;
}
button:hover:not(.p-calendar button) {
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.25s ease-in-out;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  display: none !important;
  text-decoration: underline;
  color: #0017ff;
  cursor: pointer;
}
</style>
