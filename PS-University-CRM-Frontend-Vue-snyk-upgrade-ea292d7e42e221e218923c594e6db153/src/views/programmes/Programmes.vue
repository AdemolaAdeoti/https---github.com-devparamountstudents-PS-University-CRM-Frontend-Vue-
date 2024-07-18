<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-show="!showViewProgram" class="row w-90 mx-auto">
    <div >
      <div class="d-flex justify-content-between">
        <div>
          <h3 class="fw-bold">Programs</h3>
        </div>
        <div class="mx-5">
          <button @click="createProgram" class="backgroundImage">
            <img
              :src="require(`/src/assets/images/add-outline.svg`)"
              style="height: 20px; width: 20px; margin-bottom: 2px"
            />
            Create Program
          </button>
        </div>
      </div>
      <hr style="border: 1px solid #f79009" />
      <SkeletalLoader v-if="loadingDashboard" :col="12" :row="4"  />
      <DashboardCard :page="true" :doc-file-count="docFileCount" />

      <hr style="border: 1px solid #f79009" />
      <div class="col-12 d-flex justify-content-end mb-3 ">
        <button
          @click="showForm(!programForm)"
          :class="{ active: programForm }"
          class="filter-btn btn text-dark px-5 py-2 d-flex"
        >
          <img :src="require('/src/assets/images/filter.svg')" />
          Filter
        </button>
      </div>
    </div>
    <div v-if="programForm" class="px-4">
      <form @submit.prevent="SearchProgram">
        <div class="row mb-3 mb-3">
          <div class="col-md-3">
            <label for="program_code">Program Code</label>
            <div class="input-group d-flex align-items-center trackform-input">
              <input
                v-model="program_code"
                type="text"
                class="form-control"
                id="program_code"
                name="program_code"
              />
              <i
                v-if="program_code.length > 0"
                class="pi pi-times form-btna"
                type="button"
                @click="() => (program_code = '')"
              ></i>
            </div>
          </div>
          <div class="col-md-3">
            <label for="programAward">Program Award</label>
            <Dropdown
              v-model="selectedAward"
              id="inputStatus"
              :options="programAward"
              optionLabel=""
              placeholder=""
              class="w-100"
              :default="programAward[0]"
            />
          </div>
          <div class="col-md-3">
            <label for="programType">Program Type</label>
            <Dropdown
              v-model="selectedType"
              id="inputStatus"
              :options="programType"
              optionLabel=""
              placeholder=""
              class="w-100"
              :default="programType[0]"
            />
          </div>
          <div class="col-md-3 d-flex align-self-end flex-row-reverse">
            <div>
              <div>
                <button @click="ClearForm()" class="btn btn-disabled py-2 px-4">
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3 d-flex justify-content-between">
          <!-- <div class="col-md-3">
            <label for="programName">Program Name</label>
            <div class="input-group d-flex align-items-center trackform-input">
              <input
                v-model="programName"
                type="text"
                class="form-control"
                id="programName"
                name="programName"
              />
              <i
                v-if="programName.length > 0"
                class="pi pi-times form-btna"
                type="button"
                @click="() => (programName = '')"
              ></i>
            </div>
          </div> -->
          <div class="col-md-3">
            <label for="inputStatus">Status</label>
            <Dropdown
              v-model="selectedStatus"
              id="inputStatus"
              :options="programStatus"
              optionLabel=""
              placeholder=""
              class="w-100"
              :default="programStatus[0]"
            />
          </div>
          <div class="col-md-3 d-flex align-self-end flex-row-reverse p-0">
            <div>
              <button
                @click="searchProgram"
                type="submit"
                class="btn search-btn btn-disabled"
              >
                Search
              </button>
            </div>
          </div>
          <div class="col-md-auto d-flex align-self-end flex-row-reverse">
            <div></div>
          </div>
        </div>
      </form>
    </div>

    <hr style="border: 1px solid #f79009" />
    <div class="student-app px-4 mb-5 mx-auto position-relative">
      <SkeletalLoader v-if="loadingProgram" :col="12" :row="4"  />
      <div v-else  style="overflow: auto;padding:0px 14px">
        <div v-for="(program, index) in programs.data" :key="index">
        <Program :program="program"  @onClick="showProgram" />
        </div>
      </div>
      <PaginationData :paginationData="programs" @onFetch="onFetchFunc($event)" />
    </div>
  </div>
  <div v-if="showViewProgram">
    <ViewProgram :program="selectedProgram" />
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import Program from "../../components/Programme/Programs.vue";
import ViewProgram from "../../components/Programme/ViewProgram.vue";
import DashboardCard from "@/components/Global/DashboardStat.vue";
import { useProgrammeStore } from "@/stores/programme";
import PaginationData from "@/components/Global/Pagination";
import SkeletalLoader from "@/components/Global/SkeletalLoader";
import { get,post} from "@/api/client";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Programmes",
  components: { Dropdown, Program, DashboardCard,ViewProgram,PaginationData,SkeletalLoader },
  data() {
    return {
      showViewProgram:false,
      user: JSON.parse(localStorage.getItem('userInfo')),
      programForm: false,
      selectedStatus: null,
      programStatus: ["Publish", "Not Published", "Draft"],
      selectedType: null,
      programType: ["Bachelor", "Master", "Doctorate"],
      selectedAward: null,
      programAward: ["B.Sc", "M.Tech", "PHD", "BE", "None"],
      loadingProgram:true,
      loadingDashboard:true,
      program_code: "",
      programName: "",
      Program: [],
      programs: [],
      awardCount: {},
      totalprograms: 0,
      docFileCount:[],
      selectedProgram:{}
    };
  },

  methods: {
    async onFetchFunc(url){      
      this.loadingProgram = true
      const res = await get(url);            
      this.programs = res;
      this.loadingProgram = false
    },
    showProgram(data){      
      localStorage.setItem('selected_program', JSON.stringify(data));
      this.$router.push('/create/programs')                    
    },
    showForm(form) {
      this.programForm = form;
    },

    ClearForm() {
      this.program_code = "";
      this.programName = "";
      this.selectedStatus = null;
      this.selectedType = null;
      this.selectedAward = null;
    },

    searchProgram() {
      let filters = {
        program_code : this.program_code,
        program_award :this.selectedAward,
        program_name: this.programName,
        program_type : this.selectedType,
        status: this.selectedStatus,
      }
      this.fetchProgram(filters)
    },
    createProgram() {
      this.$router.push("/create/programs");
    },
    async getprograms() {
      const store = useProgrammeStore();          
      const programs = store.$state.programmes;
      // console.log(programs);
      this.totalprograms = programs.length;
      this.setProgramCount(store);
      console.log(this.totalprograms);
      this.Program = programs;
    },
    setProgramme(programs) {
      const store = useProgrammeStore()
      store.setProgramme(programs);      
    },
    updateIfFromDashboard() {
      const program = JSON.parse(localStorage.getItem('selected_program'));
      if (program) {        
        this.selectedProgram = program;
        this.showViewProgram = true;
      }
      localStorage.removeItem('selected_program')
    }, 
    async fetchProgram(filters={}){
      this.loadingProgram = true
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))    
      filters.university_id =this.userInfo.university_id
      let res3 = await post('programs',{filters});          
      this.programs = res3
      this.loadingProgram = false
    }
  },
  async created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.fetchProgram();
    let res2 = await get('program_dashboard/'+this.userInfo.university_id);            
      res2 = res2.responseBody;
      this.docFileCount = [
        {
              id: 0,
              style: "border border-warning px-lg-3 p-3 py-4 rounded border-2",
              count: res2.total,
              img: "arrow-2.svg",
              subTitle: "Total",
              title: 'Program Courses',
              class: "col-lg-4 col-md-6 col-xl-3 mb-3 bg-white",
            }
      ]
      
      res2.programs.every((item,i)=>{
        this.docFileCount.push( {
            id: i,
            style: "border border-warning px-lg-3 p-3 py-4 rounded border-2",
            count: item.total,
            img: "arrow-2.svg",
            subTitle: "Total",
            title: item.program_type,
            class: "col-lg-4 col-md-6 col-xl-3 mb-3 bg-white",
          });
          return true
      })
      this.loadingDashboard  = false
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
