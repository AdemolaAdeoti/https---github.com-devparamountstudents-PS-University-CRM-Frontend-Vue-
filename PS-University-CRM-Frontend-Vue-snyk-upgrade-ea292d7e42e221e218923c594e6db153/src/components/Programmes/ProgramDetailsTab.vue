<template>
  <div style="width: 90%" class="mx-auto row">
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--Study Location -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Study Location <span class="text-danger">*</span></label
      >
      <DropDown
        filter
        v-model="selectedStudyCountry"
        @change="$emit('update:studyCountry', $event.value.name)"
        :options="Countries"
        optionLabel="name"
        placeholder="sth"
        class="w-100 required"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="d-flex align-items-center">
            <img
              :src="
                require('@/assets/ProgrammeData/flags/' +
                  slotProps.value.alpha2 +
                  '.png')
              "
              class="me-1"
              style="width: 18px"
            />
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else> Please select </span>
        </template>
        <template #option="slotProps">
          <div class="d-flex align-items-center">
            <img
              class="me-1"
              :src="
                require('@/assets/ProgrammeData/flags/' +
                  slotProps.option.alpha2 +
                  '.png')
              "
              style="width: 18px"
            />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </DropDown>
    </div>
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--Study City/ State   -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Study City/ State <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedStudyCity"
        @change="$emit('update:studyCity', $event.value.name)"
        :options="CityTypes"
        optionLabel="name"
        placeholder="Select City / State"
        class="w-100"
      />
    </div>
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--Program Type  -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Program Type <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedProgramType"
        @change="$emit('update:programType', $event.value)"
        :options="ProgramTypes"
        class="w-100"
      />
    </div>
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--Course Code -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Course Code <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedCourseCode"
        @change="$emit('update:courseCode', $event.value)"
        :options="CourseCodeTypes"
        class="w-100"
      />
    </div>
    <div
      class="inputGroupContainer col-12 d-flex flex-column align-items-start"
    >
      <!--program name * -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Program Name <span class="text-danger">*</span></label
      >
      <input
        :value="programName"
        @change="$emit('update:programName', $event.target.value)"
        class="inputTypeText"
        type="text"
        placeholder="Please write your program name"
      />
    </div>
    <div
      class="inputGroupContainer col-12 d-flex flex-column align-items-start"
    >
      <!--program Award * -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Programs Faculty <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedProgramFaculty"
        @change="$emit('update:programFaculty', $event.value)"
        :options="ProgramFacultyTypes"
        class="w-100"
      />
    </div>
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--program Award * -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Program Award <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedProgramAward"
        @change="$emit('update:programAward', $event.value)"
        :options="ProgramAwardTypes"
        class="w-100"
      />
    </div>
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--Course Duration  -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Course Duration <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedCourseDuration"
        @change="$emit('update:courseDuration', $event.value)"
        :options="CourseDurationTypes"
        class="w-100"
      />
    </div>
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--Course ECTS * -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Course ECTS <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedCourseEcts"
        @change="$emit('update:courseEcts', $event.value)"
        :options="CourseEctsTypes"
        class="w-100"
      />
    </div>
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--Study language * -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Study Language <span class="text-danger">*</span></label
      >
      <MultiSelect
        v-model="selectedStudyLanguage"
        @change="updateStudyLanguage"
        :options="StudyLanguageTypes"
        optionLabel="name"
        placeholder="Please Select High School Type"
        class="w-100"
      />
    </div>
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--Study Type * -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Study Type <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedStudyType"
        @change="$emit('update:studyType', $event.value.name)"
        :options="StudyTypes"
        optionLabel="name"
        placeholder="Please Select High School Type"
        class="w-100"
      />
    </div>
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--learning Mode * -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Learning Mode <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedLearningMode"
        @change="$emit('update:learningMode', $event.value.name)"
        :options="LearningModes"
        optionLabel="name"
        placeholder="Please Select High School Type"
        class="w-100"
      />
    </div>
    <div
      style="margin: auto !important; margin-top: 2rem !important; width: 100%"
      class="w-100"
    >
      <!-- Upload Cover Photo -->
      <label class="fw-bold mb-1"
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
          <div
            style="
              width: 80px;
              height: 80px;
              margin-right: 10px;
              overflow: hidden;
              background-color: red;
              border-radius: 12px;
            "
          >
            <img
              class="me-3"
              style="width: 100%; height: 100%"
              :src="
                coverPhoto
                  ? coverPhoto
                  : require('@/assets/images/universities-list/upload-svg.svg')
              "
              alt=""
            />
          </div>
          <div class="d-flex m-auto flex-column align-items-start">
            <p style="color: rgb(77, 80, 86) !important">
              960px by 960px . Max 5MB
            </p>
            <p style="margin: 0; color: rgb(77, 80, 86) !important">
              High resolution images (png, jpg)
            </p>
          </div>
        </div>
        <div class="">
          <label
            class="file-upload-programDetails border py-2 px-5"
            for="file-upload-programDetails"
          >
            Browse
          </label>
          <input
            style="
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              opacity: 1;
              cursor: pointer;
              width: 100%;
              height: 100%;

              background-color: red;
            "
            type="file"
            id="file-upload-programDetails"
            accept="image/jpeg , image/png"
            @change="uploadImage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProgramDetailsTab",
  props: [
    "data",
    "studyCountry",
    "courseCode",
    "courseDuration",
    "courseEcts",
    "studyCity",
    "studyLanguage",
    "programType",
    "programName",
    "programFaculty",
    "programAward",
    "studyType",
    "learningMode",
    "coverPhoto",
  ],

  emits: [
    "update:studyCountry",
    "update:courseCode",
    "update:courseDuration",
    "update:courseEcts",
    "update:studyCity",
    "update:studyLanguage",
    "update:programType",
    "update:programName",
    "update:programFaculty",
    "update:programAward",
    "update:studyType",
    "update:learningMode",
    "update:coverPhoto",
  ],
  data() {
    return {
      selectedStudyCountry: {
        id: 4,
        alpha2: "af",
        alpha3: "afg",
        name: "Afghanistan",
      },

      selectedStudyCity: {},
      selectedProgramAward: this.programAward,
      selectedProgramFaculty: this.programFaculty,
      selectedCourseDuration: this.courseDuration,
      selectedCourseEcts: this.courseEcts,
      selectedCourseCode: this.courseCode,
      selectedStudyLanguage: this.studyLanguage,
      selectedStudyType: this.studyType,
      selectedLearningMode: this.learningMode,
      selectedProgramType: this.programType,
      //options
      ProgramTypes: this.data.programmeTypes,
      Countries: this.data.countries,
      ProgramAwardTypes: this.data.programmeAwards,
      ProgramFacultyTypes: this.data.program_faculty,
      CourseDurationTypes: this.data.courseDurations,
      CourseCodeTypes: this.data.courseCodeTypes,
      CourseEctsTypes: this.data.courseETCS,
      StudyLanguageTypes: this.data.studyLanguages,
      StudyTypes: this.data.studyTypes,
      LearningModes: this.data.learningModes,
    };
  },
  computed: {
    CityTypes() {
      console.log(this.selectedStudyCountry);
      return this.data.states.filter(
        (city) => city.country == this.selectedStudyCountry.alpha2.toUpperCase()
      );
    },
  },
  methods: {
    uploadImage(e) {
      e.preventDefault();
      const image = e.target.files[0];
      this.setImage(image);
      if (image.size > 5000000) {
        alert("The Image is too large to be uploaded");
        return false;
      }
      // const reader = new FileReader();
      // reader.readAsDataURL(image);
      // reader.onload = (e) => {
      //   this.$emit("update:coverPhoto", e.target.result);
      // };
    },
    updateStudyLanguage(e) {
      let tempArr = [];
      e.value.forEach((elem) => tempArr.push(elem.name));
      this.$emit("update:studyLanguage", tempArr.join(","));
    },
    async setImage(file) {
      try {
        const response = await axios.get(
          "https://crm.paramountstudents.com/api/upload-url",
          {
            headers: {
              Accept: "*/*",
            },
          }
        );
        console.log(response);
        await axios.put(response.data.url, file, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: user ? `Bearer ${user}` :,
            Accept: "*/*",
          },
        });
        this.uploaded = true;
        const imageUrl = response.data.url.split("?")[0];
        this.$emit("update:coverPhoto", imageUrl);
        // console.log(imageUrl);
        // this.profilePhoto = imageUrl;
        // console.log(this.profilePhoto);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.inputGroupContainer {
  margin-top: 24px !important;
}
.inputTypeText {
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
.file-upload-programDetails {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;
}
.file-upload-programDetails:hover {
  box-shadow: 1px 1px 5px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.25s ease-out;
}
</style>
