<template>
  <div class="row">
    <div class="col-sm-4 mb-3">
      <button @click="back()" class="btn btn-light btn-sm">
        <i class="pi pi-arrow-left cursor-pointer"></i>
      </button>
      <h2 style="font-size: 100%">Student Applications</h2>
      <div class="card">
        <div class="card-body">
          <img @error="onError($event)" :src="student.user?.document?.formal_photo || '/src/assets/images/d-board/avater-1.svg'" alt="logo" width="80" />
          <div class="profile-image">
            <h6 class="my-1">
              Submissin date: <span class="">{{ student.submitted_date }}</span>
            </h6>
          </div>

          <div>
            <h5 style="font-size: 100%">Profile</h5>
            <hr />

            <div class="container px-0">
              <div class="my-2">
                <h6 class="card-title text-truncate px-2 py-2 row mb-0">
                  <span class="text-secondary col-5 text-dark p-0">First Name:
                  </span>                  
                  <span class="col">{{ student.user?.first_name }}</span>
                </h6>
                <h6 class="card-title text-truncate px-2 py-2 row mb-0">
                  <span class="text-secondary col-5 text-dark p-0">Last Name:
                  </span>
                  <span class="col">{{ student.user?.last_name }}</span>
                </h6>
                <h6 class="card-title text-truncate px-2 py-2 row mb-0">
                  <span class="text-dark col-5 text-truncate p-0">Fathers Name:
                  </span>
                  <span class="col">{{ student.user?.father_name }}</span>
                </h6>
                <h6 class="card-title text-truncate px-2 py- row mb-0">
                  <span class="text-dark col-5 p-0">Mothers Name: </span>
                  <span class="col">{{ student.user?.mother_name }}</span>
                </h6>
                <h6 class="card-title text-dark px-2 py-2 row mb-0">
                  <span class="text-dark col-5 p-0">Date Of Birth: </span>
                  <span class="col">{{ student.user?.dob }}</span>
                </h6>
                <h6 class="card-title text-dark px-2 py-2 row mb-0">
                  <span class="text-dark col-5 p-0">Gender:</span>
                  <span class="col">{{ student.user?.gender }}</span>
                </h6>
                <h6 class="card-title text-dark px-2 py-2 row mb-0">
                  <span class="col-5 text-truncate p-0">Email Address:</span>
                  <span class="col text-truncate">{{
                    student.user?.email
                  }}</span>
                </h6>
              </div>
            </div>
          </div>
          <div>
            <h6>Application Program</h6>
            <hr />

            <div class="container px-0">
              <div class="my-2">
                <h6 class="card-title text-truncate px-2 py-2 row mb-0">
                  <span class="text-secondary col-5 text-dark p-0">Study Location:
                  </span>
                  <span class="col">{{ student.program.study_location }}</span>
                </h6>
                <h6 class="card-title text-truncate px-2 py-2 row mb-0">
                  <span class="text-secondary text-truncate col-5 text-dark p-0">Program Type:
                  </span>
                  <span class="col text-truncate">{{
                    student.program.program_type
                  }}</span>
                </h6>
                <h6 class="card-title text-truncate px-2 py-2 row mb-0">
                  <span class="text-dark col-5 text-truncate p-0">Program Name:
                  </span>
                  <span class="col-4 text-truncate">{{
                    student.program.program_name
                  }}</span>
                </h6>
                <h6 class="card-title text-truncate px-2 py- row mb-0">
                  <span class="text-dark col-5 p-0">Learnig Mode: </span>
                  <span class="col">{{
                    student.program?.learning_mode.join(",")
                  }}</span>
                </h6>
                <h6 class="card-title text-dark px-2 py-2 row mb-0">
                  <span class="text-dark col-5 p-0">Program Code: </span>
                  <span class="col">{{ student.program.program_code }}</span>
                </h6>
                <h6 class="card-title text-dark px-2 py-2 row mb-0">
                  <span class="text-dark text-truncate col-5 p-0">Program Award:</span>
                  <span class="col">{{ student.program.program_award }}</span>
                </h6>
                <h6 class="card-title text-dark px-2 py-2 row mb-0">
                  <span class="col-5 text-truncate p-0">Course Duration:</span>
                  <span class="col text-truncate">{{ student.program.program_duration }}
                    {{ student.program.program_ECTS }}</span>
                </h6>
                <h6 class="card-title text-dark px-2 py-2 row mb-0">
                  <span class="text-dark text-truncate col-5 p-0">Study Language:</span>
                  <span class="col">{{
                    student.program?.study_language.join(",")
                  }}</span>
                </h6>
                <h6 class="card-title text-dark px-2 py-2 row mb-0">
                  <span class="col-5 text-truncate p-0">Studey Type :</span>
                  <span class="col text-truncate">{{
                    student.program.study_type.join(",")
                  }}</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="application-review py" style="border: 1px solid black; margin-top: 25px; border-radius: 8px">
        <h6 class="text-center my-3">Application Review</h6>
        <div class="form-group sub-input sub-input-large">
          <div class="form-group dropdown">
            <label class="label-text">Status</label>
            <div style="width: 90%; margin: auto">
              <Dropdown style="border-radius: 10px" v-model="selectedReview" :options="AppliactionReview" optionLabel=""
                placeholder="Waiting  Review" class="w-100" :default="AppliactionReview[0]">
                <template v-slot:option="{ option }">
                  <div>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" class="bi bi-circle custom-icon"
                        :style="{
                          backgroundColor: getIconColor(option),
                          fill: getIconColor(option),
                        }" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      </svg>
                      {{ option }}
                    </span>
                  </div>
                </template>
              </Dropdown>
              <!--   <Dropdown style="border-radius: 10px; " v-model="selectedReview" :options="AppliactionReview" optionLabel=""
                placeholder="Waiting  Review" class="w-100" :default="AppliactionReview[0]" /> -->
            </div>
          </div>

          <div class="form-group">
            <label class="label-text">Comments</label>
            <textarea v-model="comment" class="form-control textarea" placeholder="Enter a comment..." :autoResize="true"
              rows="4" cols="5"></textarea>
          </div>

          <div class="btn-container">
            <button @click="updateStatus()" class="save-next-btn ripple text-dark">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-8">
      <div class="applications-nav">
        <div class="tab-container">
          <ul class="nav nav-pills py-5" id="pills-tab" role="tablist" style="align-items: flex-end">
            <li class="nav-item m-1" role="presentation">
              <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
                type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                Contact
              </button>
            </li>
            <li class="nav-item m-1" role="presentation">
              <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact"
                type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                Education
              </button>
            </li>
            <li class="nav-item m-1" role="presentation">
              <button class="nav-link" id="pills-education-tab" data-bs-toggle="pill" data-bs-target="#pills-education"
                type="button" role="tab" aria-controls="pills-education" aria-selected="false">
                Documents
              </button>
            </li>
            <li class="nav-item m-1" role="presentation">
              <button class="nav-link" id="pills-document-tab" data-bs-toggle="pill" data-bs-target="#pills-document"
                type="button" role="tab" aria-controls="pills-document" aria-selected="false">
                Chat
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="container h-auto px-0 py-3 form-controll">
        <div class="applications-main tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab"
            tabindex="0">
            <StudentContact :contact="student.user?.contact" :nationalId="student.user?.national_id" />
          </div>
          <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
            <StudentEducation :education="student.user?.education" />
          </div>
          <div class="tab-pane fade" id="pills-education" role="tabpanel" aria-labelledby="pills-education-tab"
            tabindex="0">
            <StudentDocument :document="student.user?.document" />
          </div>
          <div class="tab-pane fade" id="pills-document" role="tabpanel" aria-labelledby="pills-document-tab"
            tabindex="0">
            <MessageModal :user_id="student?.student_id" class="mb-3" @messages="fetchMessages" />
            <StudentMessage v-for="message in messages?.data" :key="message.id" :message="message" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Dropdown from "primevue/dropdown";
import StudentDocument from "@/components/StudentsApplication/StudentDocument.vue";
import StudentContact from "@/components/StudentsApplication/StudentContact.vue";
import StudentEducation from "@/components/StudentsApplication/StudentEducation.vue";
import StudentMessage from "@/components/StudentsApplication/StudentMessage.vue";
import MessageModal from "@/components/StudentsApplication/MessageModal.vue";
import { post } from "@/api/client";
import { showModal } from "@/plugins/modal";
export default {
  props: ["student"],
  components: {
    Dropdown,
    StudentContact,
    StudentDocument,
    StudentEducation,
    StudentMessage,
    MessageModal,
  },
  data() {
    return {
      messages: [],
      stuForm: false,
      selectedReview: this.student.application_status,
      comment: this.student.comment ?? "",
      AppliactionReview: ["In Review", "Accepted", "Rejected", "Enrolled"],
      documents: [
        {
          id: 1,
          text: "High School Grade MarkSheet",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 2,
          text: "High School Certificates",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 3,
          text: "Formal Photo",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 4,
          text: "Passport font",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 5,
          text: "National ID Photo",
          size: "4.00mb",
          date: "25/05/2022",
        },
      ],
    };
  },
  methods: {
    onError(event){
      event.target.src = require('/src/assets/images/d-board/avater-1.svg');
    },
    async fetchMessages() {
      let res = await post(`messages/all`, {
        platform: "university",
        owner_id: this.student?.student_id,
      });
      this.messages = res.messages;
    },
    getIconColor(status) {
      return status.toLowerCase() == "in review" || status == ""
        ? "#009aff"
        : status.toLowerCase() === "enrolled"
          ? "#198754"
          : status.toLowerCase() === "accepted"
            ? "#ffb300"
            : status.toLowerCase() === "rejected"
              ? "#DC3545"
              : "#555555";
    },
    back() {
      this.$emit("back", false);
    },
    async updateStatus() {
      
      const res = await post("program/update_application_status", {
        id: this.student.id, //this is the application program id
        comment: this.comment,
        application_status: this.selectedReview,
      })      
      if(res){
        showModal({ text: res?.message, confirmText:'Ok' });      
      }
    },
  },
  async created() {    
 
    this.documents = this.student.user?.document;
    await this.fetchMessages();
  },
};
</script>

<style scoped>
.custom-icon {
  border-radius: 5px;
}

.container {
  margin-bottom: 60px;
}

.application-review div {
  margin-bottom: 10px;
}

.label-text {
  margin: 10px;
}

.profile-image {
  background-color: #fbc02d;

  width: 100%;
  padding: 7px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-left: 10px;
  border-radius: 6px;
}

.profile-image>h6 {
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
  background-color: transparent !important;
  border-radius: 0px !important;
  border-bottom: 2px solid rgb(134, 132, 132) !important;
}

@media (max-width: 1024px) {
  .profile-image>h6 {
    font-size: 13px;
  }

  .profile-image>p {
    font-size: 1px;
  }
}

@media (max-width: 664px) {
  .profile-image>h6 {
    font-size: 12px;
  }
}

.nav-link>button {
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
