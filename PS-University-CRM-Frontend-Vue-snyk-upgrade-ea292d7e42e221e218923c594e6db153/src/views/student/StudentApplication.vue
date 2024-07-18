<template>
  <div v-show="!showsidebar" class="row w-90 mx-auto">
    <!-- <div class="container-fluid h-100 p-0" style="background-color: aqua"> -->
    <div class="px-3">
      <h3 class="fw-bold">Student Applications</h3>
      <hr style="background: #f79009" />
      <DashboardCard :doc-file-count="docFileCount" />
      <hr class="mt-5" />
      <div class="col-12 d-flex justify-content-between">
        <h3 class="fw-bold display">Student Applications</h3>

        <button
          @click="showForm()"
          :class="{ active: stuForm }"
          class="filter-btn btn text-dark px-5 py-2 d-flex"
        >
          <img :src="require('/src/assets/images/filter.svg')" />
          Filter
        </button>
      </div>
    </div>
    <div v-if="stuForm" class="px-4">
    <FilterOptions :statuses="studentStatus" @onSearch="filterChange"/>
    <hr />
    </div>

    <div class="student-app px-3 mb-5 mx-auto position-relative">
      <div v-if="studentDataIsLoading" class="mt-3">    
        <div v-for="x in 5" :key="x" class="mb-3 d-flex justify-between items-center w-100">
          <div v-for="x in 5" :key="x" class="w-100">
            <Skeleton width="90%" class="mb-2"></Skeleton>
            <Skeleton width="50%" class="mb-2"></Skeleton>
          </div>
        </div>
      </div>
      <div v-for="(student, index) in Student?.data" :key="index">
        <StudentApplication from="main" v-if="!studentDataIsLoading" :index="index" :student="student" @onClick="onSelectStudent($event)" />
      </div>
      <PaginationData :paginationData="Student" @onFetch="onFetchFunc($event)" />
    </div>
  </div>
  <div v-if="showsidebar">
    <StudentSidebar @back="showsidebar = $event" :student="selectedStudent" />
  </div>
</template>

<script>
import StudentApplication from "@/components/StudentsApplication/StudentApplication.vue";
import StudentSidebar from "@/components/StudentsApplication/StudentSidebar.vue";
import DashboardCard from "@/components/Global/DashboardStat.vue";
// import { Students } from '@/data'
import { get,post } from '@/api/client';
import { useStudentApplicationStore } from "@/stores/studentApplications";
import PaginationData from "@/components/Global/Pagination.vue";
import FilterOptions from '@/components/Global/FilterOptions.vue';

import Skeleton from 'primevue/skeleton';

export default {
  components: { StudentApplication, DashboardCard, PaginationData, StudentSidebar, FilterOptions,Skeleton },
  data() {
    return {
      studentDataIsLoading:true,
      showsidebar:false,
      stuForm: false,
      userInfo:{},
      selectedStatus: null,
      studentStatus: ["In Review", "Accepted", "Enrolled", "Rejected"],      
      firstName: "",
      lastName: "",
      emailAddr: "",
      Student: "",
      approved: 0,
      rejected: 0,
      inProgress: 0,
      docFileCount: [
        {
          id: 1,
          style: "border border-primary px-lg-3 p-3 py-4 rounded border-2",
          count: 0,
          img: "arrow-1.svg",
          title: "Total Applications",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 ",
        },
        {
          id: 2,
          style: "border border-warning px-lg-3 p-3 py-4 rounded border-2",
          count: 0,
          img: "arrow-2.svg",
          title: "In Progress",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 ",
        },
        {
          id: 3,
          style: "border border-success px-lg-3 p-3 py-4 rounded  border-2",
          count: 0,
          img: "arrow-3.svg",
          title: "Approved",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 ",
        },
        {
          id: 4,
          style: "border border-danger px-lg-3 p-3 py-4 rounded border-2",
          count: "04",
          img: "arrow-4.svg",
          title: "Rejected",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 ",
        },
        {
          id: 5,
          style: "border border-danger px-lg-3 p-3 py-4 rounded border-2",
          count: 0,
          img: "arrow-4.svg",
          title: "Rejected",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 ",
        },
      ],
      selectedStudent:{}
    };
  },
  async created(){     
      this.fetchStudent()
      let res2 = await get('student/progams/application/dashboard?university_id='+this.userInfo?.university_id);
      res2 = res2?.responseBody;
      if(res2){
        let keys = Object.keys(res2);
        
        this.docFileCount.forEach((item, i) => {
        item.count = res2[keys[i]] || 0;
        item.title = keys[i].replaceAll('_',' ');
      });
    }
      
  },
  methods: {
    async fetchStudent(filters = {}) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      filters.university_id = this.userInfo?.university_id;
      this.studentDataIsLoading = true
      //const query = Object.keys(filters).map(key => `${key}=${filters[key]}`).join('&');
      const res = await post(`program/applications`,{filters});      
      this.studentDataIsLoading = false
      this.Student = res?.responseBody;
      this.setStudents(this.Student?.data);
    },
    filterChange(filters){    
      this.fetchStudent(filters)
    },
    updateIfFromDashboard() {
      const student = JSON.parse(localStorage.getItem('selected_student'));
      if (student) {        
        this.selectedStudent = student;
        this.showsidebar = true;
      }
      localStorage.removeItem('selected_student')
    },
    onSelectStudent(index){
        this.selectedStudent = this.Student.data[index]
        this.showsidebar = true
    },
    async onFetchFunc(url){      
      const res = await get(url);            
      this.Student = res.responseBody;
    },
    showForm() {
      this.stuForm = !this.stuForm;
    },
    setStudents(students) {
      const store = useStudentApplicationStore();
      store.setStudentApplications(students);      
    },
    ClearForm() {
      this.firstName = "";
      this.lastName = "";
      this.emailAddr = "";
      this.selectedStatus = null;
    }    
  },
  mounted() {
    this.$nextTick(function(){
      this.updateIfFromDashboard();
    })
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
  > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
    .valid-feedback
  ):not(.invalid-tooltip):not(.invalid-feedback) {
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
.filter-btn {
  background-color: $gray;
}
.text-xs {
  font-size: 0.85rem !important;
}
</style>
