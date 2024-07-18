<template>  
  <div v-show="!showsidebar" class="row w-90 mx-auto">
    <!-- <div class="container-fluid h-100 p-0" style="background-color: aqua"> -->
    <div class="">
      <h3 class="fw-bold mb-2 ms-3">Students Receipts</h3>
      <hr style="background: #f79009"  class="my-0"/>
      <DashboardCard :doc-file-count="docFileCount" />
      <hr class="mt-0 mb-2" />
      <div class="col-12 d-flex justify-content-between mb-2 align-items-center">
        <h3 class="fw-bold display ms-3">List</h3>
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
    </div>
    <hr />

    <div class="student-app px-4 mb-5 mx-auto position-relative" style="overflow-x:auto;">
      <div v-for="(student, index) in students?.data" :key="index">
        <ReceiptCard :index="index" :student="student" @onClick="onSelectStudent($event)" />
      </div>
      <PaginationData :paginationData="students" @onFetch="onFetchFunc($event)" />
    </div>
  </div>  
</template>

<script>


import { get,post } from '@/api/client';
import PaginationData from "@/components/Global/Pagination.vue";
import FilterOptions from '@/components/Global/FilterOptions.vue';
import DashboardCard from "@/components/Global/DashboardStat.vue";
import ReceiptCard from "@/components/Payments/ReceiptCard.vue";
export default {
  name: "ReceiptPage",
  components: { PaginationData, FilterOptions,DashboardCard,ReceiptCard },
  data() {
    return {
      students:[],
      stuForm:false, 
      studentStatus:['Viewed', 'Unviewed'], 
      docFileCount: [
        {
          id: 1,
          style: "border border-primary px-lg-3 p-3 py-4 rounded border-2",
          count: 0,
          img: "arrow-1.svg",
          title: "Total Receipts",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3",
        },
        {
          id: 2,
          style: "border border-warning px-lg-3 p-3 py-4 rounded border-2",
          count: 0,
          img: "arrow-2.svg",
          title: "Total Viewed",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 ",
        },
        {
          id: 3,
          style: "border border-success px-lg-3 p-3 py-4 rounded  border-2",
          count: 0,
          img: "arrow-3.svg",
          title: "Total Unviewed",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3",
        }       
      ]
    }      
  },
  async created(){     
      this.fetchStudent()
      let res2 = await get('student/progams/application/dashboard?university_id='+this.userInfo?.university_id);
      res2 = res2?.responseBody;
      if(res2){
        let keys = Object.keys(res2);
        
        this.docFileCount.forEach((item, i) => {
        item.count = res2[keys[i]] || 0;
        //item.title = keys[i].replaceAll('_',' ');
      });
    }
      
  },
  methods: {
    async fetchStudent(filters = {}) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      filters.university_id = this.userInfo?.university_id;
      filters.latest = true;
      //const query = Object.keys(filters).map(key => `${key}=${filters[key]}`).join('&');
      const res = await post(`receipts/listall-receipts`,{filters});      
      if(res?.message){
        this.students = res?.message;      
      }
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
        this.selectedStudent = this.students.data[index]
        this.showsidebar = true
    },
    async onFetchFunc(url){      
      const res = await get(url);            
      this.students = res.responseBody;
    },
    showForm() {
      this.stuForm = !this.stuForm;
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
