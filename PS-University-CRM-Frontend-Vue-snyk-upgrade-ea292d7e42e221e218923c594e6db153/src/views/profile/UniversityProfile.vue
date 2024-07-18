<template>
  <div class="">
    <div class="col-12">
      <div class="applications-nav">
        <h3 class="fw-bold">Welcome to {{ university?.name }} Profile</h3>
        <div class="tab-container">
          <ul          
            class="nav nav-pills py-5"
            id="pills-tab"
            role="tablist"
            style="align-items: flex-end; overflow-x: auto;flex-wrap: nowrap;"
          >
            <li class="nav-item m-1" role="presentation">
              <button
                class="nav-link active mb-3"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                University Details
              </button>
            </li>
            <li class="nav-item m-1" role="presentation">
              <button
                class="nav-link mb-3"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                Our Programs
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="container h-auto px-0 py-3 form-controll">
        <div class="applications-main tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabindex="0"
          >
            <UniversityDetails :university="university" />
          </div>
          <div
            class="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabindex="0"
          >
            <OurProgrammes :programs="programs" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UniversityDetails from "@/components/UniversityDetails.vue";
import OurProgrammes from "@/components/Programmes/OurProgrammes.vue";
import { get } from '@/api/client';

export default {
  // components: { Dropdown,  },
  components: { UniversityDetails, OurProgrammes },
  data() {
    return {
      stuForm: false,
      selectedReview: null,
      university:{},
      programs:[],      
    };
  },
  methods: {
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
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
  },
  async created(){
    
    this.university  = JSON.parse(localStorage.getItem('userInfo'))?.university;    
/*     const response = await get("countries", "api", false);
    this.countries = response;
    setTimeout(() => {
      this.loadStates();      
    }, 500); */
    /*
    */
     const res = await get('programs_by_type/'+this.university?.id);        
     if(!res.responseBody) return false
    this.programs = res.responseBody 
    
  }
};
</script>

<style scoped>
.label-text {
  margin: 10px;
}
.profile-image {
  background-color: #fceca6;
  width: 40%;
  height: 60px;
  padding-top: 2px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-left: 10px;
  border-radius: 6px;
}
.profile-image > h6 {
  font-size: 90%;
}

.label-text {
  font-size: 15px;
}
.textarea {
  width: 95%;
  margin-left: 10px;
}
.btn-container {
  padding: 2px;
}

.card-title {
  font-size: 12px;
}
.tab-container {
  height: 107px;
  border-bottom: 1px solid rgb(235, 233, 233);
}
.view-btn {
  background-color: #eaecf0;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* .view-btn:hover {
     color: rgb(245, 245, 245) !important;
     box-shadow: inset 150px 0 0 0 #fac515 !important;
  } */

.view-btn img {
  width: 20px;
}

.save-next-btn {
  border-radius: 4px;
  width: 95%;
  padding: 0.6rem;
  border: none;
  margin-left: 8px;

  background-color: gray;
}

.nav-link {
  color: grey;
}
.active {
  color: rgb(12, 11, 11) !important;
  font-weight: 600;
  background-color: rgb(247, 247, 242) !important;
  border-radius: 2px solid !important;
  border: 2px solid rgb(214, 160, 42) !important;
}
@media (max-width: 1024px) {
  .profile-image {
    width: 60%;
  }
  .profile-image > h6 {
    font-size: 13px;
  }
  .profile-image > p {
    font-size: 1px;
  }
}
@media (max-width: 664px) {
  .profile-image {
    width: 70%;
  }
  .profile-image > h6 {
    font-size: 12px;
  }
}
.nav-link > button {
  color: red;
}
.nav-link.active {
  background-color: #f9fafb;
  color: black;
}
.img-size {
  border-radius: 2px;
  background-color: gray;
  height: 80px;
  width: 70px;
}
</style>
