<template>
  <div class="row w-90 mx-auto">
    <!-- <div class="container-fluid h-100 p-0" style="background-color: aqua"> -->
    <div class="px-4 py-3">
      <div class="col-12 d-flex justify-content-between">
        <h3 class="fw-bold">Student Tracking</h3>
        <button
          @click="showForm()"
          :class="{ active: trackForm }"
          class="filter-btn btn text-dark px-5 py-2 d-flex ripple"
        >
          <img :src="require('/src/assets/images/filter.svg')" />
          Filter
        </button>
      </div>
    </div>
    <div v-if="trackForm" class="px-4">
      <form @submit.prevent="SearchTrack">
        <div class="row mb-3 mb-3">
          <div class="col-md-3">
            <label for="firstName">First Name</label>
            <div class="input-group d-flex align-items-center trackform-input">
              <input
                v-model="firstName"
                type="text"
                class="form-control"
                id="firstName"
                name="firstName"
                required
              />
              <i
                v-if="firstName.length > 0"
                class="pi pi-times form-btna"
                type="button"
                @click="() => (firstName = '')"
              ></i>
            </div>
          </div>
          <div class="col-md-3">
            <label for="lastName">Last Name</label>
            <div class="input-group d-flex align-items-center trackform-input">
              <input
                v-model="lastName"
                type="text"
                id="lastName"
                name="lastName"
                required
                class="form-control"
              />
              <i
                v-if="lastName.length > 0"
                class="pi pi-times form-btna"
                type="button"
                @click="() => (lastName = '')"
              ></i>
            </div>
          </div>
          <div class="col-md-3">
            <label for="emailAddr">Email Address</label>
            <div class="input-group d-flex align-items-center trackform-input">
              <input
                v-model="emailAddr"
                type="email"
                class="form-control"
                id="emailAddr"
                required
                name="emailAddr"
              />
              <i
                v-if="emailAddr.length > 0"
                class="pi pi-times form-btna"
                type="button"
                @click="() => (emailAddr = '')"
              ></i>
            </div>
          </div>
          <div class="col-md-3 d-flex align-self-end flex-row-reverse">
            <div>
              <div>
                <button type="button" @click="ClearForm()" class="btn btn-disabled py-2 px-4">
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3 d-flex justify-content-between">
          <div class="col-md-3">
            <label for="inputStatus">Status</label>
            <Dropdown
              v-model="selectedStatus"
              id="inputStatus"
              :options="trackingStatus"
              optionLabel=""
              placeholder=""
              class="w-100"
              :default="trackingStatus[0]"
            />
          </div>
          <div class="col-md-3 d-flex align-self-end flex-row-reverse p-0">
            <div>
              <button type="submit" class="btn search-btn">Search</button>
            </div>
          </div>
          <div class="col-md-auto d-flex align-self-end flex-row-reverse">
            <div></div>
          </div>
        </div>
      </form>
    </div>
    <hr />


    <div class="student-app px-4 mb-5 mx-auto position-relative">
      <!-- <div v-for="(student, index) in Student" :key="index"> -->
        <template v-if="showSearch && trackForm">
          <TrackingResults :searchItem="filteredData" />
        </template>
        <template v-else>
          <StudentTrack  v-for="(student, index) in students" :key="index" :student="student" />
        </template>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import StudentTrack from '@/components/StudentsTrack/StudentTrack.vue';
import TrackingResults from '@/components/StudentsTrack/TrackingResults.vue';
import { Students } from '@/data'
export default {
  name: 'StudentTracking',
  components: { Dropdown, StudentTrack, TrackingResults },
  data() {
    return {
      trackForm: false,
      selectedStatus: null,
      trackingStatus: ['No Apply', 'Applying', 'Got Admissions'],
      firstName: '',
      lastName: '',
      emailAddr: '',
      showSearch: false,
      filteredData: null,

      students: Students,
    };
  },
  methods: {
    showForm() {
      this.trackForm = !this.trackForm;
    },
    SearchTrack() {
      console.log(
        this.firstName,
        this.lastName,
        this.emailAddr,
        this.selectedStatus
      );
      this.showSearch = true;
      console.log(this.filteredData = this.students.filter(res => res.email.match(this.emailAddr)))
      return this.filteredData = this.students.filter(res => res.email.match(this.emailAddr) && res.fullName.toLowerCase().includes(`${this.firstName.toLowerCase()} ${this.lastName.toLowerCase()}`));
      // let cName = this.firstName.toLowerCase() + ' ' + this.lastName.toLowerCase()
      // return console.log(this.students.find(res => {(res.fullName.toLowerCase === cName) }))
      //this.ClearForm();
    },
    ClearForm() {
      this.firstName = '';
      this.lastName = '';
      this.emailAddr = '';
      this.selectedStatus = null;
      this.Student;
      this.showSearch = false;
    },
  },

};
</script>

<style lang="scss" scoped>
$primary: #fac515;
$warning: #fdb022;
$scrollbar-thumb-bg: #dc6803;
$scrollbar-color: #f79009;
$gray: #d0d5dd;

::v-deep(#inputStatus.p-dropdown) {
  .p-dropdown-items {
    background-color: red !important;
    border-bottom: 1px solid #fac515;
  }
  .p-dropdown-panel .p-dropdown-items .p-highlight {
    color: #495057;
    background: #f70909;
  }
  // .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
  //   color: #5de40f;
  //   background: #e70c30;
  // }
}

/** input field hack to ensure the clear btn within the input fields are always circular **/
.input-group
  > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
  margin-left: 0px;
  border-top-left-radius: 100%;
  border-bottom-left-radius: 100%;
}
.trackform-input {
  input {
    padding-right: 40px;
  }
  .form-btna {
    position: absolute;
    right: 10px;
    z-index: 5;
    padding: 4px;
    border: 1px solid #98a2b3;
    border-radius: 100%;
    font-size: 10px;
    background-color: #98a2b3;
    color: white;

    &:hover {
      background-color: #c0c8d4;
    }
  }
}

::v-deep(#inputStatus.p-dropdown-panel) {
  .p-dropdown-items {
    background-color: red !important;
    border-bottom: 1px solid #fac515;
  }
  .p-dropdown-items .p-highlight {
    color: #495057;
    background: #f70909 !important;
  }
}
.active {
  background-color: $primary !important;
}

.search-btn {
  background-color: $gray;
  padding: 8px 24px;
}
.search-btn {
  font-size: 14px !important;
}

.filter-btn {
  background-color: $gray;
}
.text-xs {
  font-size: 0.85rem !important;
}
</style>